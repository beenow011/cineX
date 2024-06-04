'use client';

import { trpc } from "@/app/_trpc/client";
import { ReactNode, createContext, useEffect, useState } from "react";
interface contextParams {
    username: string,
    userId: string,
    email: string | undefined,
}
export const UserContext = createContext<contextParams>({
    userId: '',
    username: '',
    email: ''
})

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const query = trpc.getUser.useQuery()

    console.log('useEffect triggered');
    useEffect(() => {
        console.log('Query data:', query.data);
        console.log('Query error:', query.error);
        if (query.error) {
            console.log('Login');
        } else {
            console.log(query.data)
            setEmail(query.data?.email || '');
            setUserId(query.data?.userId || '');
            setUsername(query.data?.userName || '');
        }
    }, [query]);

    return (
        <UserContext.Provider value={{ userId, username, email }}>
            {children}
        </UserContext.Provider>
    )
}