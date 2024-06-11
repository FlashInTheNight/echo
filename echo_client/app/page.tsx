import { AuthenticationPage } from "@/pages/Authentication/ui"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthRoute() {
  return <AuthenticationPage />
}