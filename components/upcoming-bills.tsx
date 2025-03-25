"use client"

import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

export function UpcomingBills() {
  const [bills, setBills] = useState([
    {
      id: 1,
      name: "Internet",
      dueDate: "Mar 27, 2025",
      category: "Internet & Phone",
      amount: 65.0,
      daysLeft: 2,
      paid: false,
    },
    {
      id: 2,
      name: "Car Insurance",
      dueDate: "Apr 5, 2025",
      category: "Insurance",
      amount: 120.0,
      daysLeft: 11,
      paid: false,
    },
  ])

  const handlePayNow = (id: number) => {
    setBills(bills.map((bill) => (bill.id === id ? { ...bill, paid: true } : bill)))

    const bill = bills.find((b) => b.id === id)
    if (bill) {
      toast({
        title: "Payment successful",
        description: `${bill.name} has been marked as paid.`,
        className: "bg-green-50 border-green-200 text-green-800",
      })
    }
  }

  return (
    <div className="space-y-5">
      {bills.map((bill) => (
        <div
          key={bill.id}
          className="flex items-center justify-between border-b pb-5 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-blue-100 p-2 rounded-full text-blue-600 group-hover:bg-blue-200 transition-colors">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-gray-800 text-lg">{bill.name}</div>
              <div className="text-sm text-gray-500">Due {bill.dueDate}</div>
              <div className="mt-2">
                <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 font-medium">
                  {bill.category}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-800 text-lg">${bill.amount.toFixed(2)}</div>
            <Badge
              variant={bill.daysLeft <= 3 ? "destructive" : "outline"}
              className={`mt-2 ${bill.daysLeft <= 3 ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-green-100 text-green-600 hover:bg-green-200"}`}
            >
              {bill.paid ? "Paid" : `${bill.daysLeft} days`}
            </Badge>
            <div className="mt-2">
              {!bill.paid && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => handlePayNow(bill.id)}
                >
                  Pay Now
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

