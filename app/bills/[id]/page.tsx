"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FileUpload } from "@/components/file-upload"
import { PaymentHistory } from "@/components/payment-history"
import { CreditCard, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function BillDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [bill, setBill] = useState({
    id: params.id,
    name: "Electricity Bill",
    amount: 125.5,
    dueDate: new Date(2023, 5, 15),
    category: "Utilities",
    description: "Monthly electricity bill for 123 Main St.",
    status: "pending",
    recurring: true,
    recurringInterval: "monthly",
    paymentHistory: [
      { id: 1, date: new Date(2023, 4, 15), amount: 118.75, method: "Credit Card" },
      { id: 2, date: new Date(2023, 3, 15), amount: 122.3, method: "Credit Card" },
      { id: 3, date: new Date(2023, 2, 15), amount: 130.45, method: "Bank Transfer" },
    ],
    documents: [
      { id: 1, name: "May_2023_Bill.pdf", date: new Date(2023, 4, 5), size: "245 KB" },
      { id: 2, name: "April_2023_Bill.pdf", date: new Date(2023, 3, 5), size: "240 KB" },
    ],
  })

  const deleteBill = () => {
    // In a real app, you would delete this from your database
    // For now, let's update localStorage
    const existingBills = JSON.parse(localStorage.getItem("bills") || "[]")
    const updatedBills = existingBills.filter((b) => b.id !== Number.parseInt(params.id))
    localStorage.setItem("bills", JSON.stringify(updatedBills))

    toast({
      title: "Bill deleted",
      description: `${bill.name} has been deleted.`,
      className: "bg-amber-50 border-amber-200 text-amber-800",
    })

    router.push("/bills")
  }

  const markAsPaid = () => {
    setBill({
      ...bill,
      status: "paid",
      paymentHistory: [
        { id: bill.paymentHistory.length + 1, date: new Date(), amount: bill.amount, method: "Credit Card" },
        ...bill.paymentHistory,
      ],
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={bill.name} text={`${bill.category} • Due on ${format(bill.dueDate, "PPP")}`}>
        <div className="flex space-x-2">
          <Link href={`/bills/${params.id}/edit`}>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this bill and all associated records. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteBill}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Bill Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex justify-between">
              <div className="text-sm font-medium">Amount</div>
              <div className="text-sm font-bold">${bill.amount.toFixed(2)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm font-medium">Due Date</div>
              <div className="text-sm">{format(bill.dueDate, "PPP")}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm font-medium">Status</div>
              <Badge variant={bill.status === "paid" ? "outline" : "default"}>
                {bill.status === "paid" ? "Paid" : "Pending"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <div className="text-sm font-medium">Recurring</div>
              <div className="text-sm">{bill.recurring ? `Yes (${bill.recurringInterval})` : "No"}</div>
            </div>
            {bill.description && (
              <div className="pt-2">
                <div className="text-sm font-medium">Description</div>
                <div className="text-sm text-muted-foreground">{bill.description}</div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {bill.status !== "paid" && (
              <Button className="w-full" onClick={markAsPaid}>
                <CreditCard className="mr-2 h-4 w-4" /> Mark as Paid
              </Button>
            )}
          </CardFooter>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Bill Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="history">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="history">Payment History</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="history" className="pt-4">
                <PaymentHistory payments={bill.paymentHistory} />
              </TabsContent>
              <TabsContent value="documents" className="pt-4">
                <div className="space-y-4">
                  <div className="grid gap-4">
                    {bill.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-medium">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">{doc.size}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{format(doc.date, "MMM d, yyyy")}</div>
                      </div>
                    ))}
                  </div>
                  <FileUpload />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

