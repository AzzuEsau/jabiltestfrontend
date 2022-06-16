import React, { useEffect, useState } from "react";
import IPage from "../interfaces/ipage";
import IDirector from "../interfaces/models/Idirector";

const Directories: React.FunctionComponent<IPage> = porps => {
    const [directories, setDirectories] = useState<IDirector[] | null>([]);

    useEffect(() => {
        fetch("https://localhost:5001/directors/GetAllDirectors", {
            method: "GET",
            }).then(res => {
                return res.json();
            }).then(setDirectories);
    }, [setDirectories]);

    return (
        <div className="mx-auto container bg-slate-600 min-h-screen">
            <h1 className="text-2xl font-semibold p-5">Directories Gallery</h1>
            <div className="p-2">
                <a className="bg-lime-500 hover:bg-lime-600 rounded-lg p-2" href={'/directories/newdirector'}>Create Director</a>
            </div>
            <p>We have some directors like:</p>
            <br />


            {directories && directories.map((current)=>
            {
                if(current.enabled)
                    return(
                        <div key={current.id}>
                            <p>--------------------------------------------------------------</p>
                            <p className="text-xl font-semibold">{current.firstName} {current.lastName}</p>
                            <p>{current.age} years old</p>
                            <br />

                            <div className="p-2">
                                <a className="bg-blue-400 hover:bg-blue-300 rounded-lg p-2" href={'/directories/'+current.id}>Edit</a>
                            </div>
                        </div>
                )
            })}
        </div>
    )
}

export default Directories;