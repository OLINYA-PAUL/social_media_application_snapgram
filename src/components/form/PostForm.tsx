import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";

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
import {
  useCreatePost,
  useUpdatePost,
  useDeletePost,
} from "@/lib/react-query/queriesAndMutation";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "../ui/use-toast";

interface PostformProps {
  post?: Models.Document;
  action: "Create" | "Update";
}

const PostForm = ({ post, action }: PostformProps) => {
  const { mutateAsync: usecreatepost, isLoading: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isLoading: isLoadingUpdate } =
    useUpdatePost();
  const { mutateAsync: deletePost } = useDeletePost();

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
    console.log({ CREATEPOST_: value });

    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...value,
        postId: post?.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        return toast({
          title: "Something wrong try again",
        });
      }

      if (updatedPost) {
        navigate(`/Post-details/${post?.$id}`);
        return toast({
          title: "Post updated successfully",
        });
      }
    }

    if (post && action === "Create") {
      const createPost = await usecreatepost({ ...value, userId: user.id });
      console.log({ CREATEPOST_: createPost });
      if (!createPost) {
        return toast({
          title: "Post not created successfully try again!😂",
        });
      }

      if (createPost) {
        return toast({
          title: "Post created successfully!😜",
        });
      }
    }

    // navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" gap-9 item-center justify-start flex-col mt-10  w-full ">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shadcn_lable ">Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={` ${isLoadingCreate ? "processing..." : "Caption"}`}
                  {...field}
                  className="post_form  focus:border-0 focus:outline-0 focus-visible:ring-0 h-14"
                  disabled={isLoadingCreate}
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
                  placeholder={` ${isLoadingCreate ? "processing..." : "location"}`}
                  {...field}
                  className="post_form focus:border-0 focus:outline-0 h-14"
                  disabled={isLoadingCreate}
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
                  placeholder={` ${isLoadingCreate ? "processing..." : "art, expression, learn"}`}
                  {...field}
                  className="post_form focus:border-0 focus:outline-0 h-14"
                  disabled={isLoadingCreate}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end  my-5">
          <Button
            type="button"
            onClick={() => navigate("/")}
            className={` mr-5 cursor-pointer bg-dark-3`}
            disabled={isLoadingCreate}>
            <div>
              <p>Cancel</p>
            </div>
          </Button>
          <Button
            type="submit"
            className={` cursor-pointer bg-dark-3 ${isLoadingCreate ? "bg-red" : "bg-blue-500"} `}
            disabled={isLoadingCreate || isLoadingUpdate}>
            {isLoadingCreate ||
              (isLoadingUpdate && (
                <div className="flex flex-1 justify-center items-center mr-2 ">
                  <img
                    src="/assets/icons/loader.svg"
                    alt="loading bar"
                    className="w-[20px] cursor-pointer"
                  />
                </div>
              ))}
            {action} post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
