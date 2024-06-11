import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { CountInfo } from "@/components/countInfo";
import { ProfileInfo } from "@/components/ProfileInfo";
import { formatToClientDate } from "@/utils/format-to-client-date";

type Props = {
  email: string;
  location?: string;
  dateOfBirth: Date | undefined;
  bio?: string;
  followers?: number;
  following?: number;
};

export default function ProfileBlock({
  email = "",
  location = "",
  dateOfBirth = undefined,
  bio = "",
  followers = 0,
  following = 0,
}: Props) {
  return (
    <Card className="max-w-80 lg:max-w-none lg:w-full xl:max-w-[74ch]">
      <CardContent>
        <ProfileInfo title="Почта:" info={email} />
        <ProfileInfo title="Местоположение:" info={location} />
        <ProfileInfo
          title="Дата рождения:"
          info={formatToClientDate(dateOfBirth)}
        />
        <ProfileInfo title="Обо мне:" info={bio} />
      </CardContent>
      <CardFooter className="justify-between lg:justify-start">
        <CountInfo count={followers} title="Подписчики" />
        <CountInfo count={following} title="Подписки" />
      </CardFooter>
    </Card>
  );
}
