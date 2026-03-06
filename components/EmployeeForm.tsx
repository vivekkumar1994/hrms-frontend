"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../services/api";

interface EmployeeFormProps {
  reload: () => Promise<void>;
}

export default function EmployeeForm({ reload }: EmployeeFormProps) {

  const router = useRouter();

  const [employeeId, setEmployeeId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const createEmployee = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      await API.post("/employees", {
        employeeId,
        fullName,
        email,
        department,
      });

      setEmployeeId("");
      setFullName("");
      setEmail("");
      setDepartment("");

      reload();

    } catch {

      alert("Employee already exists");

    }

  };

  // Navigate to attendance page
  const trackAttendance = () => {

    if (!employeeId) {
      alert("Enter Employee ID first");
      return;
    }

    router.push(`/attendance?employeeId=${employeeId}`);

  };

  return (

    <form onSubmit={createEmployee} className="space-y-3">

      <input
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="border p-2 w-full"
      />

      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2"
        >
          Add Employee
        </button>

  

      </div>

    </form>

  );
}