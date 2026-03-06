import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HRMS Lite",
  description: "Employee and Attendance Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >

        {/* Navbar */}
        <nav className="bg-white shadow p-4 flex justify-between items-center">

          <h1 className="text-xl font-bold">
            HRMS Lite
          </h1>

          <div className="flex gap-6">

            <Link
              href="/"
              className="text-gray-700 hover:text-black"
            >
              Dashboard
            </Link>

            <Link
              href="/employees"
              className="text-gray-700 hover:text-black"
            >
              Employees
            </Link>

            <Link
              href="/attendance"
              className="text-gray-700 hover:text-black"
            >
              Attendance
            </Link>

          </div>

        </nav>

        {/* Page Content */}
        <main className="max-w-6xl mx-auto p-8">
          {children}
        </main>

      </body>

    </html>
  );
}