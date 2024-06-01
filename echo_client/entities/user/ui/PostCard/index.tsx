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
import { useLikePostMutation } from "@/lib/servicies/likesApi";
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "@/lib/servicies/postsApi";
import { useDeleteCommentMutation } from "@/lib/servicies/commentsApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrent } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserHeader } from "@/components/userHeader";
import { Carter_One } from "next/font/google";

type CardProps = React.ComponentProps<typeof Card>;
type Props = {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor: "comment" | "post" | "current-post";
  likedByUser?: boolean;
};

type PostCardProps = Props & CardProps;

export function PostCard({
  className,
  avatarUrl = "",
  name = "",
  content = "",
  authorId = "",
  id = "",
  likesCount = 0,
  commentsCount = 0,
  cardFor = "post",
  likedByUser = false,
  createdAt,
  commentId = "",
  ...props
}: PostCardProps) {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useLikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState("");
  const currentUser = useSelector(selectCurrent);
  const router = useRouter();

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap();
        break;
      case "current-post":
        await triggerGetAllPosts().unwrap();
        break;
      case "comment":
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error("Неверный аргумент cardFor");
    }
  };

  const handleClick = async () => {
    try {
      likedByUser
        ? await unlikePost({ postId: id }).unwrap()
        : await likePost({ postId: id }).unwrap();

      await refetchPosts();
    } catch (err) {
      // добавить hasErrorField
      console.log("handleClick error", err);
    }
  };

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          // будет ошибка, передеать запрос
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case "current-post":
          await deletePost(id).unwrap();
          router.push("/");
          break;
        case "comment":
          await deleteComment(commentId).unwrap();
          await refetchPosts();
          break;
        default:
          throw new Error("Неверный аргумент cardFor");
      }
    } catch (err) {
      // добавить hasErrorField
      console.log("handleDelete error", err);
    }
  };

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <UserHeader avatarUrl={avatarUrl} name={name} authorId={authorId} />
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <p>Загрузка...</p>
            ) : (
              <p>Удалить</p>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="grid gap-4">
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        {cardFor !== "comment" && (
          <div>
            <Button
              onClick={handleClick}
              variant={likedByUser ? "outline" : "default"}
            >
              likesCount {likesCount}
            </Button>
            
            <Link href={`/current-post/${id}`}>
              <Button variant="default">
                commentsCount {commentsCount}
              </Button>
            </Link>
          </div>
        )}
        {/* доделать сообщение об ошибке {error && <p>{error}</p>} */}
      </CardFooter>
    </Card>
  );
}
