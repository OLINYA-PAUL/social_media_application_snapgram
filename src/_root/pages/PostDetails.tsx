import { AuthContext } from "@/context/AuthContext";
import {
  getPostByIds,
  useGetRecentPost,
} from "@/lib/react-query/queriesAndMutation";
import { formatDateTime } from "@/lib/utils";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const [formattedDate, setFormattedDate] = useState("");
  const [showFullText, setShowFullText] = useState(false);

  const { user } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const { data: post } = getPostByIds(id || "");

  if (!post?.creator) return null;

  // useEffect(() => {
  //   setFormattedDate(formatDateTime(post.$createdAt));

  //   const intervalId = setInterval(() => {
  //     setFormattedDate(formatDateTime(post.$createdAt));
  //   }, 60000); // Update every 1 minute

  //   return () => clearInterval(intervalId);
  // },[formattedDate]);

  return (
    <div className="w-full  bg-dark-3 p-5 rounded-2xl h-auto mb-5">
      <div className="flex w-full flex-1 justify-between  ">
        <Link
          to={`/profile/${post.creator.$id}`}
          className="w-full flex items-center ">
          <div className=" mr-3">
            <img
              src={post.creator.imageUrl}
              alt="bannerImage"
              className="rounded-full w-10 md:w-12"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-[1em] max-sm:text-[15px]">
              {post.creator?.name}
            </h3>
            <p className="text-sm max-sm:text-[11px] font-normal text-gray-400 ">
              {`${formattedDate} - ${post.location}`}
            </p>
          </div>
        </Link>
        <div>
          <Link
            to={`/update-post/${post.$id}`}
            className={`${user.id !== post.creator.$id && "hidden"}`}>
            <img
              src="/assets/icons/edit.svg"
              alt="edit icon"
              className="rounded-full w-5 md:w-7"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
