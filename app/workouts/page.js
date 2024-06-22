import React from "react";
import Navigation from '../components/Navigation';
import WorkoutTracker from './WorkoutTracker'

export default function Home () {
    return (
        <div>
            <Navigation />
            <div className="flex justify-center">
                <WorkoutTracker />
            </div>
        </div>
    )
}