"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Select } from "antd";
import { useGetMetaChartQuery } from "../../page/redux/api/categoryApi";

export const EarningGrowth = () => {
  const [year, setYear] = useState(2025);

  const { data, isLoading, isError } = useGetMetaChartQuery({ year });

  const handleYearChange = (value) => {
    setYear(value);
  };

  // Generate year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: currentYear - i,
    label: (currentYear - i).toString(),
  }));

  // Transform API data for Area Chart
  const chartData =
    data?.data?.months?.map((month, index) => ({
      month: month,
      value: data?.data?.earningGrowth?.[index] || 0,   // Change key if your API uses different name
    })) || [];

  if (isLoading) return <div className="p-8 text-center">Loading Earning Growth Chart...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load earning data</div>;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Earning Growth</h3>

        <Select
          value={year}
          onChange={handleYearChange}
          style={{ width: 120 }}
          options={yearOptions}
        />
      </div>

      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#017FF4"
              strokeWidth={3}
              fill="#017FF4"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningGrowth;