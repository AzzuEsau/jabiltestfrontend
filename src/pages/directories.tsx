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
        <div>
            <p>Hola mundo soy el catalogo de los directores</p>
            <p>Our registered directors are:</p>
            <br />


            {directories && directories.map((current)=>
            {
                if(current.enabled)
                    return(
                        <div key={current.id}>
                            <p>--------------------------------------------------------------</p>
                            <p>{current.firstName} {current.lastName}</p>
                            <p>{current.age} years old</p>
                            <br />
                            <a href={'/directories/'+current.id}>Open</a>
                            <br />
                        </div>
                )
            })}
        </div>
    )
}

export default Directories;