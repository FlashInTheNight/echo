"use client";
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
    <div className="mx-auto w-full grid max-w-[59rem] flex-1 auto-rows-max gap-4">
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
