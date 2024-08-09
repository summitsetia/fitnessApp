"use client";
import React from "react";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";

const Dashboard = () => {
  const supabase = createClient();
  const [numberOfWorkouts, setNumberOfWorkouts] = useState(0)
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("food_log").select();

      if (error) {
        console.log(error);
        setFetchError("There is an error");
      }

      if (data) {
        console.log(data);

        const calorieTotal = data.reduce(
          (accumulator, element) => accumulator + element.calories,
          0
        );
        setTotalCalories(calorieTotal.toFixed(2));

        const proteinTotal = data.reduce(
          (accumulator, element) => accumulator + element.protein,
          0
        );
        setTotalProtein(proteinTotal.toFixed(2));

        const carbsTotal = data.reduce(
          (accumulator, element) => accumulator + element.carbs,
          0
        );
        setTotalCarbs(carbsTotal.toFixed(2));

      }

    };


    fetchData();
  }, []);


  useEffect(() => {
    const fetchWorkoutData = async () => {
      const { data: workoutData, error: workoutError } = await supabase
        .from('workouts')
        .select('*')

      if (workoutData) {
        const currentDate = new Date()
        const oneWeekAgoDate = new Date()
        oneWeekAgoDate.setDate(currentDate.getDate() - 7)
        console.log(oneWeekAgoDate)
        console.log(new Date(workoutData[0].created_at))
        console.log(currentDate)

        const filteredWorkoutsArray = workoutData.filter((workout) => new Date(workout.created_at) >= oneWeekAgoDate && new Date(workout.created_at) <= currentDate)
        setNumberOfWorkouts(filteredWorkoutsArray.length)

      }

      if (workoutError) {
        console.log(workoutError)
      }

    }
    fetchWorkoutData()
  }, [])

  return (
    <div className="py-36 ">
      <div className="pb-8">
        <h1 className="font-bold text-5xl">Dashboard</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="border-2 border-solid h-32 w-96 bg-white flex flex-col items-center rounded-md">
          <h1 className="font-bold">Calories Consumed</h1>
          <h1> {totalCalories} kcal</h1>
          <p></p>
        </div>
        <div className="border-2 border-solid h-32 w-96 bg-white flex flex-col items-center rounded-md">
          <h1 className="font-bold">Protein Consumed</h1>
          <p>{totalProtein} g</p>
        </div>
        <div className="border-2 border-solid h-32 w-96 bg-white flex flex-col items-center rounded-md">
          <h1 className="font-bold">Carbs Consumed</h1>
          <p>{totalCarbs} g</p>
        </div>
        <div className="border-2 border-solid h-48 w-96 bg-white flex flex-col items-center rounded-md">
          <h1 className="font-bold"> Workouts This Week </h1>
          <p>{numberOfWorkouts}</p>
        </div>
        <div className="border-2 border-solid h-48 w-96 bg-white flex flex-col items-center rounded-md">
          <h1 className="font-bold"></h1>
          <p></p>
        </div>
        <div className="border-2 border-solid h-48 w-96 bg-white flex justify-center flex-col items-center">
          <h1 className="font-bold"></h1>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
