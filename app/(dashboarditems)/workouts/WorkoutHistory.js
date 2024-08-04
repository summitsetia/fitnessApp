"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const WorkoutHistory = () => {
  const supabase = createClient();
  const [workoutData, setWorkoutData] = useState([]);
  const [excerciseData, setExcerciseData] = useState([]);
  const [setData, setSetData] = useState([]);
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("workouts").select("*");

      if (data) {
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
    {
      showHistory?
        <div>
        < div className = "flex justify-center pb-4" >
    <h1 className="text-3xl font-bold">History</h1>
        </div >
  <div className="flex flex-col space-y-8">
    {workoutData.map((workout) => (
      <HistoryElement
        key={workout.id}
        workoutDate={new Date(workout.created_at).toLocaleDateString()}
        excerciseData={excerciseData}
        workoutId={workout.id}
        workoutName={workout.workout_name}
        setData={setData}
      />
    ))}
  </div>
      </div >
  ): (<h1>Show History</h1>) }
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
    <div >
      <div className="w-96 h-full border rounded-md ">
        <div className="mx-4 my-4">
          <div >
            <div className="pb-2">
              <h1 className="font-bold">{workoutName} </h1>
            </div>
            <div className="pb-4">
              <h2 className="">{workoutDate}</h2>
            </div>
          </div>
          <div className="flex space-x-4">
            <div>
              <h1 className="pb-2 font-bold ">Exercise</h1>
              {excerciseData
                .filter((entry) => entry.workouts_id === workoutId)
                .map((entry) => (
                  <h1 key={entry.id}>{entry.name}</h1>
                ))}
            </div>
            <div>
              <h1 className="pb-2 font-bold"> Best Set</h1>
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
    </div>
  );
};
