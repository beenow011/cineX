import { openai } from "@/lib/openai";
import { NextRequest } from "next/server";
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
    const Genre = searchparam.get('Genre')
// 
    console.log(2,Genre)
    if (!Title || !imdbID) {
        return res.status(400).json({ error: 'Title and imdbID are required query parameters' });
    }
    // const { Title , imdbID} = validator.parse(body);
    // return res.status(400).json({ error: 'Title and imdbID are required query parameters' });
    try{
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            temperature: 0.7, // Adjust the temperature as needed
            stream: true,
            messages: [
              {
                  role: 'system',
                  content: `under rated Movie with Genre ${Genre} which is similar to ${Title}(${imdbID}) in the format of JSON:{
              imdbid1: 'xyz',
          }`,
              }
          ],
        })
        // console.log(response)
        
       
        const stream = OpenAIStream(response,{
          onCompletion:(completion)=>{
            console.log(completion)
          }
        });
       
        
        return new StreamingTextResponse(stream)
        // return 1
    }catch(err){
        throw new Error("Something went wrong!")
    }
}