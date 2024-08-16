import AuthProvider, { AuthContext } from "@/context/AuthContext";
import { formatDateTime } from "@/lib/utils";
import { Models } from "appwrite";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }: { post: Models.Document }) => {
  const [formattedDate, setFormattedDate] = useState("");

  const { user } = useContext(AuthContext);

  if (!post.creator) return null;

  useEffect(() => {
    setFormattedDate(formatDateTime(post.$createdAt));

    const intervalId = setInterval(() => {
      setFormattedDate(formatDateTime(post.$createdAt));
    }, 60000); // Update every 1 minute

    return () => clearInterval(intervalId);
  }, [formattedDate]);

  return (
    <div className="w-full mb-10">
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
            to={`/updatePost/${post.$id}`}
            className={`${user.id !== post.creator.$id && "hidden"}`}>
            <img
              src="/assets/icons/edit.svg"
              alt="edit icon"
              className="rounded-full w-5 md:w-7"
            />
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <Link to={`/post/${post.$id}`}>
          <div className="text-sm max-sm:text-[11px] font-normal ">
            {post.caption}
          </div>
          <ul className="flex text-sm gap-2 mt-2">
            {post?.tags.map((tags: string) => (
              <li
                className=" max-sm:text-[11px] font-normal  text-gray-400 "
                key={tags}>
                #{tags}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <img
              src={post.imageUrl}
              alt="image"
              className="w-full  rounded-md"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
