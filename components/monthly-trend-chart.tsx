"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

interface MonthlyTrendChartProps {
  timeframe?: string
  detailed?: boolean
}

export function MonthlyTrendChart({ timeframe = "6months", detailed = false }: MonthlyTrendChartProps) {
  const data = [
    {
      name: "Jan",
      utilities: 350,
      housing: 1200,
      subscriptions: 95,
      insurance: 350,
      other: 180,
    },
    {
      name: "Feb",
      utilities: 380,
      housing: 1200,
      subscriptions: 110,
      insurance: 350,
      other: 190,
    },
    {
      name: "Mar",
      utilities: 320,
      housing: 1200,
      subscriptions: 105,
      insurance: 350,
      other: 170,
    },
    {
      name: "Apr",
      utilities: 390,
      housing: 1200,
      subscriptions: 115,
      insurance: 350,
      other: 210,
    },
    {
      name: "May",
      utilities: 410,
      housing: 1200,
      subscriptions: 120,
      insurance: 350,
      other: 220,
    },
    {
      name: "Jun",
      utilities: 450,
      housing: 1200,
      subscriptions: 120,
      insurance: 350,
      other: 230,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={detailed ? 400 : 300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <p className="text-sm font-bold">{label}</p>
                    {payload.map((entry, index) => (
                      <div key={`item-${index}`} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-sm capitalize">{entry.name}</span>
                        </div>
                        <span className="text-sm font-medium">${entry.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between border-t pt-2">
                      <span className="text-sm font-bold">Total</span>
                      <span className="text-sm font-bold">
                        ${payload.reduce((sum, entry) => sum + (entry.value as number), 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Area type="monotone" dataKey="utilities" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" />
        <Area type="monotone" dataKey="housing" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
        <Area type="monotone" dataKey="subscriptions" stackId="1" stroke="#f43f5e" fill="#f43f5e" />
        <Area type="monotone" dataKey="insurance" stackId="1" stroke="#10b981" fill="#10b981" />
        <Area type="monotone" dataKey="other" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  )
}

