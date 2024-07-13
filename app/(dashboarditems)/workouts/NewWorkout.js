// "use client";
// import React, { useState, useEffect } from "react";
// import WorkoutTracker from "./WorkoutTracker";
// import { createClient } from "@/utils/supabase/client";

// const NewWorkout = () => {
//   const [workoutIds, setWorkoutIds] = useState([]);
//   const supabase = createClient();

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase.from("workouts").select();

//       if (error) {
//         console.log(error);
//       }

//       if (data) {
//         console.log(data);
//       }
//     };

//     fetchData();
//   }, []);

//   const createNewWorkout = async () => {
//     setWorkoutIds((prevData) => [...prevData, { id: workoutIds.length + 1 }]);
//     console.log(workoutIds);

//     const { data, error } = await supabase.from("workouts").insert({});

//     if (error) {
//       console.log(error);
//     }

//     if (data) {
//       console.log(data);
//     }
//   };
//   return (
//     <div>
//       <button onClick={createNewWorkout}>Add New Workout</button>
//       {workoutIds.map((workout) => (
//         <WorkoutTracker id={workout.id} />
//       ))}
//     </div>
//   );
// };

// export default NewWorkout;

"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export const NewWorkout = () => {
  const supabase = createClient();
  const addWorkout = async () => {
    const { data, error } = await supabase.from("workouts").insert({});

    if (data) {
      console.log(data);
    }

    if (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Link href="/excercises" className="">
        <Button variant="ghost" onClick={addWorkout}>
          Create Workout
        </Button>
      </Link>
    </div>
  );
};

export default NewWorkout;
