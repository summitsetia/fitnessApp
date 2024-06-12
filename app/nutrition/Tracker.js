'use client'
import React, { useState } from 'react';
import Axios from 'axios';
import { createClient } from '../../utils/supabase/client';

const Tracker = () => {
    const supabase = createClient()

    const [calories, setCalories] = useState(0);
    const [fetchError, setFetchError] = useState(null)
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const [formData, setFormData] = useState({foodQuantity : "", foodName: ""})

    const updateTable = async (calories) => {
        console.log("clicked")
        console.log("calories from updateTable", calories)
        const { data, error } = await supabase
            .from('food_log')
            .insert({ calories: calories, foodQuantity: formData.foodQuantity, foodName: formData.foodName})
        
        if (error) {
            console.log(error)
            setFetchError("No calories")
        }
        if (data) {
            console.log(data)
            setFetchError(null)
        }
    }

    const handleChange = (event) => {
        return setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }   
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        Axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${formData.foodQuantity} ${formData.foodName}`, {
            headers: {
                'X-Api-Key': API_KEY
            }
        }).then((res) => {
            setCalories(res.data[0].calories);
            updateTable(res.data[0].calories)
        })
            
        }
    
    return (
        <div>
            <div className='pt-64'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="foodQuantity"
                        onChange={handleChange}
                        name="foodQuantity"
                        value={formData.foodQuantity}
                    />
                    <input 
                        type="text"
                        placeholder="foodName"
                        onChange={handleChange}
                        name="foodName"
                        value={formData.foodName}
                    />
                    <button type="submit">Hello</button>
                </form>
                {calories > 0 ? <h1>{calories} kcal</h1> : <h1>Loading...</h1>}
                <h1>{fetchError}</h1>
            </div>        
        </div>
    )
}

export default Tracker;

