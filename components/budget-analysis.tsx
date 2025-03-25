"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface BudgetAnalysisProps {
  timeframe?: string
}

export function BudgetAnalysis({ timeframe = "6months" }: BudgetAnalysisProps) {
  const data = [
    {
      name: "Utilities",
      budget: 500,
      actual: 450,
    },
    {
      name: "Housing",
      budget: 1300,
      actual: 1200,
    },
    {
      name: "Subscriptions",
      budget: 100,
      actual: 120,
    },
    {
      name: "Insurance",
      budget: 350,
      actual: 350,
    },
    {
      name: "Other",
      budget: 250,
      actual: 230,
    },
  ]

  const totalBudget = data.reduce((sum, item) => sum + item.budget, 0)
  const totalActual = data.reduce((sum, item) => sum + item.actual, 0)
  const percentUsed = Math.round((totalActual / totalBudget) * 100)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>Total budget usage for the current period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Budget Usage</span>
              <span className="text-sm font-medium">{percentUsed}%</span>
            </div>
            <Progress value={percentUsed} className="h-2" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                ${totalActual.toFixed(2)} of ${totalBudget.toFixed(2)}
              </span>
              <span>${(totalBudget - totalActual).toFixed(2)} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>Budget vs. actual spending by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" tickFormatter={(value) => `$${value}`} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <p className="text-sm font-bold">{payload[0].payload.name}</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Budget</span>
                              <span className="font-bold">${payload[0].payload.budget}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Actual</span>
                              <span className="font-bold">${payload[0].payload.actual}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between border-t pt-2">
                            <span className="text-sm">Difference</span>
                            <span
                              className={`text-sm font-bold ${
                                payload[0].payload.budget - payload[0].payload.actual >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              ${(payload[0].payload.budget - payload[0].payload.actual).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Bar dataKey="budget" name="Budget" fill="#94a3b8" radius={[4, 4, 4, 4]} />
              <Bar dataKey="actual" name="Actual" fill="#0ea5e9" radius={[4, 4, 4, 4]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.actual > entry.budget ? "#f43f5e" : "#10b981"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

