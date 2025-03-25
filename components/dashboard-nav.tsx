"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, BellRing, CreditCard, Home, Settings } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      <Link href="/">
        <Button variant={pathname === "/" ? "default" : "ghost"} className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/bills">
        <Button variant={pathname.includes("/bills") ? "default" : "ghost"} className="w-full justify-start">
          <CreditCard className="mr-2 h-4 w-4" />
          Bills
        </Button>
      </Link>
      <Link href="/reminders">
        <Button variant={pathname.includes("/reminders") ? "default" : "ghost"} className="w-full justify-start">
          <BellRing className="mr-2 h-4 w-4" />
          Reminders
        </Button>
      </Link>
      <Link href="/reports">
        <Button variant={pathname.includes("/reports") ? "default" : "ghost"} className="w-full justify-start">
          <BarChart3 className="mr-2 h-4 w-4" />
          Reports
        </Button>
      </Link>
      <Link href="/settings">
        <Button variant={pathname.includes("/settings") ? "default" : "ghost"} className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </Link>
    </nav>
  )
}

