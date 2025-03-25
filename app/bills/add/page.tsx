"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Plus, DollarSign, ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { NavTabs } from "@/components/nav-tabs"

const billFormSchema = z.object({
  name: z.string().min(2, {
    message: "Bill name must be at least 2 characters.",
  }),
  amount: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val)
      return !isNaN(num) && num > 0
    },
    {
      message: "Amount must be a positive number.",
    },
  ),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().optional(),
  recurring: z.boolean().default(false),
  recurringInterval: z.string().optional(),
})

type BillFormValues = z.infer<typeof billFormSchema>

const defaultValues: Partial<BillFormValues> = {
  name: "",
  amount: "",
  description: "",
  recurring: false,
  recurringInterval: "monthly",
}

export default function AddBillPage() {
  const router = useRouter()
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [categories, setCategories] = useState([
    "Housing",
    "Utilities",
    "Internet & Phone",
    "Insurance",
    "Subscriptions",
    "Transportation",
    "Other",
  ])

  const form = useForm<BillFormValues>({
    resolver: zodResolver(billFormSchema),
    defaultValues,
  })

  function onSubmit(data: BillFormValues) {
    // In a real app, you would save this data to your database
    console.log(data)

    // Add the bill to localStorage for persistence between pages
    const existingBills = JSON.parse(localStorage.getItem("bills") || "[]")
    const newBill = {
      id: Math.max(0, ...existingBills.map((b) => b.id)) + 1,
      name: data.name,
      amount: Number.parseFloat(data.amount),
      dueDate: data.dueDate,
      category: data.category,
      status: "pending",
      description: data.description,
      recurring: data.recurring,
      recurringInterval: data.recurringInterval,
    }

    localStorage.setItem("bills", JSON.stringify([newBill, ...existingBills]))

    toast({
      title: "Bill added successfully",\
        ...existingBills]))
    
    toast({
      title: "Bill added successfully",
      description: `${data.name} has been added to your bills.`,
      className: "bg-green-50 border-green-200 text-green-800",
    })

    router.push("/bills")
  }

  function addNewCategory() {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()])
      setNewCategory("")
      setIsAddingCategory(false)
      toast({
        title: "Category added",
        description: `${newCategory} has been added to your categories.`,
        className: "bg-green-50 border-green-200 text-green-800",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg mr-3">
          <DollarSign className="h-6 w-6" />
        </span>
        Household Bill Manager
      </h1>

      <NavTabs />

      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push("/bills")}
          className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Bills
        </Button>

        <Card className="p-8 rounded-xl shadow-md border-0">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Bill</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Bill Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter bill name"
                        {...field}
                        className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          placeholder="0.00"
                          {...field}
                          className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pl-8"
                          onChange={(e) => {
                            const value = e.target.value
                            if (value === "" || (/^\d*\.?\d*$/.test(value) && Number.parseFloat(value || "0") >= 0)) {
                              field.onChange(value)
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-amber-600 text-sm">
                      Negative values are not allowed.
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal rounded-lg border-gray-300",
                              !field.value && "text-gray-500",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-lg shadow-lg" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          className="rounded-lg"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Category</FormLabel>
                    <div className="flex space-x-2">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-lg shadow-lg">
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-lg border-gray-300 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-xl shadow-lg border-0">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800">Add New Category</DialogTitle>
                            <DialogDescription className="text-gray-500">
                              Create a new category for your bills.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="new-category" className="text-gray-700">
                                Category Name
                              </Label>
                              <Input
                                id="new-category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Enter category name"
                                className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsAddingCategory(false)}
                              className="rounded-lg text-gray-600 hover:bg-gray-100"
                            >
                              Cancel
                            </Button>
                            <Button onClick={addNewCategory} className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
                              Add Category
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional details about this bill"
                        className="resize-none rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recurring"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base text-gray-800">Recurring Bill</FormLabel>
                      <FormDescription className="text-gray-500">
                        Set this bill to repeat automatically.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-indigo-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("recurring") && (
                <FormField
                  control={form.control}
                  name="recurringInterval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Recurring Interval</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                            <SelectValue placeholder="Select interval" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-lg shadow-lg">
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => router.push("/bills")}
                  className="rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button type="submit" className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
                  Add Bill
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}

