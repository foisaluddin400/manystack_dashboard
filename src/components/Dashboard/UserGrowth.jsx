import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useGetMetaChartQuery } from '../../page/redux/api/categoryApi'

const UserGrowth = () => {
  const { data, isLoading } = useGetMetaChartQuery()

  // 🔹 Transform API data for Recharts
  const chartData =
    data?.data?.months?.map((month, index) => ({
      name: month,
      users: data?.data?.userGrowth?.[index] || 0,
    })) || []

  if (isLoading) {
    return <p className="p-4">Loading chart...</p>
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <p className="text-xl font-medium">User Growth</p>
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
  )
}

export default UserGrowth


