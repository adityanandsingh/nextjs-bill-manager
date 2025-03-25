"use client"

import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/use-media-query"

export function NavTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 640px)")

  // Determine which tab should be active based on the current path
  const getActiveTab = () => {
    if (pathname.includes("/bills")) return "bills"
    if (pathname.includes("/history")) return "history"
    if (pathname.includes("/documents")) return "documents"
    if (pathname.includes("/budget")) return "budget"
    if (pathname.includes("/reminders")) return "reminders"
    return "dashboard"
  }

  // Update the handleTabChange function to ensure it properly routes to the correct tabs
  const handleTabChange = (value: string) => {
    switch (value) {
      case "dashboard":
        router.push("/")
        break
      case "bills":
        router.push("/bills")
        break
      case "history":
        router.push("/?tab=history")
        break
      case "documents":
        router.push("/?tab=documents")
        break
      case "budget":
        router.push("/?tab=budget")
        break
      case "reminders":
        router.push("/reminders")
        break
      default:
        router.push("/")
    }
  }

  return (
    <Tabs defaultValue={getActiveTab()} className="mb-8" onValueChange={handleTabChange}>
      <TabsList
        className={`grid ${isMobile ? "grid-cols-3" : "grid-cols-6"} w-full bg-gray-100 rounded-xl p-1 shadow-sm`}
      >
        <TabsTrigger
          value="dashboard"
          className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="bills" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Bills
        </TabsTrigger>
        <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          History
        </TabsTrigger>
        {isMobile ? null : (
          <TabsTrigger
            value="documents"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Documents
          </TabsTrigger>
        )}
        {isMobile ? null : (
          <TabsTrigger value="budget" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Budget
          </TabsTrigger>
        )}
        {isMobile ? null : (
          <TabsTrigger
            value="reminders"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Reminders
          </TabsTrigger>
        )}
      </TabsList>
    </Tabs>
  )
}

