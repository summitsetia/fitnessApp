'use client'
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress"

const NutritionStats = () => {
    const supabase = createClient();
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [totalFat, setTotalFat] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from("food_log").select();

            if (error) {
                console.log(error);
            }

            if (data) {
                const currentDate = new Date().toDateString()
                const filteredNutritionData = data.filter((entry) => new Date(entry.created_at).toDateString() === currentDate)
                console.log(filteredNutritionData)
                console.log(currentDate)
                console.log(data.map((entry) => new Date(entry.created_at).toDateString()))

                const calorieTotal = filteredNutritionData.reduce(
                    (accumulator, element) => accumulator + element.calories,
                    0
                );
                setTotalCalories(calorieTotal.toFixed(2));

                const proteinTotal = filteredNutritionData.reduce(
                    (accumulator, element) => accumulator + element.protein,
                    0
                );
                setTotalProtein(proteinTotal.toFixed(2));

                const carbsTotal = filteredNutritionData.reduce(
                    (accumulator, element) => accumulator + element.carbs,
                    0
                );
                setTotalCarbs(carbsTotal.toFixed(2));

                const fatTotal = filteredNutritionData.reduce(
                    (accumulator, element) => accumulator + element.total_fat,
                    0
                );
                setTotalFat(fatTotal.toFixed(2));

            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center mx-12">
            <div className="mb-4">
                <h1 className="font-bold text-3xl">Today's Stats</h1>
            </div>
            <div className="flex space-x-12">
                <div className="text-center">
                    <h2 className="font-bold text-lg">Calories Eaten</h2>
                    <h1>{totalCalories} / 2500 kcal</h1>
                    <Progress value={totalCalories / 2500 * 100} className="" />
                </div>
                <div className="text-center">
                    <h2 className="font-bold text-lg">Protein</h2>
                    <h1>{totalProtein} / 125 g</h1>
                    <Progress value={totalProtein / 125 * 100} className="" />
                </div>
                <div className="text-center">
                    <h2 className="font-bold text-lg">Carbohydrates</h2>
                    <h1>{totalCarbs} / 300 g</h1>
                    <Progress value={totalCarbs / 300 * 100} className="" />
                </div>
                <div className="text-center">
                    <h2 className="font-bold text-lg">Total Fat</h2>
                    <h1>{totalFat} / 60 g</h1>
                    <Progress value={totalFat / 60 * 100} className="" />
                </div>
            </div>
        </div>
    )
}

export default NutritionStats;
