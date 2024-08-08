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
                console.log(data)
                const calorieTotal = data.reduce(
                    (accumulator, element) => accumulator + element.calories,
                    0
                );
                setTotalCalories(calorieTotal.toFixed(2));

                const proteinTotal = data.reduce(
                    (accumulator, element) => accumulator + element.protein,
                    0
                );
                setTotalProtein(proteinTotal.toFixed(2));

                const carbsTotal = data.reduce(
                    (accumulator, element) => accumulator + element.carbs,
                    0
                );
                setTotalCarbs(carbsTotal.toFixed(2));

                const fatTotal = data.reduce(
                    (accumulator, element) => accumulator + element.total_fat,
                    0
                );
                setTotalFat(fatTotal.toFixed(2));

            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4">
                <h1 className="font-bold text-2xl">Today Stats</h1>
            </div>
            <div className="flex space-x-12">
                <div className="text-center">
                    <h2>Calories Eaten</h2>
                    <h1>{totalCalories} cal</h1>
                    <Progress value={totalCalories / 2000 * 100} className="" />
                </div>
                <div className="text-center">
                    <h2>Protein</h2>
                    <h1>{totalProtein} g</h1>
                    <Progress value={totalProtein / 159 * 100} className="" />
                </div>
                <div className="text-center">
                    <h2>Carbohydrates</h2>
                    <h1>{totalCarbs} g</h1>
                    <Progress value={totalCarbs / 150 * 100} className="" />
                </div>
                <div className="text-center">
                    <h2>Total Fat</h2>
                    <h1>{totalFat} g</h1>
                    <Progress value={totalFat / 150 * 100} className="" />
                </div>
            </div>
        </div>
    )
}

export default NutritionStats;
