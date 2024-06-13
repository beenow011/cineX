'use client';
import { trpc } from '@/app/_trpc/client'
import { MovieContext } from '@/context/MovieContext'
import { Console } from 'console';
import { Loader } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { HoverEffect } from './ui/card-hover-effect';
import { PlotContext } from '@/context/PlotContext';

function PlotRecmMovies() {
    const { loading, result, Plot } = useContext(PlotContext)
    const [res, setRes] = useState<any>([])
    const { mutate: searchFromApiById, isLoading: isLoading1 } = trpc.retriveMoviesFromImdb.useMutation({
        onSuccess: (data) => {
            console.log(data)
            setRes((prev: any) => [...prev, data])
        }
    }
    )
    const { mutate: searchFromApiByName, isLoading: isLoading2 } = trpc.retriveMoviesFromMovieName.useMutation({
        onSuccess: (data) => {
            console.log(data)
            setRes(data)

        }
    }
    )
    console.log(res)
    // useEffect(() => {
    //     if (result) {
    //         console.log(3)
    //         // result.map((ele: any) => searchFromApiByName(ele.name))
    //         searchFromApiByName({ movie: result[0].name })
    //         searchFromApiByName({ movie: result[1].name })
    //         searchFromApiByName({ movie: result[2].name })
    //         searchFromApiByName({ movie: result[3].name })
    //         searchFromApiByName({ movie: result[4].name })
    //     }
    // }, [result])

    useEffect(() => {
        setRes([])
    }, [Plot])
    console.log(res)

    const projects = [
        {
            title: result[0]?.name,
            description:
                result[0]?.plot,
            link: `https://www.imdb.com/title/${result[0]?.imdbId}/`,
        },
        {
            title: result[1]?.name,
            description:
                result[1]?.plot,
            link: `https://www.imdb.com/title/${result[1]?.imdbId}/`,
        },
        {
            title: result[2]?.name,
            description:
                result[2]?.plot,
            link: `https://www.imdb.com/title/${result[2]?.imdbId}/`,
        },
        {
            title: result[3]?.name,
            description:
                result[3]?.plot,
            link: `https://www.imdb.com/title/${result[3]?.imdbId}/`,
        },
        {
            title: result[4]?.name,
            description:
                result[4]?.plot,
            link: `https://www.imdb.com/title/${result[4]?.imdbId}/`,
        },
        {
            title: result[5]?.name,
            description:
                result[5]?.plot,
            link: `https://www.imdb.com/title/${result[5]?.imdbId}/`,
        }

    ];

    return (
        <div className=' p-3 mt-3'>
            {

                result.length !== 0 ? (
                    <div>
                        <div className="max-w-5xl mx-auto px-8">
                            <HoverEffect items={projects} />
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center text-white'>
                        <p>Select the movie..!  </p>
                    </div>
                )

            }
        </div>
    )
}

export default PlotRecmMovies