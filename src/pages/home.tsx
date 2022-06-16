import React, { useState, useEffect} from "react";
import IPage from "../interfaces/ipage";

const Home: React.FunctionComponent<IPage> = porps => {
    // useCallback
    // Sabes cuando va a suceder

    return (
        <div className="">
            <h1 className="text-2xl font-semibold">Movies Manager</h1>
            
            <p className="mt-10">choose the type</p>
            <div className="flex justify-center mt-5">
                <div className="mr-5">
                    <a className="bg-blue-400 hover:bg-blue-300 rounded-lg p-2" href={'/Directories'}>Directoires</a>
                </div>

                <div className="ml-5">
                    <a className="bg-blue-400 hover:bg-blue-300 rounded-lg p-2" href={'/Movies'}>Movies</a>
                </div>
            </div>

        </div>
    )
}

export default Home;