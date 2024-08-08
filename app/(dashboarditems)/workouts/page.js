import React from "react";
import NewWorkout from "./NewWorkout";
import WorkoutHistory from "./WorkoutHistory";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center mt-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Start Workout</h1>
      </div>
      <NewWorkout />
      <div className="pt-16">
        <WorkoutHistory />
      </div>
    </div>
  );
}
