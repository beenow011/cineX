import { ArrowBigRight, SquareX } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NoPost({ roomId }: { roomId: string }) {
    return (
        <div className='bg-slate-600/30 w-full h-36 flex flex-col justify-center items-center'>
            <SquareX className='h-5 w-5 text-white' />
            <p className='font-semibold'>No posts</p>

            <div>Write your first post</div>
            <Link href={`/create-post/${roomId}`}><ArrowBigRight className='h-6 w-6 text-blue-600 hover:text-white' /></Link>
        </div>
    )
}

export default NoPost