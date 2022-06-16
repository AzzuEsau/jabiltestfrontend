import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";
import IPage from "../interfaces/ipage";
import { Route, RouteProps, useLocation, useNavigate, useParams } from 'react-router-dom';
import IMovie from "../interfaces/models/Imovie";
import IClassification from "../interfaces/models/Iclassification";
import IDirector from "../interfaces/models/Idirector";

const NewMovie: React.FunctionComponent<IPage & RouteProps> = porps => {

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

    const handleInputChange = (event: { target: { value: any; name: any; }; }) => {
        setModifiedMovie({
            ...modifiedMovie,
            [event.target.name] : event.target.value
        });
    }

    useEffect(() => {
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

    }, [setClassifications, setDirectories]);


    const updateMovie = useCallback((e: { preventDefault: () => void; }) => {
        //@ts-ignore
        e.preventDefault();
        
        fetch(`https://localhost:5001/movies/AddNewMovie`, {
            method: "POST",
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
                    enabled: true
                }
            )
        }).then(res => {
            
        naviagate("/movies");
        return res.json});
    }, [modifiedMovie]);

    return classifiactions && directories ? (
        <div className="mx-auto container bg-slate-600 min-h-screen">
            {/* <div>
                <h3 className="text-2xl font-semibold">{movie.name}</h3>
                <p>{movie.description}</p>
                <p className="underline">{movie.fKclassification.name}</p>
                <p>{movie.fKdirector.firstName} {movie.fKdirector.lastName}</p>
            </div> */}

            <h2 className="text-2xl font-semibold">Create new movie</h2>
            <div className="">
                <form action="">
                    <p>Name</p>
                    <input type="text" name="name" onChange={handleInputChange}/>

                    <p>Description</p>
                    <input type="text" name="description" onChange={handleInputChange}/>

                    <p>Classification</p>
                    <select name="fKclassification" onChange={handleInputChange}>
                        {classifiactions.map(current => <option key={current.id} value={current.id}>{current.name}</option>)}
                    </select>

                    <p>Director</p>
                    <select name="fKdirector" onChange={handleInputChange}>
                        {directories.map(current => <option key={current.id} value={current.id}>{current.firstName + " " + current.lastName}</option>)}
                    </select>
                    
                </form>
            </div>

            <div className="flex justify-center mt-10">
                <div className="">
                    <button type="button" onClick={updateMovie} className="bg-blue-400 hover:bg-blue-300 rounded-lg p-2">Apply Changes</button>
                </div>
            </div>
        </div>
    ) :
    (
        <div> error void </div>
    )
}

export default NewMovie;