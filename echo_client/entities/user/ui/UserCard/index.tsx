import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";

type Props = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
};

export function UserCard({
  className = "",
  name = "",
  description = "",
  avatarUrl = "",
}: Props) {
  return (
    <div className={cn("", className)}>
      <Avatar>
        <AvatarImage src={`${process.env.NEXT_PUBLIC_BASE_URL}${avatarUrl}`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}
