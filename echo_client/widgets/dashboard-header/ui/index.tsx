"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  MessageSquareText,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  SquareUserRound,
  Upload,
  Users,
  Users2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Input } from "@/components/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/tooltip";
import { NavPanel } from "@/features/user/ui/NavPanel";
import { ModeToggle } from "@/components/modeToggler";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrent } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast/use-toast";
import { ToastAction } from "@/components/toast/toast";

export const DashboardHeader = () => {
  const currentUser = useSelector(selectCurrent);
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="sticky xl:w-full xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1218px] top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 xl:px-3 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid  gap-6 text-lg font-medium">
            <Link
              href="/feed"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <MessageSquareText className="h-5 w-5" />
              Посты
            </Link>
            <Link
              href="/follows"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <SquareUserRound className="h-5 w-5" />
              Подписки
            </Link>
            <Link
              href="/followers"
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <Package className="h-5 w-5" />
              Подписчики
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          onInput={() => {
            toast({
              description: "This feature is under development",
            });
          }}
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            {currentUser?.avatarUrl && (
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${currentUser?.avatarUrl}`}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push(`/user/${currentUser?.id}`)}>Войти в профиль</DropdownMenuItem>
          <DropdownMenuItem>Настройки</DropdownMenuItem>
          <DropdownMenuItem>О нас</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Выйти</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
