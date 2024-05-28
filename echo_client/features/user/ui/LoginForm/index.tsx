"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { FormInput } from "@/components/FormInput";
import { useLazyCurrentQuery, useLoginMutation } from "@/lib/servicies/userApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  password: z.string(),
  email: z.string().email({ message: "Некорректная почта" }),
});

export function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const [error, setError] = useState("");
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    reValidateMode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      console.log(values);
      await login(values).unwrap();
      await triggerCurrentQuery();
      router.push("/feed");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button className="flex mx-auto" type="submit">
          Войти
        </Button>
      </form>
      {/* <p className="text-sm text-muted-foreground text-red-500">error message</p> */}
    </Form>
  );
}
