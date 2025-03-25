"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

interface CategoryChartProps {
  timeframe?: string
  detailed?: boolean
}

export function CategoryChart({ timeframe = "6months", detailed = false }: CategoryChartProps) {
  const data = [
    { name: "Utilities", value: 450, color: "#0ea5e9" },
    { name: "Housing", value: 1200, color: "#8b5cf6" },
    { name: "Subscriptions", value: 120, color: "#f43f5e" },
    { name: "Insurance", value: 350, color: "#10b981" },
    { name: "Other", value: 230, color: "#f59e0b" },
  ]

  return (
    <ResponsiveContainer width="100%" height={detailed ? 400 : 300}>
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
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                      <span className="font-bold text-muted-foreground">{payload[0].name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Amount</span>
                      <span className="font-bold">${payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

