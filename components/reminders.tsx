"use client"

import { BellIcon, Trash2 } from "lucide-react"
import { useState } from "react"
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
import { Button } from "@/components/ui/button"

export function Reminders() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Pay Internet Bill",
      description: "Don't forget to pay the internet bill",
      date: "Mar 27, 2025",
    },
    {
      id: 2,
      title: "Call Insurance Company",
      description: "Discuss the new policy options",
      date: "Mar 30, 2025",
    },
  ])
  const [reminderToDelete, setReminderToDelete] = useState<number | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

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
    <div className="space-y-5">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="flex items-start justify-between gap-4 border-b pb-5 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-amber-100 p-2 rounded-full text-amber-600 group-hover:bg-amber-200 transition-colors">
              <BellIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-gray-800 text-lg">{reminder.title}</div>
              <div className="text-sm text-gray-500">{reminder.description}</div>
              <div className="text-sm text-gray-500 mt-2 font-medium">{reminder.date}</div>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0"
            onClick={() => {
              setReminderToDelete(reminder.id)
              setShowDeleteDialog(true)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {reminders.length === 0 && (
        <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">
          <BellIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No reminders</p>
          <p className="text-sm">Add a reminder to get started</p>
        </div>
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-xl shadow-lg border-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-800">Delete Reminder</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              Are you sure you want to delete this reminder? This action cannot be undone.
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

