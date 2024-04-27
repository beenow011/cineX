import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from './trpc';
import { auth, currentUser } from "@clerk/nextjs/server";
import service from '@/firebase/firestore';
export const appRouter = router({
    registerToFirestore: publicProcedure.mutation(async()=>{
        const user = await currentUser();
        if(!user){
            throw new TRPCError({code:'UNAUTHORIZED'})
        }
        try{
            const userData = await service.register({uId:user.id,  email:user.emailAddresses[0].emailAddress, username:user.username, createdAt: user.createdAt})
        }catch(err){
            throw new TRPCError({code:'BAD_REQUEST'})

        }

    })
  // ...
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;