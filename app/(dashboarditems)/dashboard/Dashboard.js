"use client";
import React from "react";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";

const Dashboard = () => {
  const supabase = createClient();
  const [fetchError, setFetchError] = useState(null);
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
        setFetchError(null);

        const calorieTotal = data.reduce(
          (accumulator, element) => accumulator + element.calories,
          0
        );
        setTotalCalories(calorieTotal);

        const proteinTotal = data.reduce(
          (accumulator, element) => accumulator + element.protein,
          0
        );
        setTotalProtein(proteinTotal);

        const carbsTotal = data.reduce(
          (accumulator, element) => accumulator + element.carbs,
          0
        );
        setTotalCarbs(carbsTotal);
      }
    };

    fetchData();
  }, []);

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
          <h1 className="font-bold"> Workouts Per Week </h1>
          <p>{fetchError}</p>
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
