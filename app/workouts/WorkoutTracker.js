'use client'
import React, { useState } from "react";
import { createClient } from '../../utils/supabase/client';

const WorkoutTracker = () => {
    const supabase = createClient();
    const [formData, setFormData] = useState({ weight: 0, reps: 0 });
    const [submittedData, setSubmittedData] = useState({ weight: 0, reps: 0 });

    const updateTable = async ( submittedData ) => {
        const {data, error} = await supabase
        .from("workouts")
        .insert({weight: submittedData.weight, reps: submittedData.reps})

        if (error) {
            console.log(error)
        }

        if (data) {
            console.log(data)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmittedData(formData);
        updateTable(setSubmittedData)
    };

    return (
        <div className="py-64">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="weight"
                    onChange={handleChange}
                    name="weight"
                    value={formData.weight}
                    className='border'
                />
                <input
                    type="text"
                    placeholder="reps"
                    onChange={handleChange}
                    name="reps"
                    value={formData.reps}
                    className="border"
                />
                <button type="submit" className='border'>Submit</button>
            </form>
            {submittedData.weight > 0 ? <h1 className="border">{submittedData.weight} kg</h1> : <h1></h1>}
            {submittedData.reps > 0 ? <h1 className="border">{submittedData.reps}</h1> : <h1></h1>}
        </div>
    );
};

export default WorkoutTracker;
