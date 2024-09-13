import PostForm from "@/components/form/PostForm";

const CreatePost = () => {
  return (
    <div className="create_post">
      <div className="w-full mt-5 mx-2 ">
        <div className="flex  items-center justify-start ">
          <img
            src="/assets/icons/add-post.svg"
            alt="add icon"
            className="w-10 mr-3"
          />
          <p className="font-extrabold text-xl">Create Post</p>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
