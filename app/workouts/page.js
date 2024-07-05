import React from "react";
import Navbar from '../components/Navbar';
import WorkoutTracker from './WorkoutTracker'
import WorkoutTracker2 from "./WorkoutTracker2";
import NewWorkout from "./NewWorkout"

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                {/* <WorkoutTracker /> */}
                {/* <WorkoutTracker2 /> */}
                <NewWorkout />

            </div>
        </div>
    )
}