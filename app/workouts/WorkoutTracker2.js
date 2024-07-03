'use client'
import React, { useState } from 'react'
import exerciseData from './exerciseData';


const WorkoutTracker2 = () => {
    const [showAddDropdown, setShowAddDropdown] = useState(false);
    const [workoutLog, setWorkoutLog] = useState([]);

    function addExercise(event) {
        const { value } = event.target;


        setWorkoutLog([...workoutLog, {
            id: workoutLog.length + 1,
            exerciseName: value,
            sets: [
                {
                    weight: 0,
                    reps: 0
                }
            ]
        }])

        setShowAddDropdown(false)
    }

    // function onChange() {
    //     const { value } = event.target;

    //     setWorkoutLog([...workoutLog, {

    //     }])

    // }

    function handleAddSet(exerciseId) {
        console.log(exerciseId);
        setWorkoutLog(prevWorkoutLog =>
            prevWorkoutLog.map((workout) =>
                workout.id === exerciseId
                    ? {
                        ...workout,
                        sets: [...workout.sets, { weight: 0, reps: 0 }]
                    }
                    : workout
            )
        );
    }

    return (
        <div className='p-5 '>
            {workoutLog.length > 0 && (
                workoutLog.map((workout, index) => (
                    <div key={index} className='py-5'>
                        <p>Exercise: {workout.exerciseName}</p>
                        {workout.sets.map((set, setIndex) => (
                            <p key={setIndex}>Set {setIndex + 1}: Weight: {set.weight}, Reps: {set.reps}</p>
                        ))}
                        <button onClick={() => handleAddSet(workout.id)}>Add Set</button>
                    </div>
                ))
            )}
            {showAddDropdown ? (
                <>
                    <label htmlFor="exercise">Choose a exercise: </label>
                    <select name="exercise" id="exercise" form="exerciseform" onChange={addExercise}>
                        {exerciseData.map((item) => (
                            <option key={item.id} value={item.excercise}>{item.excercise}</option>
                        ))}
                    </select>
                </>
            ) : (<button onClick={() => setShowAddDropdown(true)}>
                Add Exercsise
            </button>)}


        </div>
    )
}

export default WorkoutTracker2

