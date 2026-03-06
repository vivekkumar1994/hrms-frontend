"use client";

import { useRouter } from "next/navigation";
import API from "../services/api";

interface Employee {
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  reload: () => Promise<void>;
}

export default function EmployeeTable({ employees, reload }: EmployeeTableProps) {

  const router = useRouter();

  const deleteEmployee = async (id: string) => {
    await API.delete(`/employees/${id}`);
    reload();
  };

  const trackAttendance = (id: string) => {
    router.push(`/attendance/${id}`);
  };

  return (

    <table className="w-full border mt-10">

      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">Employee ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Department</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>

      <tbody>

        {employees.map((emp) => (

          <tr key={emp.employeeId}>

            <td className="border p-2">{emp.employeeId}</td>
            <td className="border p-2">{emp.fullName}</td>
            <td className="border p-2">{emp.email}</td>
            <td className="border p-2">{emp.department}</td>

            <td className="border p-2 flex gap-2">

              <button
                onClick={() => trackAttendance(emp.employeeId)}
                className="bg-green-600 text-white px-3 py-1"
              >
                Attendance
              </button>

              <button
                onClick={() => deleteEmployee(emp.employeeId)}
                className="bg-red-500 text-white px-3 py-1"
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}