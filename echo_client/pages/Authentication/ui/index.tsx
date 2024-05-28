"use client";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";

import { cn } from "@/lib/utils";
import { RegistrationForm } from "@/components/registrationForm";
import { useEffect, useState } from "react";
import { LoginForm } from "@/features/user/ui/LoginForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/alert";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export const AuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showAlert, setShowAlert] = useState(false);

  useAuthGuard();

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  const handleTabsChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 h-full">
          <div className="mx-auto grid h-full grid-rows-[100px_1fr_200px] w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={handleTabsChange}
              className="w-[370px]"
            >
              <TabsList className="flex mx-auto">
                <TabsTrigger value="login">Войти</TabsTrigger>
                <TabsTrigger value="register">Зарегистрироваться</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegistrationForm
                  setActiveTab={setActiveTab}
                  setShowAlert={setShowAlert}
                />
              </TabsContent>
            </Tabs>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          {showAlert && (
            <div className="fixed bottom-0 right-0 m-6">
              <Alert>
                {/* <Terminal className="h-4 w-4" /> */}
                <AlertTitle>Почти готово!</AlertTitle>
                <AlertDescription>
                  Ваш аккаунт был создан. Осталось только войти в аккаунт.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
