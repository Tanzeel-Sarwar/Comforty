"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAdminAuth() {
  const router = useRouter()

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"
    const loginTime = Number.parseInt(localStorage.getItem("adminLoginTime") || "0", 10)
    const currentTime = Date.now()
    const oneDay = 24 * 60 * 60 * 1000 // milliseconds in a day

    if (!isAdminLoggedIn || currentTime - loginTime >= oneDay) {
      router.push("/admin/login")
    }
  }, [router])
}

