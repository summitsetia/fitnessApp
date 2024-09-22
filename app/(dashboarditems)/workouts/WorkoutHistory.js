import { Button } from "@/components/ui/button";
import Link from "next/link"; // Importing necessary components and libraries

"use client"; // Indicates that this component should run on the client-side
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client"; // Importing a custom Supabase client
import { useEffect, useState } from "react"; // Importing React hooks

const WorkoutHistory = () => {
  const supabase = createClient(); // Initializing the Supabase client
  const [workoutData, setWorkoutData] = useState([]); // State to store workout data
  const [excerciseData, setExcerciseData] = useState([]); // State to store exercise data
  const [setData, setSetData] = useState([]); // State to store set data
  const [showHistory, setShowHistory] = useState(false); // State to control visibility of history

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
<<<<<<< HEAD
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userData) {
        console.log(userData);
        const { data: workoutData, error: workoutError } = await supabase
          .from("workouts")
          .select("*")
          .eq("users_id", userData.user.id);

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
=======
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .select("*"); // Fetching all workout data from the 'workouts' table

      if (workoutError) {
        console.log(workoutError); // Log any errors if fetching workout data fails
        return;
      }

      if (workoutData) {
        setWorkoutData(workoutData); // Update state with fetched workout data

        const { data: excerciseData, error: excerciseError } = await supabase
          .from("excercises")
          .select("*"); // Fetching all exercise data from the 'excercises' table

        if (excerciseError) {
          console.log(excerciseError); // Log any errors if fetching exercise data fails
          return;
        }

        setExcerciseData(excerciseData); // Update state with fetched exercise data

        const { data: setData, error: setError } = await supabase
          .from("sets")
          .select("*"); // Fetching all set data from the 'sets' table

        if (setError) {
          console.log(setError); // Log any errors if fetching set data fails
          return;
        }

        setSetData(setData); // Update state with fetched set data
>>>>>>> a28624d871e5d88a65ba76d1e3af2de1f128990e
      }
    };

    fetchData(); // Call the fetchData function to start fetching data
  }, []);

  return (
    <div>
      <div className="flex justify-center pb-4">
        {/* Button to toggle the visibility of the workout history */}
        <Button onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "Hide History" : "Show History"}
        </Button>
      </div>
      {showHistory && ( // Conditionally render the history if showHistory is true
        <div>
          <div className="flex justify-center pb-4">
            <h1 className="text-3xl font-bold">History</h1>
          </div>
          <div className="flex flex-col-reverse pl-48 ">
            {/* Map over workoutData and render each workout's history */}
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
            {/* Filter and map over exercise data to display exercises for the current workout */}
            {excerciseData
              .filter((entry) => entry.workouts_id === workoutId)
              .map((entry) => (
                <h1 key={entry.id}>{entry.name}</h1>
              ))}
          </div>
          <div>
            <h1 className="pb-2 font-bold">Best Set</h1>
            {/* Filter exercise data and find the best set for each exercise */}
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
                  ); // Determine the set with the highest weight

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

export default WorkoutHistory; // Exporting the component as default
