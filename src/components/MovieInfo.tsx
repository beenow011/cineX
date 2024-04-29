import Image from "next/image"

interface props {
    Title: string, Director: string, Genre: string, Language: string, Runtime: string, imdbRating: string, Year: string, Poster: string, Plot: string, Actors: string
}
export const MovieInfo = ({ Title, Director, Genre, Language, Runtime, imdbRating, Year, Poster, Plot, Actors }: props) => {

    return (
        <div className="flex md:flex-row flex-col gap-3 divide-x divide-slate-500">
            <div className="px-1 ">
                <img src={Poster} alt="Poster" className="w-full h-full" />
            </div>
            <div className="">
                <div className="px-2 ">
                    <h1 className="text-white font-bold text-2xl">{Title}</h1>
                    <div className="flex gap-2 ">
                        <p className="text-cyan-600">{Language}</p>
                        <p className="text-slate-400">{Year}</p>
                    </div>
                    <p className='text-slate-300'>Director : {Director}</p>
                    <p className='text-slate-300'>Actors : {Actors}</p>
                    <p className='text-slate-300'>Genre : {Genre}</p>
                    <p className='text-slate-300'>Runtime : {Runtime}</p>
                    <p className='text-slate-300'>imdbRating : {imdbRating}</p>


                </div>
                <div className="px-2 ">
                    <p className='text-cyan-300'>Plot: {Plot}</p>
                </div>
            </div>
        </div>
    )
}