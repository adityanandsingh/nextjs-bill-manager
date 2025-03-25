"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CategoryChart } from "@/components/category-chart"
import { MonthlyTrendChart } from "@/components/monthly-trend-chart"
import { BudgetAnalysis } from "@/components/budget-analysis"
import { Download } from "lucide-react"

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState("6months")

  return (
    <DashboardShell>
      <DashboardHeader heading="Reports & Analysis" text="Analyze your spending patterns and bill history.">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </DashboardHeader>
      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
            </TabsList>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="overview" className="pt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Spending</CardTitle>
                  <CardDescription>Your bill expenses over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <MonthlyTrendChart timeframe={timeframe} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                  <CardDescription>Distribution of expenses</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <CategoryChart timeframe={timeframe} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="categories" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Detailed analysis of spending by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <CategoryChart timeframe={timeframe} detailed />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trends" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>How your spending has changed over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <MonthlyTrendChart timeframe={timeframe} detailed />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="budget" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Analysis</CardTitle>
                <CardDescription>Compare your spending against your budget</CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetAnalysis timeframe={timeframe} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

