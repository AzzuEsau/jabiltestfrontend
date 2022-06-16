import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";
import IPage from "../interfaces/ipage";
import { Route, RouteProps, useLocation, useNavigate, useParams } from 'react-router-dom';
import IDirector from "../interfaces/models/Idirector";


const Director: React.FunctionComponent<IPage> = porps => {
    let {number} =useParams();
    const naviagate = useNavigate();

    const [director, setDirector] = useState<IDirector | null>(null);
    const [modifiedDirector, setModifiedDirector] = useState({
        firstName: "",
        lastName: "",
        age: 0
    });

    useEffect(() => {
        fetch(`https://localhost:5001/directors/GetDirectorById/${number}`, {
            method: "GET",
            }).then(res => {
                return res.json();
            }).then(data => {
                setDirector(data);
                setModifiedDirector(
                    {
                        firstName : data.firstName,
                        lastName : data.lastName,
                        age : data.age,
                    }
                );
            });
    }, [setDirector]);

    const handleInputChange = (event: { target: { value: any; name: any; }; }) => {
        setModifiedDirector({
            ...modifiedDirector,
            [event.target.name] : event.target.value
        });

        console.log(modifiedDirector);
        
    }

    const updateDirector = useCallback((e: { preventDefault: () => void; }) => {
        //@ts-ignore
        e.preventDefault();
        
        fetch(`https://localhost:5001/directors/UpdateDirectorById/${number}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(
                {
                    id: 0,
                    firstName: modifiedDirector.firstName,
                    lastName: modifiedDirector.lastName,
                    age: modifiedDirector.age,
                    update: "2022-06-15T01:28:01.561882",
                    enabled: true
                }
            )
        }).then(res => { 
            console.log(res.status);
            naviagate("/directories");
            return res.json});
    }, [modifiedDirector]);

    const deleteDirector = useCallback((e: { preventDefault: () => void; }) => {
        //@ts-ignore
        e.preventDefault();
        
        fetch(`https://localhost:5001/directors/ChangeStatusDirectorById/${number}`, {
            method: "PUT"
        }).then(res => { naviagate("/directories");
        return res.json});
    }, [modifiedDirector]);

    return director && director.enabled ? (
        <div className="mx-auto container bg-slate-600 min-h-screen">

        <h2 className="text-2xl font-semibold">Edit Director</h2>
        <div className="">
            <form action="">
                <p>First Name</p>
                <input type="text" name="firstName" onChange={handleInputChange} defaultValue={director.firstName}/>

                <p>Last Name</p>
                <input type="text" name="lastName" onChange={handleInputChange} defaultValue={director.lastName}/>

                <p>Age</p>
                <input type="number" name="age" onChange={handleInputChange} defaultValue={director.age}/>
            </form>
        </div>

        <div className="flex justify-center mt-10">
            <div className="mr-10">
                <button type="button" onClick={updateDirector} className="bg-blue-400 hover:bg-blue-300 rounded-lg p-2">Apply Changes</button>
            </div>

            <div className="ml-5">
                <button type="button" onClick={deleteDirector} className="bg-red-400 hover:bg-red-500 rounded-lg p-2">Delete</button>
            </div>
        </div>
        </div>
    ) :
    (
        <div>
            <p>The director wasn't founded</p>
        </div>
    )
}

export default Director;