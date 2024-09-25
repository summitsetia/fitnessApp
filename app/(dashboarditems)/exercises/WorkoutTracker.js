"use client";

import React, { useState } from "react";
import exerciseData from "@/public/exerciseData.json";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const WorkoutTracker = () => {
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [excerciseName, setExcerciseName] = useState({ name: "" });
  const supabase = createClient();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const submitData = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.getUser();
    if (data) {
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .insert({ users_id: data.user.id, workout_name: excerciseName.name })
        .select("*");

      if (workoutData) {
        const { data: excerciseData, error: excerciseError } = await supabase
          .from("excercises")
          .insert(
            workoutLog.map((excercise) => ({
              workouts_id: workoutData[0].id,
              name: excercise.exerciseName,
            }))
          )
          .select("*");

        if (excerciseData) {
          const { data: setsData, error: setsError } = await supabase
            .from("sets")
            .insert(
              workoutLog.flatMap((excercise, index) =>
                excercise.sets.map((set, setIndex) => ({
                  excercise_id: excerciseData[index].id,
                  weight: set.weight,
                  reps: set.reps,
                  posistion: setIndex + 1,
                }))
              )
            )
            .select("*");

          if (setsError) {
            console.log(setsError);
          }
        }

        if (excerciseError) {
          console.log(excerciseError);
        }
      }

      if (workoutError) {
        console.log(workoutError);
      }
    }

    if (error) {
      console.log(error);
    }

    setTimeout(() => {
      router.push("/workouts");
    }, 300);
  };

  function addExercise(event) {
    const { value } = event.target;
    if (value !== "default") {
      setWorkoutLog([
        ...workoutLog,
        {
          id: workoutLog.length + 1,
          exerciseName: value,
          sets: [{ weight: null, reps: null }],
        },
      ]);
      setShowAddDropdown(false);
    }
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

  const handleNameChange = (event) => {
    const { name, value } = event.target;
    setExcerciseName(() => ({ [name]: value }));
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={submitData}>
        <div className="">
          <div className="flex justify-between">
            <Input
              type="text"
              placeholder="Workout Name"
              name="name"
              value={excerciseName.name}
              onChange={handleNameChange}
              required
            />
            {workoutLog.length > 0 && (
              <div className="">
                <Button type="submit" variant="ghost" className="bg-green-200">
                  Finish
                </Button>
              </div>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p>
          )} {/* Display validation error */}

          {workoutLog.length > 0 &&
            workoutLog.flatMap((workout, index) => (
              <div className="flex justify-center flex-col" key={index}>
                <div className="py-5">
                  <p className="text-lg font-bold">{workout.exerciseName}</p>
                  {workout.sets.map((set, setIndex) => (
                    <div key={setIndex}>
                      <p className="py-4">Set {setIndex + 1}</p>
                      <div className="flex lg:space-x-4 sm:space-x-0">
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          placeholder="weight (in kg)"
                          onChange={(event) =>
                            handleChange(event, workout.id, setIndex)
                          }
                          name="weight"
                          value={set.weight}
                          className="border px-2 py-2"
                          required
                        />
                        <Input
                          placeholder="reps"
                          type="number"
                          min="1"
                          max="100"
                          name="reps"
                          className="border px-2 py-2"
                          onChange={(event) =>
                            handleChange(event, workout.id, setIndex)
                          }
                          value={set.reps}
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <Button variant="outline" onClick={() => handleAddSet(workout.id)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Set
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          {showAddDropdown ? (
            <>
              <label htmlFor="exercise">Choose an exercise: </label>
              <select
                name="exercise"
                id="exercise"
                onChange={addExercise}
              >
                <option value="default">Choose An Exercise</option>
                {exerciseData.map((item) => (
                  <option key={item.id} value={item.exercise}>
                    {item.exercise}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <div className="flex justify-center ">
              <Button
                className="w-32 bg-blue-200"
                onClick={() => setShowAddDropdown(true)}
              >
                Add Exercise
              </Button>
            </div>
          )}
          <div className="flex justify-center my-4">
            <Button variant="destructive" className="w-32" asChild>
              <Link href="/workouts">Cancel Workout</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkoutTracker;
