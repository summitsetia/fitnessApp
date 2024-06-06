'use client';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Dashboard = () => {
    const [fact, setFact] = useState("");
    const API_KEY = "3cgZDgcBsGkJoitjS+y1hA==VfY5rwMR5sPyhFtW";
    const query = "100g eggs";

    useEffect(() => {
        Axios.get(`https://api.api-ninjas.com/v1/nutrition?query= + ${query}`, {
            headers: {
                'X-Api-Key': API_KEY
            }
        }).then((res) => {
            setFact(res.data);
        })
    }, []);

    return (
        <div className='py-36 bg-[#FBFBFF]'> 
            <div className='pb-8'>
                <h1 className='font-bold text-5xl'>Dashboard</h1>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='border-2 border-solid h-32 w-96 bg-white flex flex-col items-center'>
                    <h1 className='font-bold'>Calories Consumed</h1>
                    {fact.length > 0 ? <h1>{fact[0].calories} kcal</h1> : <h1>Loading...</h1>}
                    <p></p> 
                </div>
                <div className='border-2 border-solid h-32 w-96 bg-white flex flex-col items-center'> 
                    <h1 className='font-bold'> Protein Consumed </h1>
                    <p></p>
                </div>
                <div className='border-2 border-solid h-32 w-96 bg-white flex flex-col items-center'>
                    <h1 className='font-bold' >Carbs Consumed </h1>
                    <p></p>
                </div>
                <div className='border-2 border-solid h-48 w-96 bg-white flex flex-col items-center'>
                    <h1 className='font-bold'></h1>
                    <p></p>
                </div>
                <div className='border-2 border-solid h-48 w-96 bg-white flex flex-col items-center'>
                    <h1 className='font-bold'></h1>
                    <p></p>
                </div>
                <div className='border-2 border-solid h-48 w-96 bg-white flex justify-center flex-col items-center'>
                    <h1 className='font-bold'></h1>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
