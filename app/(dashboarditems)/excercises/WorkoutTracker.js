"use client";
import React, { useState } from "react";
import exerciseData from "./exerciseData";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const WorkoutTracker = () => {
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [excerciseName, setExcerciseName] = useState({ name: "" });
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

  async function addExercise(event) {
    const { value } = event.target;
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
              placeholder="Excercise Name"
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

// return (
//   <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
//     <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Workout Tracker</h1>

//     {workoutLog.length > 0 &&
//       workoutLog.map((workout, index) => (
//         <div key={index} className="mb-8 bg-white p-6 rounded-md shadow-sm">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">Exercise: {workout.exerciseName}</h2>
//           {workout.sets.map((set, setIndex) => (
//             <div key={setIndex} className="mb-4">
//               <p className="font-medium text-gray-600 mb-2">Set {setIndex + 1}</p>
//               <form className="flex space-x-4">
//                 <input
//                   type="number"
//                   placeholder="Weight (kg)"
//                   onChange={(event) => handleChange(event, workout.id, setIndex)}
//                   name="weight"
//                   value={set.weight}
//                   className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Reps"
//                   onChange={(event) => handleChange(event, workout.id, setIndex)}
//                   name="reps"
//                   value={set.reps}
//                   className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </form>
//             </div>
//           ))}
//           <Button
//             onClick={() => handleAddSet(workout.id)}
//             className="mt-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
//           >
//             Add Set
//           </Button>
//         </div>
//       ))}

//     {showAddDropdown ? (
//       <div className="mb-6">
//         <label htmlFor="exercise" className="block mb-2 font-medium text-gray-700">Choose an exercise: </label>
//         <select
//           name="exercise"
//           id="exercise"
//           form="exerciseform"
//           onChange={addExercise}
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {exerciseData.map((item) => (
//             <option key={item.id} value={item.excercise}>
//               {item.excercise}
//             </option>
//           ))}
//         </select>
//       </div>
//     ) : (
//       <Button
//         onClick={() => setShowAddDropdown(true)}
//         className="w-full mb-6 bg-green-500 text-white hover:bg-green-600 transition duration-300"
//       >
//         Add Exercise
//       </Button>
//     )}

//     {workoutLog.length > 0 && (
//       <div className="flex justify-between">
//         <Link href="/workouts" className="flex-1 mr-2">
//           <Button
//             variant="ghost"
//             onClick={submitData}
//             className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
//           >
//             Finish Workout
//           </Button>
//         </Link>
//         <Button
//           variant="ghost"
//           className="flex-1 ml-2 bg-red-500 text-white hover:bg-red-600 transition duration-300"
//         >
//           Cancel Workout
//         </Button>
//       </div>
//     )}
//   </div>
// );
// };

// export default WorkoutTracker;
