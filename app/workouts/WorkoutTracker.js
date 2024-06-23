'use client'
import React, { useState } from "react";
import { createClient } from '../../utils/supabase/client';
import excerciseData from './excerciseData'

const WorkoutTracker = () => {
    const supabase = createClient();
    const [formData, setFormData] = useState({ weight: "", reps: "" });
    const [submittedData, setSubmittedData] = useState({ weight: 0, reps: 0 });
    const [showDropdown, setShowDropdown] = useState(false)

    const updateTable = async ( userData ) => {
        const {data, error} = await supabase
        .from("workouts")
        .insert({weight: userData.weight, reps: userData.reps})

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
        updateTable(submittedData)
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
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setShowDropdown(false)}
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
            <DropDown showDropdown={showDropdown}/>
        </div>
    );
};

const DropDown = ({ showDropdown }) => {
    return (
        <div>
            {excerciseData.map((exercise) => {
                return (
                    showDropdown && (
                        <div>
                            <h1>{exercise.exercise}</h1>
                        </div>
                    )
                );
            })}
        </div>
    );
};


export default WorkoutTracker;
