"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { useSelector } from "react-redux";
import { selectCurrent } from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

type CardProps = React.ComponentProps<typeof Card>;

export function FeedCard({ className, ...props }: CardProps) {
  const current = useSelector(selectCurrent);

  if (!current) return null;

  const { name, email, avatarUrl, id } = current;

  return (
    <Card className={cn("hidden md:block", className)} {...props}>
      <CardHeader className="p-4 xl:p-6">
        <Image
          className="rounded-md"
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${avatarUrl}`}
          width={370}
          height={370}
          alt="Avatar"
        />
      </CardHeader>
      <CardContent className="grid gap-2 p-4 xl:p-6 pt-0 xl:pt-0">
        <Link href={`/user/${id}`}>
          <Button className="w-full" variant="outline">Войти в профиль</Button>
        </Link>
        <p>{name}</p>
        <p className="flex items-center gap-2">
          <Mail /> {email}
        </p>
      </CardContent>
    </Card>
  );
}
