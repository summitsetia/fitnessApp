"use client"; // This directive indicates that the component should be rendered on the client-side.

import React, { useState } from "react"; // Importing React and the useState hook.
import exerciseData from "@/public/exerciseData.json"; // Importing exercise data from a JSON file.
import { createClient } from "@/utils/supabase/client"; // Importing a function to create a Supabase client.
import { Button } from "@/components/ui/button"; // Importing a Button component.
import { Plus } from "lucide-react"; // Importing a Plus icon from the lucide-react library.
import Link from "next/link"; // Importing the Link component for client-side navigation.
import { Input } from "@/components/ui/input"; // Importing an Input component.
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Importing Select components for creating dropdowns.

const WorkoutTracker = () => {
  const [showAddDropdown, setShowAddDropdown] = useState(false); // State to toggle the visibility of the add exercise dropdown.
  const [workoutLog, setWorkoutLog] = useState([]); // State to store the workout log data.
  const [excerciseName, setExcerciseName] = useState({ name: "" }); // State to store the name of the exercise.
  const [selectedExercise] = useState(""); // State to store the selected exercise.
  const supabase = createClient(); // Creating a Supabase client instance.

  const submitData = async () => {
    const { data, error } = await supabase.auth.getUser(); // Retrieving the current authenticated user.
    if (data) {
      console.log(data); // Logging user data.
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .insert({ users_id: data.user.id, workout_name: excerciseName.name })
        .select("*"); // Inserting workout data into the "workouts" table.

      if (workoutData) {
        console.log(workoutData); // Logging inserted workout data.
        const { data: excerciseData, error: excerciseError } = await supabase
          .from("excercises")
          .insert(
            workoutLog.map((excercise) => ({
              workouts_id: workoutData[0].id,
              name: excercise.exerciseName,
            }))
          )
          .select("*"); // Inserting exercises into the "excercises" table.

        if (excerciseData) {
          console.log(excerciseData); // Logging inserted exercise data.
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
            .select("*"); // Inserting sets into the "sets" table.

          if (setsData) {
            console.log(setsData); // Logging inserted sets data.
          }

          if (setsError) {
            console.log(setsError); // Logging sets insertion error.
          }
        }

        if (excerciseError) {
          console.log(excerciseError); // Logging exercise insertion error.
        }
      }

      if (workoutError) {
        console.log(workoutError); // Logging workout insertion error.
      }
    }

    if (error) {
      console.log(error); // Logging user retrieval error.
    }
  };

  function addExercise(event) {
    const { value } = event.target; // Destructuring value from the event target.
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
      ]); // Adding a new exercise to the workout log.
      setShowAddDropdown(false); // Hiding the add exercise dropdown.
    }
  }

  function handleChange(event, workoutId, setIndex) {
    const { name, value } = event.target; // Destructuring name and value from the event target.

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
    ); // Updating the weight or reps for a specific set.
  }

  function handleAddSet(workoutId) {
    console.log(workoutId); // Logging the workout ID.
    setWorkoutLog((prevWorkoutLog) =>
      prevWorkoutLog.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              sets: [...workout.sets, { weight: null, reps: null }],
            }
          : workout
      )
    ); // Adding a new set to a specific exercise.
  }

  const handleNameChange = (event) => {
    const { name, value } = event.target; // Destructuring name and value from the event target.
    setExcerciseName(() => ({
      [name]: value,
    })); // Updating the exercise name.
    console.log(excerciseName); // Logging the exercise name.
  };

  return (
    <div className="flex justify-center">
      <div className="">
        <div className="flex justify-between">
          <form className="pb-4">
            <Input
              type="text"
              placeholder="Workout Name"
              name="name"
              value={excerciseName.name}
              onChange={handleNameChange}
            />{" "}
            {/* Input field for entering the workout name */}
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
                </Button>{" "}
                {/* Button to submit the workout data */}
              </Link>
            </div>
          )}
        </div>
        {workoutLog.length > 0 &&
          workoutLog.flatMap((workout, index) => (
            <div className="flex justify-center flex-col">
              <div key={index} className="py-5">
                <p className="text-lg font-bold">{workout.exerciseName}</p>{" "}
                {/* Displaying the exercise name */}
                {workout.sets.map((set, setIndex) => (
                  <>
                    <p key={setIndex} className="py-4">
                      Set {setIndex + 1}
                    </p>{" "}
                    {/* Displaying set number */}
                    <div className=" ">
                      <form className=" flex lg:space-x-4 sm:space-x-0">
                        <Input
                          type="number"
                          placeholder="weight (in kg)"
                          onChange={(event) =>
                            handleChange(event, workout.id, setIndex)
                          }
                          name="weight"
                          value={set.weight}
                          className="border px-2 py-2"
                          required
                        />{" "}
                        {/* Input for weight */}
                        <Input
                          placeholder="reps"
                          type="number"
                          min="1"
                          max="1000"
                          name="reps"
                          className="border px-2 py-2"
                          onChange={(event) =>
                            handleChange(event, workout.id, setIndex)
                          }
                          value={set.reps}
                          required
                        />{" "}
                        {/* Input for reps */}
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
                  </Button>{" "}
                  {/* Button to add another set */}
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
              <option value="default">Choose An Exercise</option>
              {exerciseData.map((item) => (
                <option key={item.id} value={item.exercise}>
                  {item.exercise}
                </option>
              ))}
            </select>{" "}
            {/* Dropdown to select an exercise */}
          </>
        ) : (
          <div className="flex justify-center ">
            <Button
              className="w-32 bg-blue-200"
              onClick={() => setShowAddDropdown(true)}
            >
              Add Exercise
            </Button>{" "}
            {/* Button to show the add exercise dropdown */}
          </div>
        )}
        <div className="flex justify-center my-4">
          <Button variant="destructive" className="w-32" asChild>
            <Link href="/workouts">Cancel Workout</Link>
          </Button>{" "}
          {/* Button to cancel the workout */}
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker; // Exporting the WorkoutTracker component as the default export.
