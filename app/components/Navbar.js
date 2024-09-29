"use client";
import Link from "next/link";
import Image from "next/image";
import logout from "../logout/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky top-0 text-black">
      <nav className="flex w-full px-12 border-b-2 border-solid bg-white items-center">
        <div className="py-4">
          <Link href="/" className="">
            <Image src="/images/logo.png" alt="Logo" width={75} height={75} />
          </Link>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
          <Link
            className="text-lg font-semibold group relative"
            href="/workouts"
          >
            Workouts
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 "></div>
          </Link>
          <Link
            className="text-lg font-semibold group relative "
            href="/nutrition"
          >
            Nutrition
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 "></div>
          </Link>
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
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

export default Navbar;
