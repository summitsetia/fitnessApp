'use client';
import React from 'react';


const Dashboard = () => {

    return (
        <div className='py-36 bg-[#FBFBFF]'> 
            <div className='pb-8'>
                <h1 className='font-bold text-5xl'>Dashboard</h1>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='border-2 border-solid h-32 w-96 bg-white flex flex-col items-center'>
                    <h1 className='font-bold'>Calories Consumed</h1>
                    <h1></h1>
                    <p></p> 
                </div>
                <div className='border-2 border-solid h-32 w-96 bg-white flex flex-col items-center'> 
                    <h1 className='font-bold'>Protein Consumed</h1>
                    <p></p>
                </div>
                <div className='border-2 border-solid h-32 w-96 bg-white flex flex-col items-center'>
                    <h1 className='font-bold'>Carbs Consumed</h1>
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
