import { Button } from "@/components/ui/button"; // Import the Button component from the specified path
import Link from "next/link"; // Import the Link component from Next.js for client-side navigation

// Export a functional component called NewWorkout
export const NewWorkout = () => {
  return (
    <div className="flex justify-center">
      <Link href="/exercises">
        {" "}
        {/* Create a link that navigates to the /exercises page */}
        <Button
          variant="ghost" // Set the variant of the Button to "ghost" (specific style defined elsewhere)
          className="bg-blue-500 text-white w-full max-w-lg h-14 text-xl rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          Start An Empty Workout
        </Button>
      </Link>
    </div>
  );
};

// Export the NewWorkout component as the default export of the module
export default NewWorkout;
