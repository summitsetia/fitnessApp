
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NewWorkout = () => {
  return (
    <div className="">
      <Link href="/excercises" >
        <Button variant="ghost" className="bg-blue-400 text-white w-96 h-12 text-lg" >
          Start An Empty Workout
        </Button>
      </Link>
    </div>
  );
};

export default NewWorkout;
