import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BillsTable } from "@/components/bills-table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { NavTabs } from "@/components/nav-tabs"
import { DollarSign, Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Bills",
  description: "Manage your bills",
}

export default function BillsPage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg mr-3">
          <DollarSign className="h-6 w-6" />
        </span>
        Household Bill Manager
      </h1>

      <NavTabs />

      <DashboardShell>
        <DashboardHeader heading="Bills" text="Manage your bills and payment history.">
          <Link href="/bills/add">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-1" /> Add Bill
            </Button>
          </Link>
        </DashboardHeader>
        <BillsTable />
      </DashboardShell>
    </div>
  )
}

