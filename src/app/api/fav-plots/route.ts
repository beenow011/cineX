import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validator =  z.object({
    Plot : z.string(),
   
})
export const GET=async(req: NextRequest , res:NextApiResponse)=>{


    const url = new URL(req.url);
    const searchparam = new URLSearchParams(url.searchParams)
    const Plot = searchparam.get('Plot')

    if (!Plot) {
        return res.status(400).json({ error: 'required query parameters' });
    }

    try{
        // const response = await openai.chat.completions.create({
        //     model: 'gpt-3.5-turbo', // Using Davinci model for chat completion
        //     temperature: 0.1, // Adjust the temperature as needed
        //     stream: true,
        //     messages: [
        //       {
        //         role: 'system',
        //         content: `Find a movie with a plot similar to "${Plot}" , and return the result in JSON format:
        //         {
        //             "imdbid1": "xyz"
        //         }
        //          `,
        //       }
        //     ]
        //   });
          
        // // console.log(response)
        
       
        // const stream = OpenAIStream(response,{
        //   onCompletion:(completion)=>{
        //     console.log(completion)
        //   }
        // });
       
        
        // return new StreamingTextResponse(stream)
        const response = await openai.chat.completions.create({
          model: 'gpt-4-turbo-2024-04-09', // Correct model name
          temperature: 0.1, // Adjust the temperature as needed
          stream: false,
          messages: [
              {
                  role: 'system',
                  content: `Find 6 different movies with a plot similar to "${Plot}". Return the result strictly in this format:
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
          console.log(completionResult);
  
          // Extract the JSON array from the completion result
          const jsonResponse = JSON.parse(completionResult!);
          console.log(jsonResponse);
  
          return NextResponse.json({ result: jsonResponse }, { status: 200 })
        // return 1
    }catch(err){
        throw new Error("Something went wrong!")
    }
}