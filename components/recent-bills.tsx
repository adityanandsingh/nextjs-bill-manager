"use client"

import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export function RecentBills() {
  const bills = [
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
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell className="font-medium">
                <Link href={`/bills/${bill.id}`} className="hover:underline">
                  {bill.name}
                </Link>
              </TableCell>
              <TableCell>${bill.amount.toFixed(2)}</TableCell>
              <TableCell>{format(bill.dueDate, "MMM d, yyyy")}</TableCell>
              <TableCell>{bill.category}</TableCell>
              <TableCell>
                <Badge variant={bill.status === "paid" ? "outline" : "default"}>
                  {bill.status === "paid" ? "Paid" : "Pending"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

