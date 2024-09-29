import React from "react";
import NewWorkout from "./NewWorkout";
import WorkoutHistory from "./WorkoutHistory";

// page containing the button which allows you to create a new workout and the workoutHistory component, it is importing newWorkout and WorkoutHistory
export default function Home() {
  return (
    <div className="flex flex-col items-center mt-16 space-y-16">
      <div>
        <h1 className="text-6xl font-extrabold text-center text-gray-800">
          Start Workout
        </h1>
      </div>
      <NewWorkout />
      <div className="w-full max-w-3xl">
        <WorkoutHistory />
      </div>
    </div>
  );
}
