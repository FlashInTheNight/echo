"use client";

import { PostCard } from "@/entities/user/ui/PostCard";
import { CreateComment } from "@/features/user/ui/CreateComment";
import { useGetPostByIdQuery } from "@/lib/servicies/postsApi";

export default function CurrentPost({ params }: { params: { id: string } }) {
  const { data } = useGetPostByIdQuery(params?.id ?? "");

  if (!data) {
    return <h2>Поста не существует</h2>;
  }

  const {
    content,
    id,
    authorId,
    comments,
    likes,
    author,
    likedByUser,
    createdAt,
  } = data;

  return (
    <>
      {/* кнопка назад */}
      <PostCard
        cardFor="current-post"
        avatarUrl={author?.avatarUrl ?? ""}
        content={content}
        name={author?.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments?.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <CreateComment />
      {data.comments
          ? data.comments.map((comment) => (
              <PostCard
                cardFor="comment"
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.name ?? ""}
                authorId={comment.userId}
                commentId={comment.id}
                id={id}
              />
            ))
          : null}
    </>
  );
}
