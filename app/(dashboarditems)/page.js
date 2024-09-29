import React from "react";
import Dashboard from "./dashboard/Dashboard";

// the home page showing the dashboard, this function is importing the Dashboard component
export default function Home() {
  return (
    <div className="flex justify-center bg-[#FBFBFF]">
      <Dashboard />
    </div>
  );
}
