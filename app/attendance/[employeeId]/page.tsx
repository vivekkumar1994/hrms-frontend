"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import API from "../../../services/api";

interface Attendance {
  id?: number;
  employeeId: string;
  date: string;
  status: string;
}

type FilterType = "daily" | "weekly" | "monthly" | "yearly";

export default function EmployeeAttendancePage() {

  const { employeeId } = useParams();

  const [records, setRecords] = useState<Attendance[]>([]);
  const [filter, setFilter] = useState<FilterType>("daily");

  useEffect(() => {

    const loadAttendance = async () => {

      const res = await API.get(`/attendance/${employeeId}`);

      setRecords(res.data);

    };

    if (employeeId) {
      loadAttendance();
    }

  }, [employeeId]);

  const filteredRecords = useMemo(() => {

    const now = new Date();

    return records.filter((rec) => {

      const recDate = new Date(rec.date);

      if (filter === "daily") {
        return recDate.toDateString() === now.toDateString();
      }

      if (filter === "weekly") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return recDate >= oneWeekAgo;
      }

      if (filter === "monthly") {
        return (
          recDate.getMonth() === now.getMonth() &&
          recDate.getFullYear() === now.getFullYear()
        );
      }

      if (filter === "yearly") {
        return recDate.getFullYear() === now.getFullYear();
      }

      return true;

    });

  }, [records, filter]);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Attendance - {employeeId}
      </h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setFilter("daily")}
          className="bg-blue-500 text-white px-3 py-1"
        >
          Daily
        </button>

        <button
          onClick={() => setFilter("weekly")}
          className="bg-blue-500 text-white px-3 py-1"
        >
          Weekly
        </button>

        <button
          onClick={() => setFilter("monthly")}
          className="bg-blue-500 text-white px-3 py-1"
        >
          Monthly
        </button>

        <button
          onClick={() => setFilter("yearly")}
          className="bg-blue-500 text-white px-3 py-1"
        >
          Yearly
        </button>

      </div>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>

          {filteredRecords.map((rec) => (

            <tr key={rec.date}>

              <td className="border p-2">{rec.date}</td>
              <td className="border p-2">{rec.status}</td>

            </tr>

          ))}

          {filteredRecords.length === 0 && (
            <tr>
              <td colSpan={2} className="text-center p-4">
                No attendance records
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}