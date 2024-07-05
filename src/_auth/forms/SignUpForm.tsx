import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccount } from "@/lib/react-query/queriesAndMutation";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutation";

//@ts-ignore
import { AuthContext } from "../../context/AuthContext";

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

const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  //@ts-ignore
  const { checkAuthUser, loading, user } = useContext(AuthContext);

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    mutateAsync: createUserAccount,
    isError,
    isLoading,
  } = useCreateUserAccount();

  const { mutateAsync: signInSession } = useSignInAccount();

  async function onSubmit(data: z.infer<typeof SignUpValidation>) {
    try {
      const newUser = await createUserAccount(data);

      if (!newUser) {
        return toast({
          title: "Somthing went wrong please try again!😜😂😜",
        });
      }

      const session = await signInSession({
        email: data.email,
        password: data.password,
        id: user.id,
      });

      if (session === null || "") {
        return toast({
          title: "Somthing went wrong please try again!😜😂😜",
        });
      }

      const isLogin = await checkAuthUser();

      if (isLogin) {
        form.reset();
        navigate("/");
        toast({
          title: "chasess login successful!😜💖😜",
        });
      } else
        return toast({
          title: "Somthing went wrong please try again!😜😂😜",
        });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      return isError;
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
                    type="text"
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shadcn_lable">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
                <FormLabel className="shadcn_lable">Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={` ${isLoading ? "processing..." : "password"}`}
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
            Already have an account?
            <Link to="/sign-in" className="text-blue-600 pl-3 font-semibold">
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default SignUpForm;
