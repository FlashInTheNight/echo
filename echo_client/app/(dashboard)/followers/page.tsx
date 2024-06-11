"use client";
import { selectCurrent } from "@/features/user/userSlice";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { UserCard } from "@/entities/user/ui/UserCard";
import { GoBack } from "@/features/user/ui/GoBack";

export default function FollowersPage() {
  const currentUser = useSelector(selectCurrent);

  if (!currentUser) {
    return null;
  }

  return currentUser && currentUser.followers.length > 0 ? (
    <div className="container px-0">
      <GoBack clasName="mb-5" />
      {currentUser.followers.map((user) => (
        <Link href={`/user/${user.follower.id}`} key={user.follower.id}>
          <Card className="p-0 mb-3 xl:max-w-[1260px]">
            <CardContent className="p-3 md:p-5">
              <UserCard
                className="p-0"
                name={user.follower.name ?? ""}
                avatarUrl={user.follower.avatarUrl ?? ""}
                description={user.follower.email ?? ""}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>У вас нет подписчиков</h2>
  );
}
