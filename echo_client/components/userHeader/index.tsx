import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { formatToClientDate } from "@/utils/format-to-client-date";
import { cn } from "@/lib/utils"

type Props = {
  authorId: string;
  name: string;
  className?: string;
  avatarUrl: string;
  authorDate?: Date;
};

export const UserHeader = ({
  authorId = "",
  name = "",
  className = "",
  avatarUrl = "",
  authorDate = undefined,
}: Props) => {
  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <Link href={`/user/${authorId}`}>
        <Avatar>
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${avatarUrl}`}
          />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </Link>
      <div>
        <p className="font-semibold leading-none">{name}</p>
        <p className="text-xs text-slate-500">4444{authorDate && formatToClientDate(authorDate) }</p>
      </div>
    </div>
  );
};
