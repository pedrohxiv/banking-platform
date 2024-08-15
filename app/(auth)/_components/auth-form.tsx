"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signIn, signUp } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { authDefaultValues } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { authFormSchema } from "@/lib/validations";

interface Props {
  type: "sign-in" | "sign-up";
}

export const AuthForm = ({ type }: Props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const router = useRouter();

  const formSchema = authFormSchema(type);
  const defaultValues = authDefaultValues(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      switch (type) {
        case "sign-in":
          const response = await signIn(values);

          if (!response) {
            toast({
              variant: "destructive",
              title: "User Not Found!",
              description: "Check your email and password and try again.",
            });

            break;
          }

          router.push("/");
        case "sign-up":
          const user = await signUp(values);

          setUser(user);
      }
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    setIsLoading(false);
  };

  return (
    <section className="flex min-h-screen w-full flex-col justify-center gap-5 py-10 md:gap-8 max-w-[520px]">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href={isLoading ? "#" : "/"}
          className={cn(
            "cursor-pointer flex items-center py-1 gap-2 w-full justify-center",
            { "cursor-default": isLoading }
          )}
        >
          <Image src="/icons/logo.svg" height={34} width={34} alt="logo" />
          <h1 className="text-[26px] leading-8 font-bold text-black-primary">
            Banking Platform
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3 items-center justify-center">
          <h1 className="text-2xl leading-[30px] lg:text-4xl lg:leading-[44px] font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-base font-normal text-gray-600">
            {user
              ? "Link your account to get started."
              : type === "sign-up"
              ? "Create your account by entering your details."
              : "Enter your credentials to access your account."}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1.5 w-full">
                          <FormLabel className="text-sm font-medium w-full max-w-[280px]">
                            First Name
                          </FormLabel>
                          <FormControl className="flex w-full flex-col">
                            <Input
                              placeholder="Enter your first name"
                              className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                              {...field}
                              disabled={isLoading}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    .replace(/[^A-Za-z]/g, "")
                                    .replace(/(?:^|\s)\S/g, (string) =>
                                      string.toUpperCase()
                                    )
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 mt-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1.5 w-full">
                          <FormLabel className="text-sm font-medium w-full max-w-[280px]">
                            Last Name
                          </FormLabel>
                          <FormControl className="flex w-full flex-col">
                            <Input
                              placeholder="Enter your last name"
                              className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                              {...field}
                              disabled={isLoading}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    .replace(/[^A-Za-z]/g, "")
                                    .replace(/(?:^|\s)\S/g, (string) =>
                                      string.toUpperCase()
                                    )
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 mt-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1.5 w-full">
                          <FormLabel className="text-sm font-medium w-full max-w-[280px]">
                            Address
                          </FormLabel>
                          <FormControl className="flex w-full flex-col">
                            <Input
                              placeholder="Enter your specific address"
                              className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                              {...field}
                              disabled={isLoading}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value.replace(
                                    /(?:^|\s)\S/g,
                                    (string) => string.toUpperCase()
                                  )
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 mt-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1.5 w-full">
                          <FormLabel className="text-sm font-medium w-full max-w-[280px]">
                            City
                          </FormLabel>
                          <FormControl className="flex w-full flex-col">
                            <Input
                              placeholder="Enter your city"
                              className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                              {...field}
                              disabled={isLoading}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    .replace(/[^A-Za-z]/g, "")
                                    .replace(/(?:^|\s)\S/g, (string) =>
                                      string.toUpperCase()
                                    )
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 mt-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1.5 w-full">
                          <FormLabel className="text-sm font-medium w-full max-w-[280px]">
                            State
                          </FormLabel>
                          <FormControl className="flex w-full flex-col">
                            <Input
                              placeholder="Enter your state"
                              className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                              {...field}
                              disabled={isLoading}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    .toUpperCase()
                                    .replace(/[^A-Z]/g, "")
                                    .slice(0, 2)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 mt-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1.5 w-full">
                          <FormLabel className="text-sm font-medium w-full max-w-[280px]">
                            Postal Code
                          </FormLabel>
                          <FormControl className="flex w-full flex-col">
                            <Input
                              placeholder="Enter your postal code"
                              className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                              {...field}
                              disabled={isLoading}
                              type="number"
                              onChange={(e) =>
                                e.target.value.length <= 5 && field.onChange(e)
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 mt-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1.5 w-full">
                          <FormLabel className="text-sm font-medium w-full max-w-[280px]">
                            Date of Birth
                          </FormLabel>
                          <FormControl className="flex w-full flex-col">
                            <Input
                              placeholder="Enter your date of birth"
                              className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                              {...field}
                              disabled={isLoading}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");

                                let formattedValue = value;

                                if (formattedValue.length >= 8) {
                                  formattedValue =
                                    formattedValue.slice(0, 4) +
                                    "-" +
                                    formattedValue.slice(4, 6) +
                                    "-" +
                                    formattedValue.slice(6, 8);
                                } else if (formattedValue.length >= 6) {
                                  formattedValue =
                                    formattedValue.slice(0, 4) +
                                    "-" +
                                    formattedValue.slice(4, 6) +
                                    "-" +
                                    formattedValue.slice(6);
                                } else if (formattedValue.length >= 4) {
                                  formattedValue =
                                    formattedValue.slice(0, 4) +
                                    "-" +
                                    formattedValue.slice(4);
                                }

                                field.onChange(formattedValue);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 mt-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ssn"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1.5 w-full">
                          <FormLabel className="text-sm font-medium w-full max-w-[280px]">
                            SSN
                          </FormLabel>
                          <FormControl className="flex w-full flex-col">
                            <Input
                              placeholder="Enter your SSN"
                              className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                              {...field}
                              disabled={isLoading}
                              type="number"
                              onChange={(e) =>
                                e.target.value.length <= 4 && field.onChange(e)
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 mt-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1.5 w-full">
                    <FormLabel className="text-sm font-medium w-full max-w-[280px]">
                      Email
                    </FormLabel>
                    <FormControl className="flex w-full flex-col">
                      <Input
                        placeholder="Enter your email"
                        className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 mt-2" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1.5 w-full">
                    <FormLabel className="text-sm font-medium w-full max-w-[280px]">
                      Password
                    </FormLabel>
                    <FormControl className="flex w-full flex-col">
                      <Input
                        placeholder="Enter your password"
                        className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                        {...field}
                        disabled={isLoading}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 mt-2" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="text-base rounded-lg bg-gradient-to-r from-[#0179FE] to-[#4893FF] font-semibold text-white shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-sm font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={
                isLoading ? "#" : type === "sign-in" ? "/sign-up" : "/sign-in"
              }
              className={cn("text-sm cursor-pointer font-medium text-primary", {
                "opacity-50 cursor-default": isLoading,
              })}
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};
