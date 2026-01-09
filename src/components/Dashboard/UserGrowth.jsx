"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetMetaChartQuery } from "../../page/redux/api/categoryApi";

const UserGrowth = () => {
  const [year, setYear] = useState(2025);

  // API call with year
  const { data, isLoading } = useGetMetaChartQuery({ year });

  // API থেকে year list (future proof)
  const years = data?.data?.year ? [data.data.year] : [];

  // 🔹 Transform API data for Recharts
  const chartData =
    data?.data?.months?.map((month, index) => ({
      name: month,
      users: data?.data?.userGrowth?.[index] || 0,
    })) || [];

  if (isLoading) {
    return <p className="p-4">Loading chart...</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <p className="text-xl font-medium">User Growth</p>

        {/* ✅ Dynamic Select */}
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded-md px-3 py-1 text-sm outline-none"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={35}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#017FF4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowth;
