"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { User } from "@/lib/types";
import { useUpdateUserMutation } from "@/lib/servicies/userApi";
import { useState } from "react";
import { useParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/FormInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Textarea } from "@/components/textarea";
import { Input } from "@/components/input";

type Props = {
  user?: User;
};

const formSchema = z.object({
  email: z.string().email({ message: "Некорректная почта" }).optional(),
  name: z.string().optional(),
  dateOfBirth: z
    .string()
    .transform((val) => new Date(val).toISOString())
    .optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  avatar: z.instanceof(FileList).optional(),
});

export function EditProfile({ user }: Props) {
  // todo возможно нужно поработать с тёмной темой const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const params = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    reValidateMode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString()
        : undefined,
      bio: user?.bio,
      location: user?.location,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const fileRef = form.register("avatar");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (params?.id) {
      try {
        console.log("values", data);
        const formData = new FormData();
        data.name && formData.append("name", data.name);
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email);
        data.dateOfBirth && formData.append("dateOfBirth", data.dateOfBirth);
        data.bio && formData.append("bio", data.bio);
        data.location && formData.append("location", data.location);
        data.avatar && formData.append("avatar", data.avatar[0]);

        await updateUser({ userData: formData, id: params?.id }).unwrap();

        // Добавляем файл в formData
        // if (selectedFile) {
        //   formData.append("file", selectedFile);
        // }

        // Отправляем данные
        // const result = await updateUser.mutateAsync(formData);
        const entries = Array.from(formData.entries());
        for (let pair of entries) {
          console.log(pair[0] + ", " + pair[1]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full" variant="outline">Редактировать профиль</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder={"example@example.com"}
            />
            <FormInput
              control={form.control}
              name="name"
              label="Name"
              placeholder={"John Doe"}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <Input type="file" placeholder="shadcn" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormInput
              control={form.control}
              name="dateOfBirth"
              type="date"
              label="Date of Birth"
              placeholder={"01.01.2000"}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormInput
              control={form.control}
              name="location"
              label="Location"
              placeholder={"Earth"}
            />
            <Button className="mt-4" type="submit">Обновить профиль</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
