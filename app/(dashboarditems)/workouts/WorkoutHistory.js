// "use client";
// import { createClient } from "@/utils/supabase/client";
// import { useEffect, useState } from "react";

// const WorkoutHistory = () => {
//   const supabase = createClient();
//   const [workoutData, setWorkoutData] = useState([]);
//   const [excerciseData, setExcerciseData] = useState([]);
//   const [setData, setSetData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase.from("workouts").select("*");

//       if (data) {
//         console.log("Workouts Data:", data);
//         setWorkoutData(data);
//         const { data: excerciseData, error: excerciseError } = await supabase
//           .from("excercises")
//           .select("*");

//         if (excerciseData) {
//           console.log(excerciseData);
//           setExcerciseData(excerciseData);

//           const { data: setData, error: setError } = await supabase
//             .from("sets")
//             .select("*");

//           if (setData) {
//             console.log(setData);
//             setSetData(setData);
//           }

//           if (setError) {
//             console.log(setError);
//           }
//         }

//         if (excerciseError) {
//           console.log(excerciseError);
//         }
//       }

//       if (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);
//   return (
//     <div>
//       <h1>History</h1>
//       <div>
//         {workoutData.map((workout) => (
//           <HistoryElement
//             workoutDate={workout.created_at}
//             excerciseData={excerciseData}
//             workoutId={workout.id}
//             workoutName={workout.workout_name}
//             setData={setData}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WorkoutHistory;

// const HistoryElement = ({
//   workoutDate,
//   excerciseData,
//   workoutId,
//   workoutName,
//   setData,
// }) => {
//   return (
//     <div>
//       <div className="w-96 h-full border rounded-md">
//         <div>
//           <div>
//             <h1>Workout Name: {workoutName} </h1>
//           </div>
//           <div>
//             <h2>Workout Date: {workoutDate}</h2>
//           </div>
//         </div>
//         <div className="flex space-x-4">
//           <div>
//             <h1>Excercise</h1>
//             {excerciseData
//               .filter((entry) => entry.workouts_id === workoutId)
//               .map((entry) => (
//                 <h1>{entry.name}</h1>
//               ))}
//           </div>
//           <div>
//             <h1>Best Set</h1>
//             {excerciseData
//               .filter(
//                 (excerciseEntry) => excerciseEntry.workouts_id === workoutId
//               )
//               .map((excerciseEntry) =>
//                 setData
//                   .filter(
//                     (setEntry) => setEntry.excercise_id === excerciseEntry.id
//                   )
//                   .map((setEntry) => (
//                     <div className="flex space-x-4">
//                       <h1>{setEntry.weight} kg</h1>
//                       <h1>{setEntry.reps}</h1>
//                     </div>
//                   ))
//               )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const WorkoutHistory = () => {
  const supabase = createClient();
  const [workoutData, setWorkoutData] = useState([]);
  const [excerciseData, setExcerciseData] = useState([]);
  const [setData, setSetData] = useState([]);
  const formattedDate = new Date(workoutData.created_at).toDateString();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("workouts").select("*");

      if (data) {
        console.log("Workouts Data:", data);
        setWorkoutData(data);
        const { data: excerciseData, error: excerciseError } = await supabase
          .from("excercises")
          .select("*");

        if (excerciseData) {
          console.log(excerciseData);
          setExcerciseData(excerciseData);

          const { data: setData, error: setError } = await supabase
            .from("sets")
            .select("*");

          if (setData) {
            console.log(setData);
            setSetData(setData);
          }

          if (setError) {
            console.log(setError);
          }
        }

        if (excerciseError) {
          console.log(excerciseError);
        }
      }

      if (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center pb-4">
        <h1>History</h1>
      </div>
      <div className="flex space-x-8">
        {workoutData.map((workout) => (
          <HistoryElement
            key={workout.id}
            workoutDate={formattedDate}
            excerciseData={excerciseData}
            workoutId={workout.id}
            workoutName={workout.workout_name}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutHistory;

const HistoryElement = ({
  workoutDate,
  excerciseData,
  workoutId,
  workoutName,
  setData,
}) => {
  return (
    <div>
      <div className="w-96 h-full border rounded-md">
        <div>
          <div>
            <h1>Workout Name: {workoutName} </h1>
          </div>
          <div>
            <h2>Workout Date: {workoutDate}</h2>
          </div>
        </div>
        <div className="flex space-x-4">
          <div>
            <h1>Exercise</h1>
            {excerciseData
              .filter((entry) => entry.workouts_id === workoutId)
              .map((entry) => (
                <h1 key={entry.id}>{entry.name}</h1>
              ))}
          </div>
          <div>
            <h1>Best Set</h1>
            {excerciseData
              .filter(
                (excerciseEntry) => excerciseEntry.workouts_id === workoutId
              )
              .map((excerciseEntry) => {
                const bestSet = setData
                  .filter(
                    (setEntry) => setEntry.excercise_id === excerciseEntry.id
                  )
                  .reduce(
                    (best, current) =>
                      current.weight > best.weight ? current : best,
                    { weight: 0 }
                  );

                return (
                  <div key={excerciseEntry.id} className="flex space-x-4">
                    <h1>{bestSet.weight} kg</h1>
                    <h1>{bestSet.reps}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};