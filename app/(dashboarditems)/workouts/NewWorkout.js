"use client";
import React, { useState, useEffect } from "react";
import WorkoutTracker2 from "./WorkoutTracker2";
import { createClient } from "@/utils/supabase/client";

const NewWorkout = () => {
  const [workoutIds, setWorkoutIds] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("workouts").select();

      if (error) {
        console.log(error);
      }

      if (data) {
        console.log(data);
      }
    };

    fetchData();
  }, []);

  const createNewWorkout = async () => {
    setWorkoutIds((prevData) => [...prevData, { id: workoutIds.length + 1 }]);
    console.log(workoutIds);

    const { data, error } = await supabase.from("workouts").insert({});

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  };
  return (
    <div>
      <button onClick={createNewWorkout}>Add New Workout</button>
      {workoutIds.map((workout) => (
        <WorkoutTracker2 id={workout.id} />
      ))}
    </div>
  );
};

export default NewWorkout;
