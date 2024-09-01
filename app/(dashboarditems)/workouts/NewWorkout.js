import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NewWorkout = () => {
  return (
    <div className="flex justify-center">
      <Link href="/exercises">
        <Button
          variant="ghost"
          className="bg-blue-500 text-white w-full max-w-lg h-14 text-xl rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          Start An Empty Workout
        </Button>
      </Link>
    </div>
  );
};

export default NewWorkout;
