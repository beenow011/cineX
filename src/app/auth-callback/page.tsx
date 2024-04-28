'use client';
import { Loader2 } from "lucide-react";
import { Suspense, useEffect } from "react";
import { trpc } from "../_trpc/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { error } from "console";



const Page = () => {
    const router = useRouter()

    // Wrap useSearchParams in Suspense
    const searchParams = useSearchParams()

    const origin = searchParams.get('origin')

    const { mutate: register } = trpc.registerToFirestore.useMutation({
        onSuccess: (data) => {
            console.log(data)
            router.push('/dashboard')
        },
        onError: (error) => {
            if (error?.data?.code === 'UNAUTHORIZED') {
                router.push('/sign-in');
            } else {
                // Handle other types of errors
                console.error("An error occurred:", error);
            }
        }
    }
    )
    useEffect(() => {
        register()
    }, [])

    // Check for errors in the query result

    // Continue with other logic based on the query result


    return (
        <div className='w-full mt-24 flex justify-center text-white'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='h-8 w-8 animate-spin text-white' />
                <h3 className='font-semibold text-xl'>
                    Setting up your account...
                </h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    );
};

// Wrap the Page component with Suspense
const SuspenseWrapper = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Page />
    </Suspense>
);

export default SuspenseWrapper;