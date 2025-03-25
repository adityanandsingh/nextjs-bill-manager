"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { FileIcon, Trash2, Upload } from "lucide-react"
import { format } from "date-fns"

export function DocumentsUpload() {
  const [documents, setDocuments] = useState([
    { id: 1, name: "May_2023_Bill.pdf", date: new Date(2023, 4, 5), size: "245 KB", type: "pdf" },
    { id: 2, name: "April_2023_Bill.pdf", date: new Date(2023, 3, 5), size: "240 KB", type: "pdf" },
    { id: 3, name: "March_2023_Bill.pdf", date: new Date(2023, 2, 5), size: "238 KB", type: "pdf" },
    { id: 4, name: "February_2023_Bill.pdf", date: new Date(2023, 1, 5), size: "242 KB", type: "pdf" },
  ])
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setShowConfirmation(true)
  }

  const confirmUpload = () => {
    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      const fileType = file?.name.split(".").pop() || "pdf"
      const fileSize = `${Math.floor(Math.random() * 100) + 150} KB`

      const newDocument = {
        id: Math.max(...documents.map((doc) => doc.id), 0) + 1,
        name: file?.name || "Unknown file",
        date: new Date(),
        size: fileSize,
        type: fileType,
      }

      setDocuments([newDocument, ...documents])
      setIsUploading(false)
      setFile(null)
      setShowConfirmation(false)

      toast({
        title: "File uploaded",
        description: "Your file has been uploaded successfully.",
        className: "bg-green-50 border-green-200 text-green-800",
      })

      // Reset the file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) {
        fileInput.value = ""
      }
    }, 1500)
  }

  const confirmDelete = () => {
    if (documentToDelete !== null) {
      const docToDelete = documents.find((doc) => doc.id === documentToDelete)
      setDocuments(documents.filter((doc) => doc.id !== documentToDelete))
      setShowDeleteConfirmation(false)
      setDocumentToDelete(null)

      toast({
        title: "Document deleted",
        description: `${docToDelete?.name} has been deleted.`,
        className: "bg-amber-50 border-amber-200 text-amber-800",
      })
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileIcon className="h-5 w-5 text-red-500" />
      case "jpg":
      case "jpeg":
      case "png":
        return <FileIcon className="h-5 w-5 text-blue-500" />
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid w-full gap-4">
        <Card className="p-6 rounded-xl shadow-md border-0">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="file-upload" className="text-gray-700 font-medium">
              Upload Receipt or Document
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <Button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isUploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Accepted file types: PDF, JPG, JPEG, PNG</p>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Uploaded Documents</h3>
          {documents.length === 0 ? (
            <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-xl">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No documents found</p>
              <p className="text-sm">Upload a document to get started</p>
            </div>
          ) : (
            documents.map((doc) => (
              <Card key={doc.id} className="p-4 rounded-xl shadow-sm border-0 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(doc.type)}
                    <div>
                      <div className="text-sm font-medium text-gray-800">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {doc.size} • Uploaded {format(doc.date, "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                    onClick={() => {
                      setDocumentToDelete(doc.id)
                      setShowDeleteConfirmation(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="rounded-xl shadow-lg border-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-800">Confirm Upload</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              Are you sure you want to upload {file?.name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg text-gray-600 hover:bg-gray-100">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmUpload} className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
              Upload
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <AlertDialogContent className="rounded-xl shadow-lg border-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-800">Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              Are you sure you want to delete this document? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg text-gray-600 hover:bg-gray-100">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="rounded-lg bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

