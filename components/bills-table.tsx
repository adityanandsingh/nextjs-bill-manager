"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { CreditCard, Search, Trash2 } from "lucide-react"

interface BillsTableProps {
  showDelete?: boolean
}

export function BillsTable({ showDelete = true }: BillsTableProps) {
  const [bills, setBills] = useState([
    {
      id: 1,
      name: "Electricity",
      amount: 125.5,
      dueDate: new Date(2023, 5, 15),
      category: "Utilities",
      status: "pending",
    },
    { id: 2, name: "Rent", amount: 1200.0, dueDate: new Date(2023, 5, 1), category: "Housing", status: "paid" },
    {
      id: 3,
      name: "Internet",
      amount: 79.99,
      dueDate: new Date(2023, 5, 22),
      category: "Utilities",
      status: "pending",
    },
    { id: 4, name: "Phone", amount: 65.0, dueDate: new Date(2023, 5, 18), category: "Utilities", status: "pending" },
    {
      id: 5,
      name: "Netflix",
      amount: 15.99,
      dueDate: new Date(2023, 5, 10),
      category: "Subscriptions",
      status: "paid",
    },
    {
      id: 6,
      name: "Gym Membership",
      amount: 45.0,
      dueDate: new Date(2023, 5, 5),
      category: "Subscriptions",
      status: "paid",
    },
    {
      id: 7,
      name: "Car Insurance",
      amount: 120.0,
      dueDate: new Date(2023, 5, 28),
      category: "Insurance",
      status: "pending",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [billToDelete, setBillToDelete] = useState<number | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Load bills from localStorage on component mount
  useEffect(() => {
    const storedBills = localStorage.getItem("bills")
    if (storedBills) {
      try {
        const parsedBills = JSON.parse(storedBills)
        // Convert string dates back to Date objects
        const processedBills = parsedBills.map((bill) => ({
          ...bill,
          dueDate: new Date(bill.dueDate),
        }))
        setBills([...processedBills, ...bills])
      } catch (error) {
        console.error("Error parsing bills from localStorage:", error)
      }
    }
  }, [])

  const confirmDeleteBill = () => {
    if (billToDelete === null) return

    const billName = bills.find((bill) => bill.id === billToDelete)?.name || "Bill"
    const updatedBills = bills.filter((bill) => bill.id !== billToDelete)
    setBills(updatedBills)

    // Update localStorage
    localStorage.setItem("bills", JSON.stringify(updatedBills))

    toast({
      title: "Bill deleted",
      description: `${billName} has been removed from your bills.`,
      className: "bg-amber-50 border-amber-200 text-amber-800",
    })

    // Reset state
    setBillToDelete(null)
    setShowDeleteDialog(false)
  }

  const markAsPaid = (id: number, name: string) => {
    const updatedBills = bills.map((bill) => (bill.id === id ? { ...bill, status: "paid" } : bill))
    setBills(updatedBills)

    // Update localStorage
    localStorage.setItem("bills", JSON.stringify(updatedBills))

    toast({
      title: "Bill marked as paid",
      description: `${name} has been marked as paid.`,
      className: "bg-green-50 border-green-200 text-green-800",
    })
  }

  const filteredBills = bills.filter(
    (bill) =>
      bill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bills..."
            className="pl-8 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Card className="rounded-xl shadow-md border-0 overflow-hidden">
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                <TableHead className="font-semibold text-gray-700">Due Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Category</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                    No bills found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredBills.map((bill) => (
                  <TableRow key={bill.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">
                      <Link href={`/bills/${bill.id}`} className="hover:underline">
                        {bill.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-gray-700">${bill.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-700">{format(bill.dueDate, "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-gray-700">{bill.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant={bill.status === "paid" ? "outline" : "default"}
                        className={
                          bill.status === "paid" ? "bg-green-100 text-green-700 hover:bg-green-200 border-0" : ""
                        }
                      >
                        {bill.status === "paid" ? "Paid" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {bill.status !== "paid" && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => markAsPaid(bill.id, bill.name)}
                            className="hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                          >
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        )}
                        {showDelete && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setBillToDelete(bill.id)
                              setShowDeleteDialog(true)
                            }}
                            className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Separate AlertDialog outside of the map function */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-xl shadow-lg border-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-800">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              This will delete the bill. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => {
                setBillToDelete(null)
                setShowDeleteDialog(false)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteBill} className="rounded-lg bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

