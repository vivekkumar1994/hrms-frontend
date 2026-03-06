"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold">
        HRMS Lite Dashboard
      </h1>

      <div className="flex gap-4">

        <Link
          href="/employees"
          className="bg-blue-600 text-white px-6 py-3"
        >
          Manage Employees
        </Link>

        <Link
          href="/attendance"
          className="bg-green-600 text-white px-6 py-3"
        >
          Manage Attendance
        </Link>

      </div>

    </div>
  );
}