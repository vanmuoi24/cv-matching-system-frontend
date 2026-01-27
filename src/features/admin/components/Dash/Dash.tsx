import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const cardData = [
  {
    title: "Customers",
    value: "3,782",
    change: "+11.01%",
    positive: true,
  },
  {
    title: "Orders",
    value: "5,359",
    change: "-9.05%",
    positive: false,
  },
];

const monthlySales = [
  { name: "Jan", value: 150 },
  { name: "Feb", value: 380 },
  { name: "Mar", value: 190 },
  { name: "Apr", value: 280 },
  { name: "May", value: 170 },
  { name: "Jun", value: 180 },
  { name: "Jul", value: 270 },
  { name: "Aug", value: 100 },
  { name: "Sep", value: 200 },
  { name: "Oct", value: 380 },
  { name: "Nov", value: 260 },
  { name: "Dec", value: 100 },
];

const statisticData = [
  { name: "Jan", a: 180, b: 40 },
  { name: "Feb", a: 190, b: 30 },
  { name: "Mar", a: 170, b: 50 },
  { name: "Apr", a: 160, b: 40 },
  { name: "May", a: 175, b: 55 },
  { name: "Jun", a: 165, b: 40 },
  { name: "Jul", a: 170, b: 70 },
  { name: "Aug", a: 200, b: 100 },
  { name: "Sep", a: 230, b: 110 },
  { name: "Oct", a: 210, b: 120 },
  { name: "Nov", a: 240, b: 150 },
  { name: "Dec", a: 235, b: 140 },
];

const Dash = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <p className="text-gray-500 text-sm">{item.title}</p>
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-3xl font-bold">{item.value}</h2>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  item.positive
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.change}
              </span>
            </div>
          </div>
        ))}

        {/* Monthly Target */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Monthly Target</h3>
          <div className="flex flex-col items-center justify-center h-40">
            <div className="text-4xl font-bold text-indigo-600">
              75.55%
            </div>
            <span className="mt-2 bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full">
              +10%
            </span>
            <p className="text-gray-500 text-sm mt-3 text-center">
              You earn $3287 today, higher than last month.
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Sales */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
        <h3 className="font-semibold text-lg mb-4">Monthly Sales</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySales}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Statistics</h3>
          <span className="text-sm text-gray-500">
            Jan 19 - Jan 25
          </span>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={statisticData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="a"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="b"
                stroke="#93C5FD"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dash;
