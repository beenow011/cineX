import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {OpenAIStream , StreamingTextResponse} from 'ai'
import { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";
// import { Readable } from "readable-stream";

const validator =  z.object({
    Title : z.string(),
    imdbID : z.string()
})
export const GET = async(req: NextRequest , res:NextApiResponse)=>{
    // const { Title, imdbID } = req.url?.searchParams;
    const url = new URL(req.url);
    const searchparam = new URLSearchParams(url.searchParams)
    const Title = searchparam.get('Title')
    const imdbID = searchparam.get('imdbID')
    const Language = searchparam.get('Language')
    const Plot = searchparam.get('Plot')
// 
    // console.log(2,Genre)
    if (!Title || !imdbID) {
        return res.status(400).json({ error: 'Title and imdbID are required query parameters' });
    }
    // const { Title , imdbID} = validator.parse(body);
    // return res.status(400).json({ error: 'Title and imdbID are required query parameters' });
    try{
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-16k-0613', // Correct model name use gpt-4-turbo-2024-04-09 in production
        temperature: 0.1, // Adjust the temperature as needed
        stream: false,
        messages: [
            {
                role: 'system',
                content: `Find 6 different ${Language} movies with a plot similar to "${Title}" (${imdbID}) or story is similar to ${Plot} but exclude any sequels or prequels. Return the result strictly in this format:
                [{
                    "name": "moviName",
                    "imdbId": "tt1234556",
                    "plot":"within 2 sentence"
            },{
            "name": "moviName",
                    "imdbId": "tt1234556",
                    "plot":"within 2 sentence"

            }
                    ]`
            }
        ]
    });
    
          
        // console.log(response)
        
       
        // const stream = OpenAIStream(response,{
        //   onCompletion:(completion)=>{
        //     console.log(completion)
        //   }
        // });
       
        
        // return new StreamingTextResponse(stream)
        // return 1

        const completionResult = response.choices[0].message.content;
        // console.log(completionResult);

        // Extract the JSON array from the completion result
        const jsonResponse = JSON.parse(completionResult!);
        // console.log(jsonResponse);

        return NextResponse.json({ result: jsonResponse }, { status: 200 })
    }catch(err){
        throw new Error("Something went wrong!")
    }
}