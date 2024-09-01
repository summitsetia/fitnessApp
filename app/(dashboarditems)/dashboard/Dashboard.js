"use client"; // This directive indicates that this component should be rendered on the client-side in a Next.js application.

import React from "react"; // Imports React, which is necessary for creating React components.
import { useEffect, useState } from "react"; // Imports hooks from React: useEffect for side effects and useState for managing state.
import { createClient } from "../../../utils/supabase/client"; // Imports the function to create a Supabase client from a custom utility file.

const Dashboard = () => {
  const supabase = createClient(); // Initializes the Supabase client for interacting with the database.
  const [numberOfWorkouts, setNumberOfWorkouts] = useState(0); // State to hold the number of workouts in the past week.
  const [totalCalories, setTotalCalories] = useState(0); // State to hold the total calories consumed.
  const [totalProtein, setTotalProtein] = useState(0); // State to hold the total protein consumed.
  const [totalCarbs, setTotalCarbs] = useState(0); // State to hold the total carbs consumed.

  useEffect(() => {
    // Effect hook to fetch data from the "food_log" table when the component mounts.
    const fetchData = async () => {
      const { data, error } = await supabase.from("food_log").select(); // Fetches all records from the "food_log" table.

      if (error) {
        console.log(error); // Logs any errors to the console.
        setFetchError("There is an error"); // Sets an error message in case of a fetch error (although setFetchError is not defined in this snippet).
      }

      if (data) {
        console.log(data); // Logs the fetched data to the console.
        const todaysDate = new Date().toDateString(); // Gets today's date in string format.
        const filteredNutritionArray = data.filter(
          (entry) => new Date(entry.created_at).toDateString() === todaysDate
        ); // Filters the entries to include only those created today.
        console.log(filteredNutritionArray); // Logs the filtered array to the console.

        const calorieTotal = filteredNutritionArray.reduce(
          (accumulator, element) => accumulator + element.calories,
          0
        ); // Calculates the total calories consumed today.
        setTotalCalories(calorieTotal.toFixed(2)); // Updates the totalCalories state with the calculated value.

        const proteinTotal = filteredNutritionArray.reduce(
          (accumulator, element) => accumulator + element.protein,
          0
        ); // Calculates the total protein consumed today.
        setTotalProtein(proteinTotal.toFixed(2)); // Updates the totalProtein state with the calculated value.

        const carbsTotal = filteredNutritionArray.reduce(
          (accumulator, element) => accumulator + element.carbs,
          0
        ); // Calculates the total carbs consumed today.
        setTotalCarbs(carbsTotal.toFixed(2)); // Updates the totalCarbs state with the calculated value.
      }
    };

    fetchData(); // Calls the fetchData function to initiate data fetching.
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts.

  useEffect(() => {
    // Effect hook to fetch workout data from the "workouts" table when the component mounts.
    const fetchWorkoutData = async () => {
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .select("*"); // Fetches all records from the "workouts" table.

      if (workoutData) {
        const currentDate = new Date(); // Gets the current date.
        const oneWeekAgoDate = new Date(); // Initializes a date object for one week ago.
        oneWeekAgoDate.setDate(currentDate.getDate() - 7); // Sets the date to one week ago.
        console.log(oneWeekAgoDate); // Logs the date one week ago to the console.
        console.log(currentDate); // Logs the current date to the console.

        const filteredWorkoutsArray = workoutData.filter(
          (workout) =>
            new Date(workout.created_at) >= oneWeekAgoDate &&
            new Date(workout.created_at) <= currentDate
        ); // Filters workouts to include only those within the last week.
        setNumberOfWorkouts(filteredWorkoutsArray.length); // Updates the numberOfWorkouts state with the count of filtered workouts.
      }

      if (workoutError) {
        console.log(workoutError); // Logs any errors to the console.
      }
    };
    fetchWorkoutData(); // Calls the fetchWorkoutData function to initiate data fetching.
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts.

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
