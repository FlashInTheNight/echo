'use client'
import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "../features/user/userSlice"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export const useAuthGuard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/feed")
    }
  }, [])
}
