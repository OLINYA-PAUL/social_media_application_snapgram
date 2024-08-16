import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useContext } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUploader from "../shared/FileUploader";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { postFormSchema } from "@/lib/validaton";
import { Models } from "appwrite";
import { useCreatePost } from "@/lib/react-query/queriesAndMutation";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "../ui/use-toast";

interface PostformProps {
  post?: Models.Document;
}

const PostForm = ({ post }: PostformProps) => {
  const { mutateAsync: usecreatepost, isLoading } = useCreatePost();

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  async function onSubmit(value: z.infer<typeof postFormSchema>) {
    const createPost = await usecreatepost({ ...value, userId: user.id });

    if (!createPost) {
      return toast({
        title: "Post not created successfully try again!😂",
      });
    }

    if (createPost) navigate("/");

    return toast({
      title: "Post created successfully!😜",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-9 item-center justify-start flex-col mt-10  w-full">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shadcn_lable ">Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={` ${isLoading ? "processing..." : "Caption"}`}
                  {...field}
                  className="post_form  focus:border-0 focus:outline-0 focus-visible:ring-0"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shadcn_lable ">Add Photo</FormLabel>
              <FormControl>
                <FileUploader
                  filedChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shadcn_lable ">Add Location</FormLabel>
              <FormControl>
                <Input
                  placeholder={` ${isLoading ? "processing..." : "location"}`}
                  {...field}
                  className="post_form focus:border-0 focus:outline-0"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shadcn_lable ">
                Add tags (separated by commas ",")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={` ${isLoading ? "processing..." : "art, expression, learn"}`}
                  {...field}
                  className="post_form focus:border-0 focus:outline-0"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end mb-20">
          <Button
            type="button"
            onClick={() => navigate("/")}
            className={` mr-5 cursor-pointer bg-dark-3`}
            disabled={isLoading}>
            <div>
              <p>Cancel</p>
            </div>
          </Button>
          <Button
            type="submit"
            className={` cursor-pointer bg-dark-3 ${isLoading ? "bg-red" : "bg-blue-500"}`}
            disabled={isLoading}>
            {isLoading ? (
              <div>
                <div className="flex flex-1 justify-center items-center ">
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
                <p>Submit</p>
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
