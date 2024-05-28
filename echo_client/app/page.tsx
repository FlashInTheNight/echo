import { AuthenticationPage } from "@/pages/Authentication/ui"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthRoute() {
  return <AuthenticationPage />
}