"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
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
import { format } from "date-fns"
import { CalendarIcon, Plus, Trash2, BellRing, DollarSign, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { NavTabs } from "@/components/nav-tabs"

export default function RemindersPage() {
  const router = useRouter()
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Pay Internet Bill",
      description: "Don't forget to pay the internet bill",
      date: new Date(2025, 2, 27),
      method: "email",
    },
    {
      id: 2,
      title: "Call Insurance Company",
      description: "Discuss the new policy options",
      date: new Date(2025, 2, 30),
      method: "email",
    },
  ])
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    date: new Date(),
    method: "email",
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [reminderToDelete, setReminderToDelete] = useState<number | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const addReminder = () => {
    if (newReminder.title.trim() === "") {
      toast({
        title: "Error",
        description: "Reminder title cannot be empty",
        variant: "destructive",
      })
      return
    }

    // Check if date is in the past
    if (newReminder.date < new Date(new Date().setHours(0, 0, 0, 0))) {
      toast({
        title: "Error",
        description: "Reminder date cannot be in the past",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...reminders.map((r) => r.id), 0) + 1
    setReminders([...reminders, { id: newId, ...newReminder }])
    setNewReminder({
      title: "",
      description: "",
      date: new Date(),
      method: "email",
    })
    setShowAddForm(false)
    toast({
      title: "Reminder added",
      description: `Reminder for "${newReminder.title}" has been set for ${format(newReminder.date, "PPP")}.`,
      className: "bg-green-50 border-green-200 text-green-800",
    })
  }

  const confirmDelete = () => {
    if (reminderToDelete === null) return

    const reminderToRemove = reminders.find((r) => r.id === reminderToDelete)
    if (reminderToRemove) {
      setReminders(reminders.filter((r) => r.id !== reminderToDelete))
      toast({
        title: "Reminder deleted",
        description: `Reminder "${reminderToRemove.title}" has been deleted.`,
        className: "bg-amber-50 border-amber-200 text-amber-800",
      })
    }

    setReminderToDelete(null)
    setShowDeleteDialog(false)
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
          onClick={() => router.push("/")}
          className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <BellRing className="h-5 w-5 mr-2 text-amber-500" /> Reminders
          </h2>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-1" /> Add Reminder
          </Button>
        </div>

        {showAddForm && (
          <Card className="p-6 mb-8 rounded-xl shadow-md border-0 bg-gradient-to-br from-amber-50 to-white">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Reminder</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-700">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter reminder title"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  className="rounded-lg border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-700">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Enter reminder description"
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                  className="rounded-lg border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div>
                <Label htmlFor="date" className="text-gray-700">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal rounded-lg border-gray-300",
                        !newReminder.date && "text-gray-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newReminder.date ? format(newReminder.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-lg shadow-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={newReminder.date}
                      onSelect={(date) => date && setNewReminder({ ...newReminder, date })}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                      className="rounded-lg"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="method" className="text-gray-700">
                  Notification Method
                </Label>
                <Select
                  value={newReminder.method}
                  onValueChange={(value) => setNewReminder({ ...newReminder, method: value })}
                >
                  <SelectTrigger
                    id="method"
                    className="rounded-lg border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  >
                    <SelectValue placeholder="Select notification method" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="rounded-lg shadow-lg">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button onClick={addReminder} className="rounded-lg bg-amber-600 hover:bg-amber-700">
                  Add Reminder
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className="p-6 rounded-xl shadow-md border-0 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full text-amber-600 self-start">
                  <BellRing className="h-5 w-5" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800 text-lg">{reminder.title}</h3>
                  <p className="text-sm text-gray-500">{reminder.description}</p>
                  <p className="text-sm font-medium text-amber-600 mt-2">{format(reminder.date, "MMM d, yyyy")}</p>
                  <p className="text-xs text-gray-500 mt-1">Notification: {reminder.method}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 text-gray-400 hover:text-red-500 hover:bg-red-50 self-start mt-0 sm:mt-0"
                  onClick={() => {
                    setReminderToDelete(reminder.id)
                    setShowDeleteDialog(true)
                  }}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}

          {reminders.length === 0 && (
            <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-xl">
              <BellRing className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No reminders found</p>
              <p className="text-sm">Add a reminder to get started</p>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-xl shadow-lg border-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-800">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              This will delete the reminder. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => {
                setReminderToDelete(null)
                setShowDeleteDialog(false)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="rounded-lg bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

