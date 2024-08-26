"use client";
import React, { useState } from "react";
import Axios from "axios";
import { createClient } from "../../../utils/supabase/client";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchParams } from 'next/navigation'

const TrackMeal = () => {
  const supabase = createClient();
  const searchParams = useSearchParams()
  const meal = searchParams.get('meal')
  const [nutritionData, setNutritionData] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    totalFat: 0
  });
  const [fetchError, setFetchError] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [formData, setFormData] = useState({ foodQuantity: "", foodName: "" });

  const updateTable = async (nutritionData) => {
    const { data, error } = await supabase.auth.getUser();

    if (data) {
      const { foodData, foodError } = await supabase
        .from("food_log")
        .insert({
          ...nutritionData,
          foodQuantity: formData.foodQuantity,
          foodName: formData.foodName,
          user_id: data.user.id,
          meal_type: meal,
        });

      if (foodError) {
        console.log(error);
        setFetchError("There was an error logging your meal");
      } else {
        console.log(foodData);
        setFetchError(null);
      }
    }
  };

  const handleChange = (event) => {
    setFormData(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await Axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${formData.foodQuantity} ${formData.foodName}`,
        {
          headers: {
            "X-Api-Key": API_KEY,
          },
        }
      );

      const newNutritionData = {
        calories: res.data.items[0].calories,
        protein: res.data.items[0].protein_g,
        carbs: res.data.items[0].carbohydrates_total_g,
        totalFat: res.data.items[0].fat_total_g
      };

      setNutritionData(newNutritionData);
      await updateTable(newNutritionData);
    } catch (error) {
      console.log(error);
      setFetchError("Error fetching nutrition data");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add {meal} Items</h1>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Food Quantity"
            onChange={handleChange}
            name="foodQuantity"
            value={formData.foodQuantity}
            className="w-full"
          />
          <Input
            type="text"
            placeholder="Name of Food"
            onChange={handleChange}
            name="foodName"
            value={formData.foodName}
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
        {nutritionData.calories > 0 && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Nutrition Information:</h2>
            <ul className="space-y-2">
              <li>Calories: {nutritionData.calories} kcal</li>
              <li>Protein: {nutritionData.protein} g</li>
              <li>Carbs: {nutritionData.carbs} g</li>
              <li>Total Fat: {nutritionData.totalFat} g</li>
            </ul>
          </div>
        )}
        {fetchError && (
          <p className="mt-4 text-red-500">{fetchError}</p>
        )}
      </div>
    </div>
  );
};

export default TrackMeal;