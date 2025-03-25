"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Payment {
  id: number
  date: Date
  amount: number
  method: string
}

interface PaymentHistoryProps {
  payments: Payment[]
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  return (
    <Card className="rounded-xl shadow-md border-0 overflow-hidden">
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Date</TableHead>
              <TableHead className="font-semibold text-gray-700">Amount</TableHead>
              <TableHead className="font-semibold text-gray-700">Method</TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                  No payment history found.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-700">{format(payment.date, "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-gray-700">${payment.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-gray-700">
                    <div className="flex items-center">
                      {payment.method === "Credit Card" ? (
                        <span className="inline-flex items-center">
                          <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path>
                          </svg>
                          {payment.method}
                        </span>
                      ) : (
                        <span className="inline-flex items-center">
                          <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path>
                          </svg>
                          {payment.method}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-200 border-0">
                      Completed
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

