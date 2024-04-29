import { TRPCError } from '@trpc/server';
import {z} from 'zod'
import { privateProcedure, publicProcedure, router } from './trpc';
import { auth, currentUser } from "@clerk/nextjs/server";
import service from '@/firebase/firestore';
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
    })
  // ...
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;