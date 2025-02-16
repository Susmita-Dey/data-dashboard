"use client";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bottom-0 w-full border-b bg-gray-700 backdrop-blur-md supports-[backdrop-filter]:bg-gray-300/60 py-5 dark:bg-gray-800">
      <div className="container mx-auto px-4">
          <p className="text-base text-center">
            <span>
              Built with 💖 by{" "}
              <Link
                href="https://susmitadey.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-950 hover:underline hover:underline-offset-4 dark:text-gray-50"
              >
                Susmita Dey.
              </Link>
              <br/>&copy; {currentYear}. All rights reserved.
            </span>
          </p>
        </div>
    </footer>
  );
}