"use client";
import React, { useState } from "react";
import exerciseData from "./exerciseData";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const WorkoutTracker = () => {
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [workoutLog, setWorkoutLog] = useState([]);
  const supabase = createClient();

  const submitData = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data) {
      console.log(data);
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .insert({ users_id: data.user.id });

      if (workoutData) {
        const { data: excerciseData, error: excerciseError } = await supabase
          .from("excercises")
          .insert(
            workoutLog.map((excercise) => ({
              excercise_id: workoutData.user.id,
              name: excercise.excerciseName,
            }))
          );
        if (excerciseData) {
          console.log(excerciseData);
        }

        if (excerciseError) {
          console.log(excerciseError);
        }
        console.log(workoutData);
      }

      if (workoutError) {
        console.log(workoutError);
      }
    }

    if (error) {
      console.log(error);
    }
  };

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
                    type="number"
                    placeholder="weight (in kg)"
                    onChange={(event) =>
                      handleChange(event, workout.id, setIndex)
                    }
                    name="weight"
                    value={set.weight}
                  />
                  <input
                    type="number"
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
      {workoutLog.length > 0 && (
        <Link href="/workouts">
          <Button variant="ghost" onClick={submitData}>
            Finish Workout
          </Button>
        </Link>
      )}
    </div>
  );
};

export default WorkoutTracker;
