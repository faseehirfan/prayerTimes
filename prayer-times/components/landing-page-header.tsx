"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Logo } from "./logo";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "./theme-toggle";

interface ItemsType {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

const items: ItemsType[] = [
  { title: "Home", href: "/" },
  { title: "Features", href: "/#features" },
  { title: "Get Started", href: "/#get-started" },
];

function MobileItems() {
  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function DesktopItems() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="hidden gap-6 md:flex">
      {items?.map((item, index) => (
        <Link
          key={index}
          href={item.disabled ? "#" : item.href}
          className={cn(
            "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
            item.href.startsWith(`/${segment}`)
              ? "text-foreground"
              : "text-foreground/60",
            item.disabled && "cursor-not-allowed opacity-80"
          )}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function LandingPageHeader() {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <header className="fixed w-full z-50 bg-background/80 px-4 md:px-8 backdrop-blur">
      <div className="flex h-18 items-center justify-between py-4">
        <div className="flex items-center gap-4 md:gap-10">
          <Logo className="hidden md:flex" />

          {items?.length ? <DesktopItems /> : null}

          <Button
            className="space-x-2 md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <Cross1Icon className="h-6 w-6" />
            ) : (
              <HamburgerMenuIcon className="h-6 w-6" />
            )}
          </Button>

          <Logo className="md:hidden" />

          {showMobileMenu && <MobileItems />}
        </div>

        <div className="flex gap-4 items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
