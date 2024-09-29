import WorkoutTracker from "./WorkoutTracker";

// page where you enter in workout details, importing workoutTracker
export const page = () => {
  return (
    <div className="mx-8 my-8">
      <WorkoutTracker />
    </div>
  );
};

export default page;
