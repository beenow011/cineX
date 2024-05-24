import service from "@/firebase/firestore";
import { openai } from "@/lib/openai";
import { currentUser } from "@clerk/nextjs/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { error } from "console";
import { NextRequest } from "next/server";
import { z } from "zod";

const SendMessageValidator =  z.object({
    movieID : z.string(),
    message : z.string()
})
interface messageParams{
    text:string,
     isUserMessage:boolean,
        uId:string ,
         movieID:string 
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
    const { movieID, message } = SendMessageValidator.parse(body);

    await service.createMessage({
        text:message,
         isUserMessage:true,
            uId:user.id ,
             movieID 
    });

    try{

        const prevMessages = await service.retrivePrevMsg({
            uId:user.id,
            movieID
        })
        const formattedPrevMessages =prevMessages? prevMessages.map((msg:messageParams) => ({
            role: msg.isUserMessage ? 'user' : 'assistant',
            content: msg.text,
        })):null;

        const context = `PREVIOUS CONVERSATION:${formattedPrevMessages?.map((msg:formattedParams) => {
            if (msg.role === 'user') return `User:${msg.content}\n`;
            return `Assistant:${msg.content}\n`;
        })}context:IMDBid-${movieID} USER INPUT:${message}`;

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