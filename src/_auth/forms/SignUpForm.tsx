import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validaton";
import { useState } from "react";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof SignUpValidation>) {
    setIsLoading(true);
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="shadcn_form">
      <section className="flex items-center justify-center flex-col">
        <img
          src="/assets/images/logo.svg"
          alt="logo"
          className="w-40 align-center"
        />

        <h2 className="text-center font-extrabold text-xl pt-2">
          Create an account
        </h2>
        <p className="text-center font-normal text-[15px] pt-2 pb-2">
          to use snapgram please enter your details
        </p>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shadcn_lable">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={` ${isLoading ? "processing..." : "name"}`}
                    {...field}
                    className="shadcn_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shadcn_lable">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder={` ${isLoading ? "processing..." : "username"}`}
                    {...field}
                    className="shadcn_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shadcn_lable">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder={` ${isLoading ? "processing..." : "email"}`}
                    type="email"
                    {...field}
                    className="shadcn_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shadcn_lable">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder={` ${isLoading ? "processing..." : "password"}`}
                    {...field}
                    className="shadcn_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={`shadcn_button cursor-pointer ${isLoading ? "bg-red" : ""}`}
            disabled={isLoading}>
            {isLoading ? (
              <div>
                <div className="flex flex-1 justify-center items-center gap-3">
                  <img
                    src="/assets/icons/loader.svg"
                    alt="loading bar"
                    className="w-[20px] cursor-pointer"
                  />
                  <p>Loading...</p>
                </div>
              </div>
            ) : (
              <div>
                <p>summit</p>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default SignUpForm;
