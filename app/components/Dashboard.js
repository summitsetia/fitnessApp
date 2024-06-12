'use client';
import React from 'react';
import { useEffect , useState } from 'react';
import { createClient } from '../../utils/supabase/client';


const Dashboard = () => {
    const supabase = createClient()
    const [fetchError, setFetchError] = useState(null)
    const [data, setData] = useState(null)
    const [totalCalories, setTotalCalories] = useState(0)

    useEffect (() => {
        const fetchData = async () => {
            const { data, error } = await supabase
            .from('food_log')
            .select()

            if(error) {
                console.log(error)
                setFetchError("There is an error")
            }
            
            if(data) {
                console.log(data)
                setFetchError(null)
                setData(data)

                const total = data.reduce((sum, element) => sum + element.calories, 0);
                setTotalCalories(total)
            }
        }



        fetchData()


    } , [])

    return (
        <div className='py-36 bg-[#FBFBFF]'> 
            <div className='pb-8'>
                <h1 className='font-bold text-5xl'>Dashboard</h1>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='border-2 border-solid h-32 w-96 bg-white flex flex-col items-center'>
                    <h1 className='font-bold'>Calories Consumed</h1>
                    <h1>{data && data[0] ? `${totalCalories} kcal` : '0 kcal'}</h1>
                    <p></p> 
                </div>
                <div className='border-2 border-solid h-32 w-96 bg-white flex flex-col items-center'> 
                    <h1 className='font-bold'>Protein Consumed</h1>
                    <p>{fetchError}</p>
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
