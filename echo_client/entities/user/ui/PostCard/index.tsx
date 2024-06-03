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
import { useLikePostMutation, useUnlikePostMutation } from "@/lib/servicies/likesApi";
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
import {
  Heart,
  HeartOff,
  LoaderCircle,
  MessageCircleMore,
  Trash2,
} from "lucide-react";
import { MetaInfo } from "../metaInfo";

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
  const [unlikePost] = useUnlikePostMutation();
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
      console.log('likedByUser', likedByUser)
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
    <Card className={cn("", className)} {...props}>
      <CardHeader className="flex flex-row justify-between">
        <UserHeader avatarUrl={avatarUrl} name={name} authorId={authorId} />
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Button className="px-2.5" variant="outline">
                <Trash2 />
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-default-500">{content}</p>
      </CardContent>
      <CardFooter>
        {cardFor !== "comment" && (
          <div className="flex flex-row gap-2">
            <div onClick={handleClick}>
              <MetaInfo
                count={likesCount}
                Icon={() =>
                  likedByUser ? <HeartOff color="#dc0404" /> : <Heart />
                }
              />
            </div>
            <Link href={`/current-post/${id}`}>
              <MetaInfo
                count={commentsCount}
                Icon={() => <MessageCircleMore />}
              />
            </Link>
          </div>
        )}
        {/* доделать сообщение об ошибке {error && <p>{error}</p>} */}
      </CardFooter>
    </Card>
  );
}
