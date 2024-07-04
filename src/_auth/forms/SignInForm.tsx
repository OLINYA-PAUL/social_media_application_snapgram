import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInValidation } from "@/lib/validaton";
import { useState } from "react";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof SignInValidation>) {
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
          Welcome back to snapgram
        </h2>
        <p className="text-center font-normal text-[15px] pt-2 pb-2">
          Please login your snapgram details
        </p>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shadcn_lable">Name</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={` ${isLoading ? "processing..." : "name"}`}
                    {...field}
                    className="shadcn_input"
                    disabled={isLoading}
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
                <FormLabel className="shadcn_lable">Username</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={` ${isLoading ? "processing..." : "username"}`}
                    {...field}
                    className="shadcn_input"
                    disabled={isLoading}
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
                <p>Sign up</p>
              </div>
            )}
          </Button>
          <p className="font-normal pt-3 text-sm text-center">
            Don't have an account?
            <Link to="/sign-up" className="text-blue-600 pl-3 font-semibold">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default SignInForm;
