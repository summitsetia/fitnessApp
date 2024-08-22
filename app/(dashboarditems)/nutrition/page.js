import React from "react";
import NutritionStats from "./NutritionStats";
import AddMeal from "./AddMeal"

export default function Home() {
  return (
    <div className="flex justify-center items-center mt-8 ">
      <div className="">
        <div>
          <NutritionStats />
        </div>
        <div className="pt-12">
          <AddMeal />
        </div>
      </div>
    </div>
  );
}
