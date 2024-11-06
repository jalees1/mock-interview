"use client";

import { MoonIcon, SunIcon, Briefcase } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6" />
            <span className="font-bold text-xl">MockMaster</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/interview-generator">
              <Button variant="ghost">Practice Interview</Button>
            </Link>
            <Link href="/jobs">
              <Button variant="ghost">Job Listings</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}