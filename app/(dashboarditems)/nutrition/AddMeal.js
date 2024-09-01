'use client' // Marks this file as a client-side component in a Next.js project

// Import necessary components and icons
import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react";
import { UtensilsCrossed } from "lucide-react";
import { Info } from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Toggle } from "@/components/ui/toggle"

// Define the AddMeal component
const AddMeal = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-center ">
                <h1 className="text-3xl font-bold">Add Meals</h1>
                {/* Render MealRedirect components for Breakfast, Lunch, and Dinner */}
                <MealRedirect mealType="Breakfast" reccCalories="563-788" />
                <MealRedirect mealType="Lunch" reccCalories="675-900" />
                <MealRedirect mealType="Dinner" reccCalories="877-1148" />
            </div>
        </div>
    )
}

// Define the MealRedirect component
const MealRedirect = ({ mealType, reccCalories }) => {
    const supabase = createClient() // Create a Supabase client instance
    const [mealInfo, setMealInfo] = useState(false) // State to toggle meal info visibility
    const [mealData, setMealData] = useState([]) // State to store meal data

    // Fetch meal data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('food_log')
                .select('*') // Fetch all data from the 'food_log' table

            if (data) {
                console.log(data)
                const currentDate = new Date().toDateString() // Get the current date
                // Filter data to get entries for the current date and specific meal type
                const filteredNutritionData = data.filter((entry) => new Date(entry.created_at).toDateString() === currentDate && entry.meal_type === mealType)

                setMealData(filteredNutritionData) // Update the state with filtered data
                console.log(filteredNutritionData)
            }

            if (error) {
                console.log(error) // Log any errors
            }
        }

        fetchData() // Call the fetchData function
    }, [])

    // Calculate the total calories from the meal data
    const addedData = mealData.reduce((accumulator, entry) => accumulator + entry.calories, 0)

    return (
        <div className="pt-8">
            <div className="flex space-x-8">
                <div>
                    {/* Link to the meal page with a query parameter for the meal type */}
                    <Link href={`/meals?meal=${mealType}`}>
                        <Button className="text-base w-48">
                            <UtensilsCrossed className="mr-2 h-6 w-6" />
                            {mealType}
                            <CirclePlus className="ml-2 h-6 w-6" />
                        </Button>
                    </Link>
                </div>
                <div>
                    {/* Toggle button to show or hide meal info */}
                    <Toggle onClick={() => setMealInfo(prevValue => !prevValue)}>
                        <Info></Info>
                    </Toggle>
                </div>
            </div>
            <div className="">
                {/* Display the total calories eaten or the recommended calories */}
                {mealInfo ? <p>{addedData.toFixed(2)} Calories Eaten</p> : <h1> Recommended Calories: {reccCalories} </h1>}
            </div>
        </div>
    )
}

// Export the AddMeal component as the default export
export default AddMeal;
