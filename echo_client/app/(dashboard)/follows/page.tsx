"use client";
import { selectCurrent } from "@/features/user/userSlice";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/card";
import { UserCard } from "@/entities/user/ui/UserCard";
import { GoBack } from "@/features/user/ui/GoBack";

export default function FollowsPage() {
  const currentUser = useSelector(selectCurrent);

  if (!currentUser) {
    return null;
  }

  return currentUser && currentUser.following.length > 0 ? (
    <div className="container px-0">
      <GoBack clasName="mb-5" />
      {currentUser.following.map((user) => {
        console.log(user);
        return (
          <Link href={`/user/${user.following.id}`} key={user.following.id}>
            <Card className="p-0 mb-3 xl:max-w-[1260px]">
              <CardContent className="p-3 md:p-5">
                <UserCard
                  className="p-0"
                  name={user.following.name ?? ""}
                  avatarUrl={user.following.avatarUrl ?? ""}
                  description={user.following.email ?? ""}
                />
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  ) : (
    <h2>Вы не подписаны ни на кого</h2>
  );
}
