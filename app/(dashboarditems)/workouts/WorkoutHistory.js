"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const WorkoutHistory = () => {
  const supabase = createClient();
  const [workoutData, setWorkoutData] = useState([]);
  const [excerciseData, setExcerciseData] = useState([]);
  const [setData, setSetData] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .select("*");

      if (workoutError) {
        console.log(workoutError);
        return;
      }

      if (workoutData) {
        setWorkoutData(workoutData);

        const { data: excerciseData, error: excerciseError } = await supabase
          .from("excercises")
          .select("*");

        if (excerciseError) {
          console.log(excerciseError);
          return;
        }

        setExcerciseData(excerciseData);

        const { data: setData, error: setError } = await supabase
          .from("sets")
          .select("*");

        if (setError) {
          console.log(setError);
          return;
        }

        setSetData(setData);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center pb-4">
        <Button onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? 'Hide History' : 'Show History'}
        </Button>
      </div>
      {showHistory && (
        <div>
          <div className="flex justify-center pb-4">
            <h1 className="text-3xl font-bold">History</h1>
          </div>
          <div className="flex flex-col-reverse ">
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
        </div>
      )}
    </div>
  );
};

const HistoryElement = ({
  workoutDate,
  excerciseData,
  workoutId,
  workoutName,
  setData,
}) => {
  return (
    <div className="w-96 h-full border rounded-md my-8">
      <div className="mx-4 my-4">
        <div className="pb-2">
          <h1 className="font-bold">{workoutName}</h1>
        </div>
        <div className="pb-4">
          <h2>{workoutDate}</h2>
        </div>
        <div className="flex space-x-4">
          <div>
            <h1 className="pb-2 font-bold">Exercise</h1>
            {excerciseData
              .filter((entry) => entry.workouts_id === workoutId)
              .map((entry) => (
                <h1 key={entry.id}>{entry.name}</h1>
              ))}
          </div>
          <div>
            <h1 className="pb-2 font-bold">Best Set</h1>
            {excerciseData
              .filter((excerciseEntry) => excerciseEntry.workouts_id === workoutId)
              .map((excerciseEntry) => {
                const bestSet = setData
                  .filter((setEntry) => setEntry.excercise_id === excerciseEntry.id)
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

export default WorkoutHistory;
