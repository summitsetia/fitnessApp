"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
// hooks are being imported from react and functions are being imported from supabase

const NutritionStats = () => {
  const supabase = createClient();
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  const [bmi, setBmi] = useState(0);
  const [dailyProtein, setDailyProtein] = useState(0);
  const [dailyCarbs, setDailyCarbs] = useState(0);
  const [dailyFat, setDailyFat] = useState(0);
  // variables and states are being defined

  useEffect(() => {
    // fetching the data from the food_log table, data is filtered to match today's date and is accumulated
    const fetchData = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userData) {
        const { data: userNutrition, error: nutritionError } = await supabase
          .from("user_nutrition")
          .select("*")
          .eq("id", userData.user.id)
          .single();

        if (userNutrition) {
          setBmi(userNutrition.calories);
          setDailyProtein(userNutrition.protein);
          setDailyCarbs(userNutrition.carbs);
          setDailyFat(userNutrition.total_fat);
        }

        if (nutritionError) {
          console.log(nutritionError);
        }

        const { data, error } = await supabase
          .from("food_log")
          .select()
          .eq("users_id", userData.user.id);

        if (error) {
          console.log(error);
        }

        if (data) {
          const currentDate = new Date().toDateString();
          const filteredNutritionData = data.filter(
            (entry) => new Date(entry.created_at).toDateString() === currentDate
          );

          const calorieTotal = filteredNutritionData.reduce(
            (accumulator, element) => accumulator + element.calories,
            0
          );
          setTotalCalories(calorieTotal.toFixed(2));

          const proteinTotal = filteredNutritionData.reduce(
            (accumulator, element) => accumulator + element.protein,
            0
          );
          setTotalProtein(proteinTotal.toFixed(2));

          const carbsTotal = filteredNutritionData.reduce(
            (accumulator, element) => accumulator + element.carbs,
            0
          );
          setTotalCarbs(carbsTotal.toFixed(2));

          const fatTotal = filteredNutritionData.reduce(
            (accumulator, element) => accumulator + element.total_fat,
            0
          );
          setTotalFat(fatTotal.toFixed(2));
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mx-12">
      <div className="mb-4">
        <h1 className="font-bold text-3xl">Today's Stats</h1>
      </div>
      <div className="flex space-x-12">
        <div className="text-center">
          <h2>Calories Eaten</h2>
          <h1>
            {totalCalories} / {bmi} kcal
          </h1>
          <Progress value={(totalCalories / bmi) * 100} className="" />
        </div>
        <div className="text-center">
          <h2>Protein</h2>
          <h1>
            {totalProtein} / {dailyProtein} g
          </h1>
          <Progress value={(totalProtein / dailyProtein) * 100} className="" />
        </div>
        <div className="text-center">
          <h2>Carbohydrates</h2>
          <h1>
            {totalCarbs} / {dailyCarbs} g
          </h1>
          <Progress value={(totalCarbs / dailyCarbs) * 100} className="" />
        </div>
        <div className="text-center">
          <h2>Total Fat</h2>
          <h1>
            {totalFat} / {dailyFat} g
          </h1>
          <Progress value={(totalFat / dailyFat) * 100} className="" />
        </div>
      </div>
    </div>
  );
};

export default NutritionStats;
