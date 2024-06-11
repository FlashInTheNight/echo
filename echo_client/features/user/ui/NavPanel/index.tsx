"use client";
import { ModeToggle } from "@/components/modeToggler";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/tooltip";
import {
  MessageSquareText,
  Package2,
  Settings,
  SquareUserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavPanel() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0  z-10 w-14 flex-col border-r bg-background sm:flex hidden">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/feed"
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/feed" ? "bg-accent" : ""
                }`}
              >
                <MessageSquareText className="h-5 w-5" />
                <span className="sr-only">Посты</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Посты</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/follows"
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/follows" ? "bg-accent" : ""
                }`}
              >
                <SquareUserRound className="h-5 w-5" />
                <span className="sr-only">Подписки</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Подписки</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/followers"
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/followers" ? "bg-accent" : ""
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="sr-only">Подписчики</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Подписчики</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ModeToggle />
      </nav>
    </aside>
  );
}
