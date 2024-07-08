import React from "react";
import WorkoutTracker from "./WorkoutTracker";
import WorkoutTracker2 from "./WorkoutTracker2";
import NewWorkout from "./NewWorkout";

export default function Home() {
  return (
    <div className="flex justify-center">
      {/* <WorkoutTracker /> */}
      {/* <WorkoutTracker2 /> */}
      <NewWorkout />
    </div>
  );
}
