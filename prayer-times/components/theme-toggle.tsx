"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className="dark:hidden"
      >
        <SunIcon />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className="hidden dark:flex"
      >
        <MoonIcon />
      </Button>
    </>
  );
}
