import { TRPCError } from '@trpc/server';
import {z} from 'zod'
import { privateProcedure, publicProcedure, router } from './trpc';
import { auth, currentUser } from "@clerk/nextjs/server";
import service from '@/firebase/firestore';
import { OpenAIStream } from 'ai';
import { openai } from '@/lib/openai';
export const appRouter = router({
    registerToFirestore: publicProcedure.mutation(async () => {
        const user = await currentUser();
        if (!user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        try {
            const data = await service.register({
                uId: user.id,
                email: user.emailAddresses[0].emailAddress,
                username: user.username,
                createdAt: user.createdAt
            });
            return data;
        } catch (err) {
            throw new TRPCError({ code: 'BAD_REQUEST' });
        }
    }),
    retriveMoviesFromImdb : privateProcedure.input(z.object({imdbId: z.string()})).mutation(async({input , ctx})=>{
        const {imdbId} = input
        // console.log(imdbId)
        // console.log("3",imdbId)
        const url = `http://www.omdbapi.com/?apikey=e12df4ca&i=${imdbId}`;
        try{
            const res = await fetch(url);
            const data = await res.json();
            if(data.Response){
                return data
            }else{
                throw new TRPCError({code:'NOT_FOUND' , message:data.Error})
            }

        }catch(err){
            throw new TRPCError({ code: 'BAD_REQUEST' });
        }
    }),
    retriveMoviesFromMovieName : privateProcedure.input(z.object({movie: z.string()})).mutation(async({input , ctx})=>{
        const {movie} = input
        const url = `http://www.omdbapi.com/?apikey=e12df4ca&t=${movie}`;
       
        try{
            const res = await fetch(url);
            const data = await res.json();
            if(data.Response){
                return data
            }else{
                throw new TRPCError({code:'NOT_FOUND' , message:data.Error})
            }

        }catch(err){
            throw new TRPCError({ code: 'BAD_REQUEST' });
        }
    }),
    searchSimilarMovies : privateProcedure.input(z.object({Title:z.string() , imdbID : z.string()})).mutation(async({input , ctx})=>{
        const {Title , imdbID}= input
        let json 
            try{
                const response = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    temperature: 0.7, // Adjust the temperature as needed
                    stream: true,
                    messages: [
                        {
                            role: 'system',
                            content: `Given a movie with the title ${Title} and IMDb ID ${imdbID}, please return the IMDb ID of a movie with similar plot in the format of JSON {
                                title: 'xyz',
                                imdb_id: 'xyz',
                                similar_movie_imdb_id: 'xyz'
                              }`,
                        }
                    ],
                })
                console.log(response)
                const stream = OpenAIStream(response, {
                    async onCompletion(completion) {
                        console.log("4",JSON.parse(completion))
                        // return JSON.parse(completion)
                        json = JSON.parse(completion)
                    },
                });
                console.log(json)
                // return json
        }catch(err){
            throw new TRPCError({code:'BAD_REQUEST'})
        }
    }
    ),
    getMessages: privateProcedure.input(z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        movieID: z.string()
    })).query(async ({ input, ctx }) => {
        const { userId } = ctx;
        const { movieID, cursor } = input;
        const limit = input.limit ?? 10;
        
        try {
            const messages = await service.retrievePrevMsg({
                uId: userId,
                movieID,
                limit,
                order: false,
                lastVisible: cursor ? cursor : undefined,
            });
    
            if (!messages || messages.length === 0) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }
            // console.log(messages)
    
            let nextCursor : typeof cursor | undefined = undefined
            if (messages.length > limit) {
                const nextItem = messages.pop();
                nextCursor = nextItem?.mID;
            }
    
            return {
                messages,
                nextCursor
            };
        } catch (error) {
            console.error("Error retrieving messages:", error);
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }
    })
    
  // ...
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;