import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { CountInfo } from "@/components/countInfo";

type Props = {
  email: string;
  location?: string;
  dateOfBirth: Date | undefined;
  bio?: string;
  followers?: number;
  following?: number;
};

import { ProfileInfo } from "@/components/ProfileInfo";
import { formatToClientDate } from "@/utils/format-to-client-date";

export default function ProfileBlock({
  email = "",
  location = "",
  dateOfBirth = undefined,
  bio = "",
  followers = 0,
  following = 0,
}: Props) {
  return (
    <Card>
      <CardContent>
        <ProfileInfo title="Почта:" info={email} />
        <ProfileInfo title="Местоположение:" info={location} />
        <ProfileInfo
          title="Дата рождения:"
          info={formatToClientDate(dateOfBirth)}
        />
        <ProfileInfo title="Обо мне:" info={bio} />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
        <CountInfo count={followers} title="Подписчики" />
        <CountInfo count={following} title="Подписки" />
      </CardFooter>
    </Card>
  );
}
