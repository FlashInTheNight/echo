'use client'
import { selectCurrent } from "@/features/user/userSlice";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
} from "@/components/card";
import { UserCard } from "@/entities/user/ui/UserCard";

export default function FollowsPage() {
  const currentUser = useSelector(selectCurrent);

  if (!currentUser) {
    return null
  }

  return currentUser && currentUser.following.length > 0 ? (
    <div>
      {currentUser.following.map((user) => (
        <Link href={`/user/${user.id}`} key={user.following.id}>
          <Card>
            <CardContent>
              <UserCard
                name={user.following.name ?? ""}
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.email ?? ""}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>Вы не подписаны ни на кого</h2>
  );
}
