import React from "react";
import NewWorkout from "./NewWorkout";
import WorkoutHistory from "./WorkoutHistory";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center">
      <NewWorkout />
      <WorkoutHistory />
    </div>
  );
}
