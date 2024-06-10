'use client'
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { supabase } from '../notes/page'

const Tracker = () => {
    const [calories, setCalories] = useState("");
    const [fetchError, setFetchError] = useState(null)
    const API_KEY = "3cgZDgcBsGkJoitjS+y1hA==VfY5rwMR5sPyhFtW";
    const item = "100g eggs";

    useEffect(() => {
        Axios.get(`https://api.api-ninjas.com/v1/nutrition?query= + ${item}`, {
            headers: {
                'X-Api-Key': API_KEY
            }
        }).then((res) => {
            setCalories(res.data);
        })
    }, []);

    const updateTable = async () => {
        const { data, error } = await supabase
            .from('item')
            .insert([{item, calories}])
        
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
                {calories.length > 0 ? <h1>{calories[0].calories} kcal</h1> : <h1>Loading...</h1>}
                <button onClick={updateTable}>Yo</button>
            </div>        
        </div>
    )
}

export default Tracker;