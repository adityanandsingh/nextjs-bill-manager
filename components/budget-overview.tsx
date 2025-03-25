"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BudgetOverview() {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Budget Analysis</h3>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1 shadow-sm">
          <TabsTrigger
            value="overview"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Categories
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-6">
          <Card className="rounded-xl shadow-md border-0">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="rounded-xl shadow-md border-0 p-6">
              <div className="text-sm text-blue-600 font-medium mb-1">Total Budget</div>
              <div className="text-3xl font-bold text-gray-800">${totalBudget.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground mt-2">Allocated for monthly expenses</div>
            </Card>

            <Card className="rounded-xl shadow-md border-0 p-6">
              <div className="text-sm text-green-600 font-medium mb-1">Actual Spending</div>
              <div className="text-3xl font-bold text-gray-800">${totalActual.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground mt-2">
                {totalActual <= totalBudget ? "Under budget" : "Over budget"}
              </div>
            </Card>

            <Card className="rounded-xl shadow-md border-0 p-6">
              <div className="text-sm text-purple-600 font-medium mb-1">Remaining</div>
              <div className="text-3xl font-bold text-gray-800">${(totalBudget - totalActual).toFixed(2)}</div>
              <div className="text-sm text-muted-foreground mt-2">Available to spend</div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="pt-6">
          <Card className="rounded-xl shadow-md border-0">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>Budget vs. actual spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
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
                    <Bar
                      dataKey="budget"
                      name="Budget"
                      fill="#94a3b8"
                      radius={[4, 4, 4, 4]}
                      isAnimationActive={false}
                    />
                    <Bar dataKey="actual" name="Actual" fill="#0ea5e9" radius={[4, 4, 4, 4]} isAnimationActive={false}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.actual > entry.budget ? "#f43f5e" : "#10b981"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="pt-6">
          <Card className="rounded-xl shadow-md border-0">
            <CardHeader>
              <CardTitle>Monthly Budget Trends</CardTitle>
              <CardDescription>How your spending compares to budget over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: "Jan", budget: 2400, actual: 2200 },
                      { month: "Feb", budget: 2400, actual: 2300 },
                      { month: "Mar", budget: 2400, actual: 2500 },
                      { month: "Apr", budget: 2500, actual: 2400 },
                      { month: "May", budget: 2500, actual: 2350 },
                      { month: "Jun", budget: 2500, actual: 2450 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip
                      formatter={(value) => [`$${value}`, ""]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        padding: "12px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="budget" name="Budget" fill="#8884d8" isAnimationActive={false} />
                    <Bar dataKey="actual" name="Actual" fill="#82ca9d" isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

