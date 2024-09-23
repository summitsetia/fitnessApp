"use client"; // This directive indicates that this component should be rendered on the client-side in a Next.js application.

import React from "react"; // Imports React, which is necessary for creating React components.
import { useEffect, useState } from "react"; // Imports hooks from React: useEffect for side effects and useState for managing state.
import { createClient } from "../../../utils/supabase/client"; // Imports the function to create a Supabase client from a custom utility file.

const Dashboard = () => {
  const supabase = createClient();
  const [numberOfWorkouts, setNumberOfWorkouts] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userData) {
        console.log(`userdata: ${userData}`);

        const { data, error } = await supabase
          .from("food_log")
          .select()
          .eq("users_id", userData.user.id);

        if (error) {
          console.log(error);
          setFetchError("There is an error");
        }

        if (data) {
          console.log(data);
          const todaysDate = new Date().toDateString();
          const filteredNutritionArray = data.filter(
            (entry) => new Date(entry.created_at).toDateString() === todaysDate
          );
          console.log(filteredNutritionArray);

          const calorieTotal = filteredNutritionArray.reduce(
            (accumulator, element) => accumulator + element.calories,
            0
          );
          setTotalCalories(calorieTotal.toFixed(2));

          const proteinTotal = filteredNutritionArray.reduce(
            (accumulator, element) => accumulator + element.protein,
            0
          );
          setTotalProtein(proteinTotal.toFixed(2));

          const carbsTotal = filteredNutritionArray.reduce(
            (accumulator, element) => accumulator + element.carbs,
            0
          );
          setTotalCarbs(carbsTotal.toFixed(2));
        }
      }
      if (userError) {
        console.log(userError);
      }

      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .select("*")
        .eq("users_id", userData.user.id);

      if (workoutData) {
        const currentDate = new Date();
        const oneWeekAgoDate = new Date();
        oneWeekAgoDate.setDate(currentDate.getDate() - 7);
        console.log(oneWeekAgoDate);
        console.log(currentDate);

        const filteredWorkoutsArray = workoutData.filter(
          (workout) =>
            new Date(workout.created_at) >= oneWeekAgoDate &&
            new Date(workout.created_at) <= currentDate
        );
        setNumberOfWorkouts(filteredWorkoutsArray.length);
      }

      if (workoutError) {
        console.log(workoutError);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchWorkoutData = async () => {
  //     const { data: workoutData, error: workoutError } = await supabase
  //       .from("workouts")
  //       .select("*")
  //       .eq("user_id", userData.user.id);

  //     if (workoutData) {
  //       const currentDate = new Date();
  //       const oneWeekAgoDate = new Date();
  //       oneWeekAgoDate.setDate(currentDate.getDate() - 7);
  //       console.log(oneWeekAgoDate);
  //       console.log(new Date(workoutData[0].created_at));
  //       console.log(currentDate);

  //       const filteredWorkoutsArray = workoutData.filter(
  //         (workout) =>
  //           new Date(workout.created_at) >= oneWeekAgoDate &&
  //           new Date(workout.created_at) <= currentDate
  //       );
  //       setNumberOfWorkouts(filteredWorkoutsArray.length);
  //     }

  //     if (workoutError) {
  //       console.log(workoutError);
  //     }
  //   };
  //   fetchWorkoutData();
  // }, []);

  return (
    <div className="py-36 ">
      {/* Main container with padding applied at the top */}
      <div className="pb-8">
        {/* Container for the heading with padding applied at the bottom */}
        <h1 className="font-bold text-5xl">Dashboard</h1>
        {/* Main heading for the dashboard */}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* Grid container with 3 columns and a gap between items */}
        <div className="border-2 border-solid h-32 w-96 bg-white flex flex-col items-center rounded-md">
          {/* First grid item displaying calories consumed */}
          <h1 className="font-bold">Calories Consumed </h1>
          <h1> {totalCalories} kcal</h1>
          <p></p>
        </div>
        <div className="border-2 border-solid h-32 w-96 bg-white flex flex-col items-center rounded-md">
          {/* Second grid item displaying protein consumed */}
          <h1 className="font-bold">Protein Consumed</h1>
          <p>{totalProtein} g</p>
        </div>
        <div className="border-2 border-solid h-32 w-96 bg-white flex flex-col items-center rounded-md">
          {/* Third grid item displaying carbs consumed */}
          <h1 className="font-bold">Carbs Consumed</h1>
          <p>{totalCarbs} g</p>
        </div>
        <div className="border-2 border-solid h-48 w-96 bg-white flex flex-col items-center rounded-md">
          {/* Fourth grid item displaying the number of workouts this week */}
          <h1 className="font-bold"> Workouts This Week </h1>
          <p>{numberOfWorkouts}</p>
        </div>
        <div className="border-2 border-solid h-48 w-96 bg-white flex flex-col items-center rounded-md">
          {/* Fifth grid item (currently empty) */}
          <h1 className="font-bold"></h1>
          <p></p>
        </div>
        <div className="border-2 border-solid h-48 w-96 bg-white flex justify-center flex-col items-center">
          {/* Sixth grid item (currently empty) */}
          <h1 className="font-bold"></h1>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; // Exports the Dashboard component as the default export.
