'use client'
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { createClient } from '../../utils/supabase/client';

const Tracker = () => {
    const supabase = createClient()

    const [calories, setCalories] = useState(0);
    const [fetchError, setFetchError] = useState(null)
    const API_KEY = process.env.REACT_APP_API_KEY;
    const foodQuantity = "80g";
    const foodName = "apple"
    
    useEffect(() => {
        Axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${foodQuantity} ${foodName}`, {
            headers: {
                'X-Api-Key': API_KEY
            }
        }).then((res) => {
            console.log("calories:", res.data[0].calories)
            setCalories(res.data[0].calories);
        })
    }, []);

    const updateTable = async () => {
        console.log("clicked")
        console.log("calories from updateTable", calories)
        const { data, error } = await supabase
            .from('food_log')
            .insert({ calories: calories, foodQuantity: foodQuantity, foodName: foodName})
        
        if (error) {
            console.log(error)
            setFetchError("No calories")
        }
        if (data) {
            console.log(data)
            setFetchError(null)
        }
    }

    return (
        <div>
            <div className='pt-32'>
                {calories > 0 ? <h1>{calories} kcal</h1> : <h1>Loading...</h1>}
                <button onClick={updateTable}>Yo</button>
                <h1>{fetchError}</h1>
            </div>        
        </div>
    )
}

export default Tracker;