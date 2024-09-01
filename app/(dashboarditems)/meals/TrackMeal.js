"use client"; // This line indicates that the component should be rendered on the client-side in Next.js.
import React, { useState } from "react"; // Importing React and useState hook to manage component state.
import Axios from "axios"; // Importing Axios for making HTTP requests.
import { createClient } from "../../../utils/supabase/client"; // Importing a function to create a Supabase client instance.
import { Input } from "@/components/ui/input"; // Importing a custom Input component.
import { Button } from "@/components/ui/button"; // Importing a custom Button component.
import { useSearchParams } from 'next/navigation'; // Importing a hook to access URL search parameters.

const TrackMeal = () => {
  const supabase = createClient(); // Initializing the Supabase client.
  const searchParams = useSearchParams(); // Getting the search parameters from the URL.
  const meal = searchParams.get('meal'); // Extracting the 'meal' parameter from the search parameters.
  const [calories, setCalories] = useState(0); // State to store calories value.
  const [protein, setProtein] = useState(0); // State to store protein value.
  const [carbs, setCarbs] = useState(0); // State to store carbs value.
  const [totalFat, setTotalFat] = useState(0); // State to store total fat value.
  const [fetchError, setFetchError] = useState(null); // State to store any fetch error.
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Fetching the API key from environment variables.
  const [formData, setFormData] = useState({ foodQuantity: "", foodName: "" }); // State to store form input data.

  const updateTable = async (calories, protein, carbs, totalFat) => {
    console.log("clicked"); // Logging to console when the function is triggered.
    console.log("calories from updateTable", calories); // Logging the calories being passed to the function.

    const { data, error } = await supabase.auth.getUser(); // Fetching the authenticated user's data from Supabase.

    if (data) { // If user data is available.
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
        }); // Inserting the nutrition data into the 'food_log' table in Supabase.

      if (foodError) { // If there is an error inserting data.
        console.log(error); // Log the error to the console.
        setFetchError("There is An Error"); // Set the error state to display an error message.
      }
      if (foodData) { // If data is successfully inserted.
        console.log(data); // Log the user data to the console.
        setFetchError(null); // Clear any previous fetch error.
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
  }; // Update formData state with the new input values.

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior.

    Axios.get(
      `https://api.calorieninjas.com/v1/nutrition?query=${formData.foodQuantity} ${formData.foodName}`,
      {
        headers: {
          "X-Api-Key": API_KEY,
        },
      }
    )
      .then((res) => {
        console.log(res); // Log the response from the API.
        setCalories(res.data.items[0].calories); // Set the calories state with the response data.
        setProtein(res.data.items[0].protein_g); // Set the protein state with the response data.
        setCarbs(res.data.items[0].carbohydrates_total_g); // Set the carbs state with the response data.
        setTotalFat(res.data.items[0].fat_total_g); // Set the total fat state with the response data.
        updateTable(
          res.data.items[0].calories,
          res.data.items[0].protein_g,
          res.data.items[0].carbohydrates_total_g,
          res.data.items[0].fat_total_g
        ); // Call updateTable to save the nutrition data to the database.
      })
      .catch((error) => {
        console.log(error); // Log any error that occurs during the API request.
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add {meal} Items</h1> {/* Display the meal type as a header. */}
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4"> {/* Form submission handler. */}
          <Input
            type="text"
            placeholder="Food Quantity (e.g 500g)"
            onChange={handleChange}
            name="foodQuantity"
            value={formData.foodQuantity}
            className="w-full"
          /> {/* Input field for food quantity. */}
          <Input
            type="text"
            placeholder="Name of Food (e.g chicken breast)"
            onChange={handleChange}
            name="foodName"
            value={formData.foodName}
            className="w-full"
          /> {/* Input field for food name. */}
          <Button type="submit" className="w-full">
            Submit
          </Button> {/* Submit button to trigger the form submission. */}
        </form>
        {calories > 0 && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Nutrition Information:</h2> {/* Display section for nutrition information */}
            <ul className="space-y-2">
              <li>Calories: {calories} kcal</li> {/* Display calories */}
              <li>Protein: {protein} g</li> {/* Display protein */}
              <li>Carbs: {carbs} g</li> {/* Display carbs */}
              <li>Total Fat: {totalFat} g</li> {/* Display total fat */}
            </ul>
          </div>
        )}
        {fetchError && (
          <p className="mt-4 text-red-500">{fetchError}</p> {/* Display any fetch error message */}
        )}
      </div>
    </div>
  );
};

export default TrackMeal; // Exporting the TrackMeal component as the default export.
