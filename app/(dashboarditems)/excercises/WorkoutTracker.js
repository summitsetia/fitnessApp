"use client";
import React, { useState } from "react";
import exerciseData from "./exerciseData";
import { createClient } from "@/utils/supabase/client";

const WorkoutTracker = () => {
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [workoutLog, setWorkoutLog] = useState([]);
  const supabase = createClient();

  async function addExercise(event) {
    const { value } = event.target;
    setWorkoutLog([
      ...workoutLog,
      {
        id: workoutLog.length + 1,
        exerciseName: value,
        sets: [
          {
            sets: null,
            weight: null,
          },
        ],
      },
    ]);

    const { data, error } = await supabase
      .from("excercises")
      .insert({ name: value });

    if (error) {
      console.log(error);
    }

    if (data) {
      a;
      console.log(data);
    }

    setShowAddDropdown(false);
  }

  function handleChange(event, workoutId, setIndex) {
    const { name, value } = event.target;

    setWorkoutLog((prevValue) =>
      prevValue.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sets: workout.sets.map((set, index) =>
                index === setIndex ? { ...set, [name]: value } : set
              ),
            }
          : workout
      )
    );
  }

  function handleAddSet(workoutId) {
    console.log(workoutId);
    setWorkoutLog((prevWorkoutLog) =>
      prevWorkoutLog.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sets: [...workout.sets, { weight: null, reps: null }],
            }
          : workout
      )
    );
  }

  return (
    <div className="p-5 ">
      {workoutLog.length > 0 &&
        workoutLog.map((workout, index) => (
          <div key={index} className="py-5">
            <p>Exercise: {workout.exerciseName}</p>
            {workout.sets.map((set, setIndex) => (
              <>
                <p key={setIndex}>Set {setIndex + 1}</p>
                <form>
                  <input
                    type="text"
                    placeholder="weight"
                    onChange={(event) =>
                      handleChange(event, workout.id, setIndex)
                    }
                    name="weight"
                    value={set.weight}
                  />
                  <input
                    type="text"
                    placeholder="reps"
                    onChange={(event) =>
                      handleChange(event, workout.id, setIndex)
                    }
                    name="reps"
                    value={set.reps}
                  />
                </form>
              </>
            ))}
            <button onClick={() => handleAddSet(workout.id)}>Add Set</button>
          </div>
        ))}
      {showAddDropdown ? (
        <>
          <label htmlFor="exercise">Choose a exercise: </label>
          <select
            name="exercise"
            id="exercise"
            form="exerciseform"
            onChange={addExercise}
          >
            {exerciseData.map((item) => (
              <option key={item.id} value={item.excercise}>
                {item.excercise}
              </option>
            ))}
          </select>
        </>
      ) : (
        <button onClick={() => setShowAddDropdown(true)}>Add Exercise</button>
      )}
    </div>
  );
};

export default WorkoutTracker;
