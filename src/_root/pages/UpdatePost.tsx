import PostForm from "@/components/form/PostForm";
import { getPostByIds } from "@/lib/react-query/queriesAndMutation";
import { Loader } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();

  const { data: post, isLoading } = getPostByIds(id || "");
  console.log({ postId: post });

  if (isLoading)
    return (
      <p className="flex items-center justify-center z-1">
        <Loader size={30} color="white" />
      </p>
    );

  return (
    <div className="h-screen  w-full p-5">
      <div className="create_post">
        <div className="w-full mt-5 mx-2 ">
          <div className="flex  items-center justify-start ">
            <img
              src="/assets/icons/add-post.svg"
              alt="add icon"
              className="w-10 mr-3"
            />
            <p className="font-extrabold text-xl">Edit Post</p>
          </div>

          <PostForm action="Update" post={post} />
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
