"use client";

import { useEffect, useState } from "react";
import API from "../services/api";

interface Employee {
  employeeId: string;
  fullName: string;
}

interface AttendanceFormProps {
  reload: () => Promise<void>;
}

export default function AttendanceForm({ reload }: AttendanceFormProps) {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  useEffect(() => {

    const fetchEmployees = async () => {

      const res = await API.get("/employees");

      setEmployees(res.data);

    };

    fetchEmployees();

  }, []);

  const submitAttendance = async (e: React.FormEvent) => {

    e.preventDefault();

    await API.post("/attendance", {
      employeeId,
      date,
      status,
    });

    alert("Attendance marked");

    // refresh attendance table
    reload();

  };

  return (
    <form onSubmit={submitAttendance} className="space-y-3">

      <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Select Employee</option>

        {employees.map((emp) => (

          <option key={emp.employeeId} value={emp.employeeId}>
            {emp.employeeId} - {emp.fullName}
          </option>

        ))}

      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button className="bg-green-600 text-white px-4 py-2">
        Mark Attendance
      </button>

    </form>
  );
}