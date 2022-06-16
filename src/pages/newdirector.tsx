import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";
import IPage from "../interfaces/ipage";
import { Route, RouteProps, useLocation, useNavigate, useParams } from 'react-router-dom';
import IDirector from "../interfaces/models/Idirector";


const NewDirector: React.FunctionComponent<IPage> = porps => {
    const naviagate = useNavigate();

    const [modifiedDirector, setModifiedDirector] = useState({
        firstName: "",
        lastName: "",
        age: 0
    });

    const handleInputChange = (event: { target: { value: any; name: any; }; }) => {
        setModifiedDirector({
            ...modifiedDirector,
            [event.target.name] : event.target.value
        });

        console.log(modifiedDirector);
        
    }

    const createDirector = useCallback((e: { preventDefault: () => void; }) => {
        //@ts-ignore
        e.preventDefault();
        
        fetch(`https://localhost:5001/directors/AddNewDirector`, {
            method: "POST",
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

    return (
        <div className="mx-auto container bg-slate-600 min-h-screen">
            <h2 className="text-2xl font-semibold">Create Director</h2>
            <div className="">
                <form action="">
                    <p>First Name</p>
                    <input type="text" name="firstName" onChange={handleInputChange}/>

                    <p>Last Name</p>
                    <input type="text" name="lastName" onChange={handleInputChange}/>

                    <p>Age</p>
                    <input type="number" name="age" onChange={handleInputChange}/>
                </form>
            </div>

            <div className="flex justify-center mt-10">
                <div className="">
                    <button type="button" onClick={createDirector} className="bg-blue-400 hover:bg-blue-300 rounded-lg p-2">Create</button>
                </div>
            </div>
        </div>
    )
}

export default NewDirector;