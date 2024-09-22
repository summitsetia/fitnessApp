"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { UtensilsCrossed } from "lucide-react";
import { Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const AddMeal = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-3xl font-bold">Add Meals</h1>
        <MealRedirect mealType="Breakfast" reccCalories="563-788" />
        <MealRedirect mealType="Lunch" reccCalories="675-900" />
        <MealRedirect mealType="Dinner" reccCalories="877-1148" />
      </div>
    </div>
  );
};

// Define the MealRedirect component
const MealRedirect = ({ mealType, reccCalories }) => {
  const supabase = createClient();
  const [mealInfo, setMealInfo] = useState(false);
  const [mealData, setMealData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("food_log").select("*");

      if (data) {
        console.log(data);
        const currentDate = new Date().toDateString();
        const filteredNutritionData = data.filter(
          (entry) =>
            new Date(entry.created_at).toDateString() === currentDate &&
            entry.meal_type === mealType
        );

        setMealData(filteredNutritionData);
        console.log(filteredNutritionData);
      }

      if (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const addedData = mealData.reduce(
    (accumulator, entry) => accumulator + entry.calories,
    0
  );
  return (
    <div className="pt-8">
      <div className="flex space-x-8">
        <div>
          <Link href={`/meals?meal=${mealType}`}>
            <Button className="text-base w-48">
              <UtensilsCrossed className="mr-2 h-6 w-6" />
              {mealType}
              <CirclePlus className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
        <div>
          <Button onClick={() => setMealInfo((prevValue) => !prevValue)}>
            <Info></Info>
          </Button>
        </div>
      </div>
      <div className="">
        {mealInfo ? (
          <p>{addedData.toFixed(2)} Calories Eaten</p>
        ) : (
          <h1> Recommended Calories: {reccCalories} </h1>
        )}
      </div>
    </div>
  );
};

export default AddMeal;
