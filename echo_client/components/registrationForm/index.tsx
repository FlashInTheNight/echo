"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/button";
import {
  Form,
} from "@/components/form";
import { FormInput } from "../FormInput";
import { useRegisterMutation } from "@/lib/servicies/userApi";
import { useState } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Имя не может быть пустым" })
    .max(30, { message: "Имя не может быть длинее 30 символов" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать не менее 6 символов" }),
  email: z.string().email({ message: "Некорректная почта" }),
});

type Props = {
  setActiveTab: (tab: string) => void;
  setShowAlert: (show: boolean) => void;
}

export function RegistrationForm({ setActiveTab, setShowAlert }: Props) {
  const [register] = useRegisterMutation();
  // const [error, setError] = useState('');
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    reValidateMode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      await register(values).unwrap();
      // опционально сделать алерт при успешной регистрации
      setShowAlert(true);
      setActiveTab('login');
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          control={form.control}
          label="Имя"
          name="name"
          placeholder="Имя"
        />
        <FormInput
          control={form.control}
          label="Почта"
          name="email"
          placeholder="Почта"
        />
        <FormInput
          control={form.control}
          label="Пароль"
          name="password"
          placeholder="Пароль"
        />
        <Button className="flex mx-auto" type="submit">Зарегистрироваться</Button>
      </form>
    </Form>
  );
}
