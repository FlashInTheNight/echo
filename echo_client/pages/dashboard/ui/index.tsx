"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/badge";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Textarea } from "@/components/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/tooltip";
import { FeedCard } from "@/entities/user/ui/FeedCard";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CreatePostForm } from "@/features/user/ui/CreatePostForm";
import { useGetAllPostsQuery } from "@/lib/servicies/postsApi";
import { PostCard } from "@/entities/user/ui/PostCard";

export function DashboardPage() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  const { data } = useGetAllPostsQuery();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, []);

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        {/* first block */}
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          {/* обернуть в отдельный компонент */}
          <div className="grid w-full gap-2">
            <CreatePostForm />
          </div>
          {data && data.length > 0
            ? data.map(
                ({
                  content,
                  author,
                  id,
                  authorId,
                  comments,
                  likes,
                  likedByUser,
                  createdAt,
                }) => (
                  <PostCard
                    key={id}
                    avatarUrl={author.avatarUrl ?? ""}
                    content={content}
                    name={author.name ?? ""}
                    likesCount={likes.length}
                    commentsCount={comments.length}
                    authorId={authorId}
                    id={id}
                    likedByUser={likedByUser}
                    createdAt={createdAt}
                    cardFor="post"
                  />
                )
              )
            : null}
        </div>
        {/* second block */}
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          {!user && <FeedCard />}
        </div>
      </div>
    </div>
  );
}
