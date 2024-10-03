"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// importing react hooks, functions from supabase, router from nextjs and components from shadCN

// Nutrition calculation function
const calculatedNutrition = (weight, height, age, gender, activity) => {
  let activityMultiplier = 1.2;
  if (activity === "light") activityMultiplier = 1.375;
  if (activity === "moderate") activityMultiplier = 1.55;
  if (activity === "active") activityMultiplier = 1.725;
  if (activity === "very active") activityMultiplier = 1.9;

  let bmi;
  if (gender === "male") {
    bmi =
      (13.397 * weight + 4.799 * height - 5.677 * age + 88.362) *
      activityMultiplier;
  } else {
    bmi =
      (9.247 * weight + 3.098 * height - 4.33 * age + 447.593) *
      activityMultiplier;
  }

  const protein = weight * 2.205 * 0.9;
  const carbs = bmi / 2 / 4;
  const total_fat = (bmi * 0.3) / 9;

  return { bmi, protein, carbs, total_fat };
};

// Main form component
const IntroForm = () => {
  const supabase = createClient();
  const router = useRouter();

  // formData state
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activity: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    // if (weight <= 0 || weight > 500) {
    //   alert("Weight must be between 1 and 500 kg");
    //   return;
    // }
    // if (height <= 0 || height > 250) {
    //   alert("Height must be between 1 and 250 cm");
    //   return;
    // }
    // if (age <= 0 || age > 80) {
    //   alert("Age must be between 1 and 80 years");
    //   return;
    // }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    // inserting data to the user_metrics table
    if (userData) {
      const { data: metricsData, error: metricsError } = await supabase
        .from("user_metrics")
        .insert({
          id: userData.user.id,
          weight: formData.weight,
          height: formData.height,
          age: formData.age,
          gender: formData.gender,
          activity: formData.activity,
        });

      if (metricsData) {
        console.log(metricsData);
      }

      if (metricsError) {
        console.log(metricsError);
      }
    }

    // passing in values to the calculatedNutrition function from the formData
    const { bmi, protein, carbs, total_fat } = calculatedNutrition(
      formData.weight,
      formData.height,
      formData.age,
      formData.gender,
      formData.activity
    );

    // inserting data to the user nutrition table
    const { data: nutritionData, error: nutritionError } = await supabase
      .from("user_nutrition")
      .insert({
        id: userData.user.id,
        calories: bmi.toFixed(0),
        protein: protein.toFixed(0),
        carbs: carbs.toFixed(0),
        total_fat: total_fat.toFixed(0),
      });

    if (nutritionData) {
      console.log(nutritionData);
    }

    if (nutritionError) {
      console.log(nutritionError);
    }

    if (userError) {
      console.log(userError);
    }

    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // function to handle changes in the activity select
  const handleActivityChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      activity: e,
    }));
  };

  // function to handle changes in the gender select
  const handleGenderChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      gender: e,
    }));
  };

  // console.logs the formData when the formData array is updated
  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  return (
    <div className="pt-8 mx-4">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-4xl font-bold pb-4">Welcome To Summit Fitness</h1>
        <h2 className="text-2xl">
          Please Enter In Your Details Below To Proceed
        </h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-8 pt-8">
          <Input
            placeholder="Weight (kg)"
            type="number"
            min="1"
            max="500"
            onChange={handleChange}
            name="weight"
            value={formData.weight}
            className="w-full"
            required
          />
          <Input
            placeholder="Height (cm)"
            type="number"
            min="1"
            max="250"
            name="height"
            className="w-full"
            onChange={handleChange}
            value={formData.height}
            required
          />
          <Input
            placeholder="Age"
            name="age"
            type="number"
            min="1"
            max="80"
            className="w-full"
            onChange={handleChange}
            value={formData.age}
            required
          />
          <div className="space-y-8">
            <Select value={formData.gender} onValueChange={handleGenderChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={formData.activity}
              onValueChange={handleActivityChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Activity Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Exercise 1-3 times/week</SelectItem>
                  <SelectItem value="moderate">
                    Exercise 4-5 times/week
                  </SelectItem>
                  <SelectItem value="active">
                    Heavy Exercise 3-4 times/week
                  </SelectItem>
                  <SelectItem value="very active">
                    Intense Exercise 6-7 times/week
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default IntroForm;
