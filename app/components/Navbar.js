// Importing the Button component from a custom UI library
import { Button } from "@/components/ui/button";
// Importing the Link component from Next.js for client-side navigation
import Link from "next/link";
// Enabling "use client" to ensure the component runs in the client environment
"use client";
// Importing React for JSX usage
import React from "react";
// Importing Image component from Next.js for optimized image rendering
import Image from "next/image";
// Re-importing the Link component (duplicate import, might not be necessary)
import Link from "next/link";
// Importing a custom logout action
import logout from "../logout/actions";
// Importing components from a custom DropdownMenu UI library
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Importing the User icon from the lucide-react library
import { User } from "lucide-react";

// Defining the Navbar functional component
const Navbar = () => {
  return (
    // A div with sticky positioning and styling for the navbar
    <div className="sticky top-0 text-black ">
      {/* Main navigation bar with styling */}
      <nav className="flex w-full px-12 border-b-2 border-solid bg-white items-center ">
        {/* Logo section */}
        <div className="py-4 ">
          {/* Link to the home page with the logo image */}
          <Link href="/" className="">
            <Image src="/images/logo.png" alt="Logo" width={75} height={75} />
          </Link>
        </div>
        {/* Centered navigation links */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
          {/* Link to the Workouts page */}
          <Link className="text-lg font-semibold hover:underline hover:text-blue-600" href="/workouts">
            Workouts
          </Link>
          {/* Link to the Nutrition page */}
          <Link className="text-lg font-semibold hover:underline hover:text-blue-600" href="/nutrition">
            Nutrition
          </Link>
          {/* Dropdown menu for user account actions */}
          <div className="">
            <DropdownMenu>
              {/* Dropdown trigger using the User icon */}
              <DropdownMenuTrigger>
                <User className="h-6 w-6" />
              </DropdownMenuTrigger>
              {/* Dropdown menu content */}
              <DropdownMenuContent>
                {/* Dropdown label */}
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                {/* Separator line */}
                <DropdownMenuSeparator />
                {/* Dropdown item for Profile */}
                <DropdownMenuItem>Profile</DropdownMenuItem>
                {/* Dropdown item for Settings */}
                <DropdownMenuItem>Settings</DropdownMenuItem>
                {/* Separator line */}
                <DropdownMenuSeparator />
                {/* Logout item with red text, triggering the logout action on select */}
                <DropdownMenuItem
                  onSelect={() => logout()}
                  className="text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </div>
  );
};

// Exporting the Navbar component as the default export
export default Navbar;
