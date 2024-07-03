import React from 'react';
import Navbar from '../components/Navbar';
import NutritionTracker from './NutritionTracker';

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className='flex justify-center'>
                <NutritionTracker />
            </div>
        </div>
    )
}