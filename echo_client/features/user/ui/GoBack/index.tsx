'use client'
import { Button } from "@/components/button"
import { cn } from "@/lib/utils"
import { CircleArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {
  clasName?: string
}

export const GoBack = ({clasName = ''}: Props) => {
  const router = useRouter()
  return (
    <Button onClick={() => router.back()} className={cn(clasName, 'rounded-2xl w-min h-min px-2 py-1')} variant="secondary"><CircleArrowLeft /> назад</Button>
  )
}