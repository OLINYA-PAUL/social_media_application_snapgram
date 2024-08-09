import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

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

const PostForm = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-9 item-center justify-start flex-col mt-10 overflow-auto w-full">
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="locaation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shadcn_lable ">Add Location</FormLabel>
              <FormControl>
                <Input
                  placeholder={` ${isLoading ? "processing..." : "Caption"}`}
                  {...field}
                  className="post_form focus:border-0 focus:outline-0"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end mb-20">
          <Button
            type="button"
            onClick={() => navigate("/")}
            className={` mr-5 cursor-pointer bg-dark-3 ${isLoading ? "bg-red" : ""}`}
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
                <p>Cancel</p>
              </div>
            )}
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
