'use client'
import React, { useState } from "react"
import WorkoutTracker2 from "./WorkoutTracker2";
import { createClient } from '../../utils/supabase/client';

const NewWorkout = () => {
    const [workoutNumber, setWorkoutNumber] = useState([])
    const supabase = createClient()
    
    const createNewWorkout = async () => {
        setWorkoutNumber(prevData => [...prevData, {id: workoutNumber.length + 1} ])
        console.log(workoutNumber)

        const { data, error } = await supabase
        .from('workouts')
        .insert({})

        if (error) {
            console.log(error)
        }

        if (data) {
            console.log(data)
        }
    }
    return (
        <div>
            <button onClick={createNewWorkout}>Add New Workout</button>
            {workoutNumber.map((workout) => (
                <WorkoutTracker2 id={workout.id}/>
            ))}
        </div>
    )
}

export default NewWorkout;