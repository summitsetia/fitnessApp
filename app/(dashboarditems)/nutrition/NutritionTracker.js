"use client";
import React, { useState } from "react";
import Axios from "axios";
import { createClient } from "../../../utils/supabase/client";

const NutritionTracker = () => {
  const supabase = createClient();

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

    const { data, error } = await supabase
      .from("food_log")
      .insert({
        calories: calories,
        protein: protein,
        carbs: carbs,
        total_fat: totalFat,
        foodQuantity: formData.foodQuantity,
        foodName: formData.foodName,
      });

    if (error) {
      console.log(error);
      setFetchError("There is An Error");
    }
    if (data) {
      console.log(data);
      setFetchError(null);
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
    // window.location.reload();

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
    <div>
      <div className="pt-48 flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="foodQuantity"
            onChange={handleChange}
            name="foodQuantity"
            value={formData.foodQuantity}
            className="border mx-4"
          />
          <input
            type="text"
            placeholder="foodName"
            onChange={handleChange}
            name="foodName"
            value={formData.foodName}
            className="border mx-4"
          />
          <button type="submit" className="border">
            Submit
          </button>
        </form>
        <div className="pl-12">
          {calories > 0 ? <h1>{calories} kcal</h1> : <h1></h1>}
          {protein > 0 ? <h1>{protein} g</h1> : <h1></h1>}
          {protein > 0 ? <h1>{carbs} g</h1> : <h1></h1>}
          {totalFat > 0 ? <h1>{carbs} g</h1> : <h1></h1>}
        </div>
        <h1>{fetchError}</h1>
      </div>
    </div>
  );
};

export default NutritionTracker;
