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
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0)
  const [fetchError, setFetchError] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [formData, setFormData] = useState({ foodQuantity: "", foodName: "" });

  const updateTable = async (calories, protein, carbs, totalFat) => {
    console.log("clicked");
    console.log("calories from updateTable", calories);

    const { data, error } = await supabase.auth.getUser();

    if (data) {
      const { foodData, foodError } = await supabase
        .from("food_log")
        .insert({
          calories: calories,
          protein: protein,
          carbs: carbs,
          total_fat: totalFat,
          foodQuantity: formData.foodQuantity,
          foodName: formData.foodName,
          user_id: data.user.id,
          meal_type: meal,
        });

      if (foodError) {
        console.log(error);
        setFetchError("There is An Error");
      }
      if (foodData) {
        console.log(data);
        setFetchError(null);
      }
    }


  };

  const handleChange = (event) => {
    return setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    Axios.get(
      `https://api.calorieninjas.com/v1/nutrition?query=${formData.foodQuantity} ${formData.foodName}`,
      {
        headers: {
          "X-Api-Key": API_KEY,
        },
      }
    )
      .then((res) => {
        console.log(res);
        setCalories(res.data.items[0].calories);
        setProtein(res.data.items[0].protein_g);
        setCarbs(res.data.items[0].carbohydrates_total_g);
        setTotalFat(res.data.items[0].fat_total_g)
        updateTable(
          res.data.items[0].calories,
          res.data.items[0].protein_g,
          res.data.items[0].carbohydrates_total_g,
          res.data.items[0].fat_total_g
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add {meal} Items</h1>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Food Quantity (e.g 500g)"
            onChange={handleChange}
            name="foodQuantity"
            value={formData.foodQuantity}
            className="w-full"
          />
          <Input
            type="text"
            placeholder="Name of Food (e.g chicken breast)"
            onChange={handleChange}
            name="foodName"
            value={formData.foodName}
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
        {calories > 0 && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Nutrition Information:</h2>
            <ul className="space-y-2">
              <li>Calories: {calories} kcal</li>
              <li>Protein: {protein} g</li>
              <li>Carbs: {carbs} g</li>
              <li>Total Fat: {totalFat} g</li>
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
