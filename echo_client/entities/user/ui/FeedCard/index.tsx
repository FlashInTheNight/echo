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

type CardProps = React.ComponentProps<typeof Card>;

export function FeedCard({ className, ...props }: CardProps) {
  const current = useSelector(selectCurrent);

  if (!current) return null;

  const { name, email, avatarUrl, id } = current;

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${avatarUrl}`}
          width={370}
          height={370}
          alt="Avatar"
        />
      </CardHeader>
      <CardContent className="grid gap-4">
        <Link href={`/user/${id}`}>{name}</Link>
        <p className="text-default-500 flex items-center gap-2">{email}</p>
      </CardContent>
    </Card>
  );
}
