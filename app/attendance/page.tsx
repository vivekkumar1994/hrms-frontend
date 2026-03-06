"use client";

import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import AttendanceForm from "../../components/AttendanceForm";

interface Attendance {
  id?: number;
  employeeId: string;
  date: string;
  status: string;
}

export default function AttendancePage() {

  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Load attendance records
  const loadAttendance = useCallback(async () => {

    try {

      setLoading(true);
      setError("");

      const res = await API.get<Attendance[]>("/attendance");

      setAttendance(res.data);

    } catch (err) {

      console.error("Failed to load attendance:", err);

      setError("Failed to load attendance records");

    } finally {

      setLoading(false);

    }

  }, []);

  // Load data when page opens
  useEffect(() => {

    loadAttendance();

  }, [loadAttendance]);

  return (

    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Attendance
      </h1>

      {/* Attendance Form */}
      <AttendanceForm reload={loadAttendance} />

      {/* Loading State */}
      {loading && (
        <p className="mt-6 text-gray-500">
          Loading attendance...
        </p>
      )}

      {/* Error State */}
      {error && (
        <p className="mt-6 text-red-500">
          {error}
        </p>
      )}

      {/* Attendance Table */}
      {!loading && !error && attendance.length > 0 && (

        <table className="w-full border mt-8">

          <thead className="bg-gray-200">

            <tr>
              <th className="border p-2 text-left">Employee ID</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {attendance.map((record) => (

              <tr key={`${record.employeeId}-${record.date}`}>

                <td className="border p-2">
                  {record.employeeId}
                </td>

                <td className="border p-2">
                  {record.date}
                </td>

                <td className="border p-2">
                  {record.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      {/* Empty State */}
      {!loading && !error && attendance.length === 0 && (
        <p className="mt-6 text-gray-500">
          No attendance records found
        </p>
      )}

    </div>

  );
}