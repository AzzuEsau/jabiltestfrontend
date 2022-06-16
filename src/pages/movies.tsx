import React, { useState, useEffect} from "react";
import IMovie from "../interfaces/models/Imovie";
import IPage from "../interfaces/ipage";

const Movies: React.FunctionComponent<IPage> = porps => {

    const [movies, setMovies] = useState<IMovie[] | null>([]);

    useEffect(() => {
        fetch("https://localhost:5001/movies/GetAllMovies", {
                method: "GET",
            }).then(res => {
                return res.json();
            }).then(setMovies);
    }, [setMovies]);


    return (
        <div className="mx-auto container bg-slate-600 min-h-screen">
            <h1 className="text-2xl font-semibold p-5">Movie Gallery</h1>
            <div className="p-2">
                <a className="bg-lime-500 hover:bg-lime-600 rounded-lg p-2" href={'/movies/newmovie'}>Create Movie</a>
            </div>
            <p>We have some movies like:</p>
            <br />


            {movies && movies.map((current)=>
            {
                if(current.enabled)
                    return(
                        <div key={current.id}>
                            <p>--------------------------------------------------------------</p>
                            <p className="text-2xl font-semibold">{current.name}</p>
                            <p>{current.description}</p>
                            <p>{current.fKclassification.name}</p>
                            <p>{current.fKdirector.firstName} {current.fKdirector.lastName}</p>
                            <br />
                            <div className="p-2">
                                <a className="bg-blue-400 hover:bg-blue-300 rounded-lg p-2" href={'/movies/'+current.id}>Edit</a>
                            </div>
                            <br />
                        </div>
                )
            })}
        </div>
    )
}

export default Movies;