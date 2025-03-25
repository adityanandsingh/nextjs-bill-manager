"use client"

import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MonthlyExpenses } from "@/components/monthly-expenses"
import { ExpenseBreakdown } from "@/components/expense-breakdown"
import { UpcomingBills } from "@/components/upcoming-bills"
import { Reminders } from "@/components/reminders"
import { Plus, DollarSign, CreditCard, Home, Calendar, Upload } from "lucide-react"
import Link from "next/link"
import { BillsTable } from "@/components/bills-table"
import { DocumentsUpload } from "@/components/documents-upload"
import { BudgetOverview } from "@/components/budget-overview"
import { NavTabs } from "@/components/nav-tabs"
import { useMediaQuery } from "@/hooks/use-media-query"

// Update the DashboardPage component to properly handle the tab parameter
export default function DashboardPage() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "dashboard"
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg mr-3">
          <DollarSign className="h-6 w-6" />
        </span>
        Household Bill Manager
      </h1>

      <NavTabs />

      <Tabs value={tab} defaultValue={tab} className="mb-8">
        <TabsContent value="dashboard">
          {/* Dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Cards */}
            <Card className="p-6 flex flex-col rounded-xl shadow-md border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-sm text-blue-600 font-medium mb-1 flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Total Due This Month
              </div>
              <div className="text-3xl font-bold text-gray-800">$166.49</div>
              <div className="text-sm text-blue-600 mt-auto">3 bills remaining</div>
            </Card>

            <Card className="p-6 flex flex-col rounded-xl shadow-md border-0 bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-sm text-green-600 font-medium mb-1 flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                Paid This Month
              </div>
              <div className="text-3xl font-bold text-gray-800">$1245.75</div>
              <div className="text-sm text-green-600 mt-auto">2 payments made</div>
            </Card>

            <Card className="p-6 flex flex-col rounded-xl shadow-md border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="text-sm text-purple-600 font-medium mb-1 flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Largest Category
              </div>
              <div className="text-3xl font-bold text-gray-800">Housing</div>
              <div className="text-sm text-purple-600 mt-auto">72% of monthly expenses</div>
            </Card>

            <Card className="p-6 flex flex-col rounded-xl shadow-md border-0 bg-gradient-to-br from-amber-50 to-amber-100">
              <div className="text-sm text-amber-600 font-medium mb-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Upcoming Bills
              </div>
              <div className="text-3xl font-bold text-gray-800">1</div>
              <div className="text-sm text-amber-600 mt-auto">Due in the next 7 days</div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 rounded-xl shadow-md border-0">
              <h2 className="text-xl font-bold mb-1 text-gray-800">Monthly Expenses</h2>
              <div className="text-sm text-gray-500 mb-6">Your spending over the last 6 months</div>
              <div className="h-[300px]">
                <MonthlyExpenses />
              </div>
            </Card>

            <Card className="p-6 rounded-xl shadow-md border-0">
              <h2 className="text-xl font-bold mb-1 text-gray-800">Expense Breakdown</h2>
              <div className="text-sm text-gray-500 mb-6">Current month expenses by category</div>
              <div className="h-[300px]">
                <ExpenseBreakdown />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 rounded-xl shadow-md border-0">
              <h2 className="text-xl font-bold mb-1 text-gray-800">Upcoming Bills</h2>
              <div className="text-sm text-gray-500 mb-6">Bills due in the next 30 days</div>
              <UpcomingBills />
            </Card>

            <Card className="p-6 rounded-xl shadow-md border-0">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1 text-gray-800">Reminders</h2>
                  <div className="text-sm text-gray-500">Your upcoming reminders</div>
                </div>
                <Link href="/reminders">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </Link>
              </div>
              <Reminders />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bills">
          <div className="p-6 rounded-xl shadow-md border-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800">Bills</h2>
              <Link href="/bills/add">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="h-4 w-4 mr-1" /> Add Bill
                </Button>
              </Link>
            </div>
            <BillsTable />
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="p-6 rounded-xl shadow-md border-0">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Payment History</h2>
            <BillsTable showDelete={false} />
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="p-6 rounded-xl shadow-md border-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800">Documents</h2>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Upload className="h-4 w-4 mr-1" /> Upload
              </Button>
            </div>
            <DocumentsUpload />
          </div>
        </TabsContent>

        <TabsContent value="budget">
          <div className="p-6 rounded-xl shadow-md border-0">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Budget</h2>
            <BudgetOverview />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

