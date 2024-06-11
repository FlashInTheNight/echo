"use client";
import { ProfileCard } from "@/entities/user/ui/ProfileCard";
import ProfileBlock from "@/entities/user/ui/ProfileBlock";
import {
  current,
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "@/lib/servicies/userApi";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, selectCurrent } from "@/features/user/userSlice";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import Image from "next/image";
import { Button } from "@/components/button";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/lib/servicies/followApi";
import { EditProfile } from "@/features/user/ui/EditProfile";
import { GoBack } from "@/features/user/ui/GoBack";

export default function Page({ params }: { params: { id: string } }) {
  const { data } = useGetUserByIdQuery(params.id);
  console.log('id', params.id)
  console.log('data', data)
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrent);
  const [followUser] = useFollowUserMutation();
  const [unfolowUser] = useUnfollowUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  useEffect(() => {
    dispatch(resetUser());
  }, []);

  if (!data) {
    return null;
  }

  const {
    name,
    email,
    location,
    dateOfBirth,
    bio,
    followers,
    following,
    avatarUrl,
    isFollowing,
  } = data;

  const handleFollow = async () => {
    try {
      if (params.id) {
        isFollowing
          ? await unfolowUser({ followingId: params.id }).unwrap()
          : await followUser({ followingId: params.id }).unwrap();

        await triggerGetUserByIdQuery(params.id);

        await triggerCurrentQuery();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <GoBack />
      <div className="flex flex-col md:flex-row gap-5">
        <Card className="max-w-80 lg:max-w-64">
          <CardHeader>
            {avatarUrl && (
              <Image
                className="rounded-md"
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${avatarUrl}`}
                width={370}
                height={370}
                alt={name ? name : "avatar"}
              />
            )}
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-default-500 flex items-center gap-2">{name}</p>
            {/* доделать логику отображения кнопок */}
            {currentUser?.id !== params.id ? (
              <Button variant="outline" onClick={handleFollow}>
                {isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <EditProfile />
            )}
          </CardContent>
        </Card>
        <ProfileBlock
          email={email}
          location={location}
          dateOfBirth={dateOfBirth}
          bio={bio}
          followers={followers?.length}
          following={following?.length}
        />
      </div>
    </>
  );
}
