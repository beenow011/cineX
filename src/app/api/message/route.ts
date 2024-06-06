import service from "@/firebase/firestore";
import { openai } from "@/lib/openai";
import { currentUser } from "@clerk/nextjs/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { error } from "console";
import { DocumentData, Timestamp } from "firebase/firestore";
import { NextRequest } from "next/server";
import { z } from "zod";

const SendMessageValidator =  z.object({
    movieID : z.string(),
    movieName: z.string(),
    message : z.string(),
    Year: z.string(),
    Director:z.string()
})
interface messageParams{
    text:string,
     isUserMessage:boolean,
        uId:string ,
        mID:string,
         movieID:string ,
         createdAt:Timestamp
}
interface formattedParams{
    role: string,
    content: string,
}
export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const user = await currentUser();

    if (!user) {
        return new Response('Unauthorized', { status: 401 })
    }
    const { movieID , movieName , Director, Year, message } = SendMessageValidator.parse(body);

    await service.createMessage({
        text:message,
         isUserMessage:true,
            uId:user.id ,
             movieID 
    });

    try{

        const prevMessages = await service.retrievePrevMsg({
            uId:user.id,
            movieID,
            limit:6,
            order:true,
            lastVisible: undefined
        })
        const formattedPrevMessages =prevMessages? prevMessages.map((msg:DocumentData) => ({
            role: msg.isUserMessage ? 'user' : 'assistant',
            content: msg.text,
        })):null;

        const context = `PREVIOUS CONVERSATION:${formattedPrevMessages?.map((msg:DocumentData) => {
            if (msg.role === 'user') return `User:${msg.content}\n`;
            return `Assistant:${msg.content}\n`;
        })}context:MovieName:${movieName} IMDBid-${movieID} directed by ${Director} in year${Year} USER INPUT:${message}`;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            temperature: 0.7, // Adjust the temperature as needed
            stream: true,
            messages: [
                {
                    role: 'system',
                    content: 'You are a chatbot. based on IMDBID and the message. answer the questions. ',
                },
                {
                    role: 'user',
                    content: context, // Provide the context here
                },
            ],
        });
        const stream = OpenAIStream(response, {
            async onCompletion(completion) {
                console.log('completion',completion)
                await service.createMessage({
                    text:completion,
                     isUserMessage:false,
                        uId:user.id ,
                         movieID 
                });
            },
        });
        return new StreamingTextResponse(stream);
    }catch(err){
        console.error('Error searching for similar messages:', error);
        return new Response('InternalServerError', { status: 500 });
    }

}