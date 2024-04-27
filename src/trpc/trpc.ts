
import { auth, currentUser } from "@clerk/nextjs/server";
import { TRPCError, initTRPC } from '@trpc/server';
 

const t = initTRPC.create();
 const middleware = t.middleware
 
 const isAuth = middleware(async (opts) => {
    const { userId } = auth();
  
    if (!userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    const user = await currentUser()
    return opts.next({
      ctx: {
        userId,
        user,
      },
    })
  })

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth)