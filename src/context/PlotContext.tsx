'use client';
import { trpc } from "@/app/_trpc/client";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

interface contextParams {
    Plot: string
    setPlot: Dispatch<SetStateAction<string>>
    searchPlot: () => void
    answer: string
    loading: boolean
    res: any
    result: any
}

export const PlotContext = createContext<contextParams>({
    Plot: '',
    setPlot: () => { },
    searchPlot: () => { },
    answer: '',
    loading: false,
    res: {},
    result: [{}],
})

export const PlotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [Plot, setPlot] = useState('')
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const [res, setRes] = useState({})
    const { mutate: searchFromApiById2, isLoading: loading2 } = trpc.retriveMoviesFromImdb.useMutation({
        onSuccess: (data) => {
            console.log(data)
            setRes(data)
        }
    }
    )
    useEffect(() => {
        setResult([])
    }, [Plot])

    const getImdbID = (answer: string) => {

        console.log("1", answer)
        const cleanedString = answer
            .replace(/["\n:'\\n ]/g, '').trim();
        // console.log(cleanedString)
        const matchid = cleanedString.match(/tt\d+/);
        const id = matchid ? matchid[0].match(/tt\d+/) : null;
        const resStr = id ? id[0] : null;
        // console.log(resStr)

        const similarMovieId = resStr ? resStr.slice(0, 2) + resStr.slice(3, 6) + resStr.slice(7, 10) + resStr.slice(11, 12) : ''
        console.log("2", similarMovieId)
        return similarMovieId
    }
    const [result, setResult] = useState<any>([])

    const searchPlot = async () => {
        try {
            setLoading(true)
            if (Plot.length > 0) {
                const response = await fetch(`/api/fav-plots?Plot=${Plot}`, {
                    method: 'GET'
                });

                if (!response.ok || response.status !== 200) {
                    throw new Error('Failed to  retrive the movie!')
                }
                console.log("res", response)
                const reader = response?.body?.pipeThrough(new TextDecoderStream()).getReader();
                let resptext = "";
                while (true) {

                    const { value, done } = await reader?.read()!;

                    if (done) {

                        break;

                    }

                    resptext += value;

                    // setAnswer(resptext);

                }
                const jsonResponse = JSON.parse(resptext!);
                // console.log(jsonResponse);
                setResult(jsonResponse.result)
                // console.log("Movie", jsonResponse)
            }

            //  searchFromApiById2({ imdbId: answer })
        }
        // console.log("answer", answer)

        catch (err) {
            console.log("ERROR:", err)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setAnswer('')
    }, [Plot])

    useEffect(() => {
        setRes({})
        if (answer.length > 0) {
            searchFromApiById2({ imdbId: answer })
        }
    }, [answer])
    return (

        <PlotContext.Provider value={{ Plot, setPlot, searchPlot, answer, loading, res, result }}>
            {children}

        </PlotContext.Provider>


    )

}