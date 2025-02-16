"use client";

import { ContactRoundIcon, GithubIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <header className="fixed top-0 min-w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between w-full">
        <Link href="/" className="font-extrabold md:text-xl text-base py-1 w-auto">
          Segwise
        </Link>

        <div className="flex items-center md:space-x-2">
          <Link href={"/"}>
            <Button variant={"ghost"}>
              <HomeIcon className="h-4 w-4" />
              <span className="md:block hidden">Home</span>
            </Button>
          </Link>
          <Link
            href={"https://github.com/Susmita-Dey/segwise-assignment"}
            target="_blank"
          >
            <Button variant={"ghost"}>
              <GithubIcon className="h-4 w-4" />
              <span className="md:block hidden">GitHub Repo</span>
            </Button>
          </Link>
          <Link href={"https://susmitadey.vercel.app/"} target="_blank">
            <Button variant={"ghost"}>
              <ContactRoundIcon className="h-4 w-4" />
              <span className="md:block hidden">Contact</span>
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
