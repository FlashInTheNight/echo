'use client'
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

export default function FollowersPage() {
  const currentUser = useSelector(selectCurrent);

  if (!currentUser) {
    return null
  }

  return currentUser && currentUser.followers.length > 0 ? (
    <div>
      {currentUser.followers.map((user) => (
        <Link href={`/user/${user.id}`} key={user.follower.id}>
          <Card>
            <CardContent>
              <UserCard
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
