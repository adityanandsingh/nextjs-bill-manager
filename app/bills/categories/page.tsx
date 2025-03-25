"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Utilities", count: 5 },
    { id: 2, name: "Rent/Mortgage", count: 1 },
    { id: 3, name: "Insurance", count: 3 },
    { id: 4, name: "Subscriptions", count: 8 },
    { id: 5, name: "Phone/Internet", count: 2 },
    { id: 6, name: "Groceries", count: 0 },
    { id: 7, name: "Transportation", count: 1 },
    { id: 8, name: "Other", count: 4 },
  ])
  const [newCategory, setNewCategory] = useState("")

  const addCategory = () => {
    if (newCategory.trim() === "") {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      })
      return
    }

    if (categories.some((cat) => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      toast({
        title: "Error",
        description: "Category already exists",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...categories.map((c) => c.id), 0) + 1
    setCategories([...categories, { id: newId, name: newCategory.trim(), count: 0 }])
    setNewCategory("")
    toast({
      title: "Category added",
      description: `${newCategory} has been added to your categories.`,
    })
  }

  const deleteCategory = (id: number, name: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
    toast({
      title: "Category deleted",
      description: `${name} has been removed from your categories.`,
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Bill Categories" text="Manage your bill categories.">
        <Link href="/bills/add">
          <Button>Add Bill</Button>
        </Link>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.count} bills</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" className="ml-auto">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will delete the "{category.name}" category. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteCategory(category.id, category.name)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
            <CardDescription>Create a new category for your bills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <div className="flex space-x-2">
                  <Input
                    id="name"
                    placeholder="Enter category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addCategory()
                      }
                    }}
                  />
                  <Button size="icon" onClick={addCategory}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

