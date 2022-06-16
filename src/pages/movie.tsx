import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";
import IPage from "../interfaces/ipage";
import { Route, RouteProps, useLocation, useNavigate, useParams } from 'react-router-dom';
import IMovie from "../interfaces/models/Imovie";
import IClassification from "../interfaces/models/Iclassification";
import IDirector from "../interfaces/models/Idirector";

const Movie: React.FunctionComponent<IPage & RouteProps> = porps => {
    let {number} =useParams()

    const [movie, setMovie] = useState<IMovie | null>(null);
    const [classifiactions, setClassifications] = useState<IClassification[] | null>([]);
    const [directories, setDirectories] = useState<IDirector[] | null>([]);
    const [modifiedMovie, setModifiedMovie] = useState({
        name: "",
        description: "",
        fKclassification: 0,
        fKdirector: 0,
        enabled: true,
    });

    const naviagate = useNavigate();

    //
    useEffect(() => {
        fetch(`https://localhost:5001/movies/GetMovieById/${number}`, {
                method: "GET",
            }).then(res => {
                return res.json();
            }).then(data => {
                setMovie(data); 
                setModifiedMovie(
                    {
                        name : data.name,
                        description : data.description,
                        fKclassification : data.fKclassification.id,
                        fKdirector : data.fKdirector.id,
                        enabled : data.enabled
                    }
                )
            });

        fetch("https://localhost:5001/classifications/GetAllClassifications", {
            method: "GET",
            }).then(res => {
                return res.json();
            }).then(setClassifications);

        fetch("https://localhost:5001/directors/GetAllDirectors", {
            method: "GET",
            }).then(res => {
                return res.json();
            }).then(setDirectories);

    }, [setMovie, setClassifications, setDirectories]);

    const handleInputChange = (event: { target: { value: any; name: any; }; }) => {
        setModifiedMovie({
            ...modifiedMovie,
            [event.target.name] : event.target.value
        });
    }

    const updateMovie = useCallback((e: { preventDefault: () => void; }) => {
        //@ts-ignore
        e.preventDefault();
        
        fetch(`https://localhost:5001/movies/UpdateMovieById/${number}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(
                {
                    id: 0,
                    name: modifiedMovie.name,
                    description: modifiedMovie.description,
                    fKclassification: {
                        id: modifiedMovie.fKclassification,
                        name: "string"
                    },
                    fKdirector: {
                        id: modifiedMovie.fKdirector,
                        firstName: "string",
                        lastName: "string",
                        age: 0,
                        update: "2022-06-16T03:05:46.813Z",
                        enabled: true
                    },
                    update: "2022-06-16T03:05:46.813Z",
                    enabled: modifiedMovie.enabled
                }
            )
        }).then(res => { naviagate("/movies");
        return res.json});
    }, [modifiedMovie]);

    const deleteMovie = useCallback((e: { preventDefault: () => void; }) => {
        //@ts-ignore
        e.preventDefault();
        
        fetch(`https://localhost:5001/movies/ChangeStatusMovieById/${number}`, {
            method: "PUT"
        }).then(res => { naviagate("/movies");
        return res.json});
    }, [modifiedMovie]);


    return movie && classifiactions && directories && movie.enabled ? (
        <div className="mx-auto container bg-slate-600 min-h-screen">

            <h2 className="text-2xl font-semibold">Edit the movie</h2>
            <div className="">
                <form action="">
                    <p>Name</p>
                    <input type="text" name="name" onChange={handleInputChange} defaultValue={movie.name}/>

                    <p>Description</p>
                    <input type="text" name="description" onChange={handleInputChange} defaultValue={movie.description}/>

                    <p>Classification</p>
                    <select name="fKclassification" onChange={handleInputChange} defaultValue={movie.fKclassification.id}>
                        {classifiactions.map(current => <option key={current.id} value={current.id}>{current.name}</option>)}
                    </select>

                    <p>Director</p>
                    <select name="fKdirector" onChange={handleInputChange} defaultValue={movie.fKdirector.id}>
                        {directories.map(current =>
                        {
                            if(current.enabled)
                                return (
                                    <option key={current.id} value={current.id}>{current.firstName + " " + current.lastName}</option>)}
                                )
                        } 
                    </select>
                    
                </form>
            </div>

            <div className="flex justify-center mt-10">
                <div className="mr-10">
                    <button type="button" onClick={updateMovie} className="bg-blue-400 hover:bg-blue-300 rounded-lg p-2">Apply Changes</button>
                </div>

                <div className="ml-5">
                    <button type="button" onClick={deleteMovie} className="bg-red-400 hover:bg-red-500 rounded-lg p-2">Delete</button>
                </div>
            </div>
        </div>
    ) :
    (
        <div>
            <p>The movie wasn't founded</p>
        </div>
    )
}

export default Movie;