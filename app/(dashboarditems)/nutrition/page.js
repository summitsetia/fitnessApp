import React from "react";
import NutritionTracker from "./NutritionTracker";
import NutritionStats from "./NutritionStats";

export default function Home() {
  return (
    <div className="flex justify-center items-center mt-8 ">
      <div className="space-x-4">
        <NutritionStats />
        <NutritionTracker />
      </div>
    </div>
  );
}
