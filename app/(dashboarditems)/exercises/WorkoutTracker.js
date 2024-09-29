"use client"; // This indicates that this component should be rendered on the client-side

// importing hooks from react, exerciseData from json file and components from supabase, shadCN and lucide react
import React, { useState } from "react";
import { useRouter } from "next/router";
import exerciseData from "@/public/exerciseData.json";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

const WorkoutTracker = () => {
  // defining the variables and setting states
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [excerciseName, setExcerciseName] = useState({ name: "" });
  const supabase = createClient();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const submitData = async (e) => {
    // on submit of the button workout data for the workout, exercise, sets, weights and reps are submitted to their respective tables in supabase by iterating over the array of objects
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

  function addExercise(e) {
    if (e !== "default") {
      setWorkoutLog([
        ...workoutLog,
        {
          id: workoutLog.length + 1,
          exerciseName: e,
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
    // on change of the value of an input this function runs to update the value in the array of objects
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
    // when add set is pressed, a new object is created in sets, representing another set
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
    // when the value of the input for the workout name changes, this function runs which updates its value in the object
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
            />{" "}
            {/* Input field for entering the workout name */}
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
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
            <Select onValueChange={addExercise}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an exercise:" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {exerciseData.map((item) => (
                    <SelectItem key={item.id} value={item.exercise}>
                      {item.exercise}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <div className="flex justify-center">
              <Button
                className="w-32 bg-blue-200"
                onClick={() => setShowAddDropdown(true)}
              >
                Add Exercise
              </Button>
            </div>
          )}
        </div>

        {workoutLog.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              className="bg-green-400 hover:bg-green-200"
              onClick={submitData}
            >
              Finish
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default WorkoutTracker;
