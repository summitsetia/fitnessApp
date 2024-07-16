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

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NewWorkout = () => {
  return (
    <div>
      <Link href="/excercises" className="">
        <Button variant="ghost" >
          Create Workout
        </Button>
      </Link>
    </div>
  );
};

export default NewWorkout;
