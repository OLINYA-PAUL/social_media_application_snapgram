import PostCard from "@/components/shared/PostCard";
import { AuthContext } from "@/context/AuthContext";
import { useGetRecentPost } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { useContext } from "react";

const Home = () => {
  const { data: post, isLoading, isError, error } = useGetRecentPost();

  console.log(post);
  return (
    <div className="h-screen  w-full ">
      <div className="w-full  bg-dark-3 p-5">
        <h1 className="text-[30px] font-bold max-sm:text-[25px]">Home feed</h1>

        <div>
          {isLoading && !post ? (
            <div className="flex flex-col flex-1 justify-center items-center mt-[50px]">
              <img
                src="/assets/icons/loader.svg"
                alt="loading bar"
                className="w-[20px] cursor-pointer"
              />
            </div>
          ) : (
            <ul>
              {post?.documents.map((post: Models.Document) => (
                <div
                  className="flex flex-1 flex-col w-full mt-3"
                  key={post.$id}>
                  <PostCard post={post} />
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
