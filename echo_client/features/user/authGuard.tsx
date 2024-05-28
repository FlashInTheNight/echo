'use client'
import { useCurrentQuery } from "@/lib/servicies/userApi"
// import { Spinner } from "@nextui-org/react"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return children
}
