'use client' // Indicates that this component is a client-side component in a Next.js application

import { createClient } from "@/utils/supabase/client"; // Imports the Supabase client creation function
import { useState, useEffect } from "react"; // Imports React hooks for state management and side effects
import { Progress } from "@/components/ui/progress"; // Imports the Progress component from the UI library

const NutritionStats = () => {
    const supabase = createClient(); // Creates an instance of the Supabase client
    const [totalCalories, setTotalCalories] = useState(0); // State variable to store total calories
    const [totalProtein, setTotalProtein] = useState(0); // State variable to store total protein
    const [totalCarbs, setTotalCarbs] = useState(0); // State variable to store total carbohydrates
    const [totalFat, setTotalFat] = useState(0); // State variable to store total fat

    useEffect(() => {
        const fetchData = async () => {
            // Function to fetch data from the Supabase table "food_log"
            const { data, error } = await supabase.from("food_log").select();

            if (error) {
                // Logs any errors encountered during data fetching
                console.log(error);
            }

            if (data) {
                const currentDate = new Date().toDateString();
                // Gets the current date in a readable string format

                const filteredNutritionData = data.filter((entry) => new Date(entry.created_at).toDateString() === currentDate);
                // Filters data entries to only include those from the current date

                console.log(filteredNutritionData); // Logs the filtered data
                console.log(currentDate); // Logs the current date
                console.log(data.map((entry) => new Date(entry.created_at).toDateString()));
                // Logs an array of dates from all data entries

                // Calculates the total calories from the filtered data and sets the state
                const calorieTotal = filteredNutritionData.reduce(
                    (accumulator, element) => accumulator + element.calories,
                    0
                );
                setTotalCalories(calorieTotal.toFixed(2)); // Updates the totalCalories state with the calculated total

                // Calculates the total protein from the filtered data and sets the state
                const proteinTotal = filteredNutritionData.reduce(
                    (accumulator, element) => accumulator + element.protein,
                    0
                );
                setTotalProtein(proteinTotal.toFixed(2)); // Updates the totalProtein state with the calculated total

                // Calculates the total carbohydrates from the filtered data and sets the state
                const carbsTotal = filteredNutritionData.reduce(
                    (accumulator, element) => accumulator + element.carbs,
                    0
                );
                setTotalCarbs(carbsTotal.toFixed(2)); // Updates the totalCarbs state with the calculated total

                // Calculates the total fat from the filtered data and sets the state
                const fatTotal = filteredNutritionData.reduce(
                    (accumulator, element) => accumulator + element.total_fat,
                    0
                );
                setTotalFat(fatTotal.toFixed(2)); // Updates the totalFat state with the calculated total
            }
        };

        fetchData(); // Invokes the fetchData function when the component mounts
    }, []); // The empty dependency array ensures the useEffect runs only once

    return (
        <div className="flex flex-col items-center mx-12">
            <div className="mb-4">
                <h1 className="font-bold text-3xl">Today's Stats</h1>
                {/* Displays the title */}
            </div>
            <div className="flex space-x-12">
                {/* Section for displaying calorie intake */}
                <div className="text-center">
                    <h2 className="font-bold text-lg">Calories Eaten</h2>
                    <h1>{totalCalories} / 2500 kcal</h1>
                    <Progress value={totalCalories / 2500 * 100} className="" />
                </div>

                {/* Section for displaying protein intake */}
                <div className="text-center">
                    <h2 className="font-bold text-lg">Protein</h2>
                    <h1>{totalProtein} / 125 g</h1>
                    <Progress value={totalProtein / 125 * 100} className="" />
                </div>

                {/* Section for displaying carbohydrate intake */}
                <div className="text-center">
                    <h2 className="font-bold text-lg">Carbohydrates</h2>
                    <h1>{totalCarbs} / 300 g</h1>
                    <Progress value={totalCarbs / 300 * 100} className="" />
                </div>

                {/* Section for displaying fat intake */}
                <div className="text-center">
                    <h2 className="font-bold text-lg">Total Fat</h2>
                    <h1>{totalFat} / 60 g</h1>
                    <Progress value={totalFat / 60 * 100} className="" />
                </div>
            </div>
        </div>
    )
}

export default NutritionStats; // Exports the NutritionStats component as the default export
