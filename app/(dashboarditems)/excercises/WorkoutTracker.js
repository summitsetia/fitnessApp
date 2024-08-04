"use client";
import React, { useState } from "react";
import exerciseData from "@/public/exerciseData.json";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const WorkoutTracker = () => {
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [excerciseName, setExcerciseName] = useState({ name: "" });
  const [selectedExercise, setSelectedExercise] = useState("");
  const supabase = createClient();


  const submitData = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data) {
      console.log(data);
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .insert({ users_id: data.user.id, workout_name: excerciseName.name })
        .select("*");
      if (workoutData) {
        console.log(workoutData);
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
          console.log(excerciseData);
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

          if (setsData) {
            console.log(setsData);
          }

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
  };

  function addExercise(event) {
    const { value } = event.target;
    if (value !== "default") {
      setWorkoutLog([
        ...workoutLog,
        {
          id: workoutLog.length + 1,
          exerciseName: value,
          sets: [
            {
              weight: null,
              reps: null,
            },
          ],
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

  const handleNameChange = (event) => {
    const { name, value } = event.target;
    setExcerciseName(() => ({
      [name]: value,
    }));
    console.log(excerciseName);
  };

  return (
    <div className="flex justify-center">
      <div className="">
        <div className="flex justify-between">
          <form className="pb-4">
            <input
              type="text"
              placeholder="Workout Name"
              name="name"
              value={excerciseName.name}
              onChange={handleNameChange}
            />
          </form>
          {workoutLog.length > 0 && (
            <div className="">
              <Link href="/workouts">
                <Button
                  variant="ghost"
                  className="bg-green-200"
                  onClick={submitData}
                >
                  Finish
                </Button>
              </Link>
            </div>
          )}
        </div>
        {workoutLog.length > 0 &&
          workoutLog.flatMap((workout, index) => (
            <div className="flex justify-center flex-col">
              <div key={index} className="py-5">
                <p>{workout.exerciseName}</p>
                {workout.sets.map((set, setIndex) => (
                  <>
                    <p key={setIndex}>Set {setIndex + 1}</p>
                    <div className=" ">
                      <form className="lg:space-x-4 sm:space-x-0">
                        <input
                          type="number"
                          placeholder="weight (in kg)"
                          onChange={(event) =>
                            handleChange(event, workout.id, setIndex)
                          }
                          name="weight"
                          value={set.weight}
                          className="border"
                        />
                        <input
                          type="number"
                          placeholder="reps"
                          onChange={(event) =>
                            handleChange(event, workout.id, setIndex)
                          }
                          name="reps"
                          value={set.reps}
                          className="border"
                        />
                      </form>
                    </div>
                  </>
                ))}
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleAddSet(workout.id)}
                  >
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
              form="exerciseform"
              onChange={addExercise}
              value={selectedExercise}
            >
              <option value="default">Choose an exercise</option>
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
    </div>
  );
};

export default WorkoutTracker;

