"use client";

import React, { useState } from "react";
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
import { Select } from "antd";
import { useGetMetaChartQuery } from "../../page/redux/api/categoryApi";

const UserGrowth = () => {
  const [year, setYear] = useState(2025);

  const { data, isLoading, isError } = useGetMetaChartQuery({ year });

  const handleYearChange = (value) => {
    setYear(value);
  };

  // Generate year options (Current year - 3 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: currentYear - i,
    label: (currentYear - i).toString(),
  }));

  // Transform API data for Bar Chart
  const chartData =
    data?.data?.months?.map((month, index) => ({
      name: month,
      users: data?.data?.userGrowth?.[index] || 0,
    })) || [];

  if (isLoading) return <div className="p-8 text-center">Loading User Growth Chart...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load chart data</div>;

  return (
    <div className=" ">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">User Growth</h3>

        <Select
          value={year}
          onChange={handleYearChange}
          style={{ width: 120 }}
          options={yearOptions}
        />
      </div>

      <div className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={36}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#017FF4" name="New Users" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowth;