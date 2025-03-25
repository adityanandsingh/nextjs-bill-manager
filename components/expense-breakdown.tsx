"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function ExpenseBreakdown() {
  const data = [
    { name: "Utilities", value: 450, color: "#4f46e5" },
    { name: "Housing", value: 1200, color: "#10b981" },
    { name: "Subscriptions", value: 120, color: "#f59e0b" },
    { name: "Insurance", value: 350, color: "#ef4444" },
    { name: "Other", value: 230, color: "#8b5cf6" },
  ]

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const detailed = false

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={detailed ? 150 : 80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => (detailed ? `${name} ${(percent * 100).toFixed(0)}%` : "")}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "Percentage"]}
          contentStyle={{
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "12px",
          }}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          iconSize={10}
          formatter={(value, entry, index) => (
            <span style={{ color: "#64748b", fontSize: "12px", marginLeft: "4px" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

