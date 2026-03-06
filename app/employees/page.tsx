"use client";

import { useEffect, useState, useCallback } from "react";
import API from "../../services/api";
import EmployeeForm from "../../components/EmployeeForm";
import EmployeeTable from "../../components/EmployeeTable";

export default function EmployeesPage() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load employees from backend
  const loadEmployees = useCallback(async () => {

    try {

      setLoading(true);
      setError("");

      const res = await API.get("/employees");

      setEmployees(res.data);

    } catch (err) {

      console.error("Failed to load employees", err);

      setError("Failed to load employees");

    } finally {

      setLoading(false);

    }

  }, []);

  // Run when page loads
  useEffect(() => {

    loadEmployees();

  }, [loadEmployees]);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Employees
      </h1>

      {/* Employee Form */}
      <EmployeeForm reload={loadEmployees} />

      {/* Loading State */}
      {loading && (
        <p className="text-gray-500 mt-4">
          Loading employees...
        </p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}

      {/* Employee Table */}
      {!loading && !error && (
        <EmployeeTable
          employees={employees}
          reload={loadEmployees}
        />
      )}

    </div>
  );
}