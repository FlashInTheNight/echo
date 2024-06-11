"use client";
import { FeedCard } from "@/entities/user/ui/FeedCard";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectCurrent,
  selectIsAuthenticated,
  selectUser,
} from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CreatePostForm } from "@/features/user/ui/CreatePostForm";
import { useGetAllPostsQuery } from "@/lib/servicies/postsApi";
import { PostCard } from "@/entities/user/ui/PostCard";
import Link from "next/link";

export function DashboardPage() {
  // const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const current = useSelector(selectCurrent);
  const { data } = useGetAllPostsQuery();
  const router = useRouter();

  const { id } = current ?? {};

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, []);

  if (!current) return null;
  return (
    <div className="mx-auto w-full grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        {/* first block */}
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
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
          <FeedCard />
        </div>
      </div>
    </div>
  );
}
