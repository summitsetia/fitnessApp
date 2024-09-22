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

const IntroForm = () => {
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activity: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userData) {
      const { data, error } = await supabase.from("user_metrics").insert({
        id: userData.user.id,
        weight: formData.weight,
        height: formData.height,
        age: formData.age,
        gender: formData.gender,
        activity: formData.activity,
      });

      if (data) {
        console.log(data);
      }

      if (error) {
        console.log(error);
      }
    }

    if (userError) {
      console.log(userError);
    }

    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleActivityChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      activity: e,
    }));
  };

  const handleGenderChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      gender: e,
    }));
  };

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
            onChange={handleChange}
            name="weight"
            value={formData.weight}
            className="w-full"
          />
          <Input
            placeholder="Height (cm)"
            type="number"
            name="height"
            className="w-full"
            onChange={handleChange}
            value={formData.height}
          />
          <Input
            placeholder="Age"
            name="age"
            type="number"
            className="w-full"
            onChange={handleChange}
            value={formData.age}
          />
          <div className="space-y-8">
            {/* <label>
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                id="gender"
                className="w-full border border-gray-300 rounded-lg "
              >
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label> */}
            {/* <label>
              Activity Level:
              <select
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                id="activity"
                className="w-full border border-gray-300 rounded-lg "
              >
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                <option value="light">Exercise 1-3 times/week</option>
                <option value="moderate">Exercise 4-5 times/week</option>
                <option value="active">Heavy Exercise 3-4 times/week</option>
                <option value="very active">
                  Intense Exercise 6-7 times/week
                </option>
              </select>
            </label> */}
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
