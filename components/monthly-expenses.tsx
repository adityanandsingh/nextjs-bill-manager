"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"

export function MonthlyExpenses() {
  // Updated data with more detailed information
  const data = [
    {
      name: "Oct",
      expenses: 850,
      budget: 900,
      savings: 50,
    },
    {
      name: "Nov",
      expenses: 920,
      budget: 900,
      savings: -20,
    },
    {
      name: "Dec",
      expenses: 1100,
      budget: 1000,
      savings: -100,
    },
    {
      name: "Jan",
      expenses: 980,
      budget: 1000,
      savings: 20,
    },
    {
      name: "Feb",
      expenses: 1050,
      budget: 1100,
      savings: 50,
    },
    {
      name: "Mar",
      expenses: 950,
      budget: 1100,
      savings: 150,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" fontSize={12} dy={10} />
        <YAxis
          axisLine={false}
          tickLine={false}
          stroke="#94a3b8"
          fontSize={12}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "12px",
          }}
          formatter={(value, name) => {
            if (name === "expenses") return [`$${value}`, "Expenses"]
            if (name === "budget") return [`$${value}`, "Budget"]
            if (name === "savings") {
              const prefix = value >= 0 ? "+" : ""
              return [`${prefix}$${Math.abs(value)}`, "Savings"]
            }
            return [value, name]
          }}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend
          verticalAlign="top"
          height={36}
          formatter={(value) => {
            if (value === "expenses") return "Expenses"
            if (value === "budget") return "Budget"
            return value
          }}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="#4f46e5"
          fillOpacity={1}
          fill="url(#colorExpenses)"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
        <Area
          type="monotone"
          dataKey="budget"
          stroke="#10b981"
          fillOpacity={1}
          fill="url(#colorBudget)"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

