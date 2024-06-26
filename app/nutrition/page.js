import React from 'react';
import Navigation from '../components/Navigation';
import NutritionTracker from './NutritionTracker';

export default function Home () {
    return (
        <div>
            <Navigation />
            <div className='flex justify-center'>
                <NutritionTracker />
            </div>
        </div>
    )
}