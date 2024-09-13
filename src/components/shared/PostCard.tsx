import { AuthContext } from "@/context/AuthContext";
import { formatDateTime } from "@/lib/utils";
import { Models } from "appwrite";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

const PostCard = ({ post }: { post: Models.Document }) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [showFullText, setShowFullText] = useState(false);

  const { user } = useContext(AuthContext);

  if (!post.creator) return null;

  useEffect(() => {
    setFormattedDate(formatDateTime(post.$createdAt));

    const intervalId = setInterval(() => {
      setFormattedDate(formatDateTime(post.$createdAt));
    }, 60000); // Update every 1 minute

    return () => clearInterval(intervalId);
  }, [formattedDate]);

  const wordLimit = 100;

  const words = post.caption.split(" "); // []

  const trunCateText = ({ seeMore }: { seeMore: string }): ReactElement => (
    <>
      {words.slice(0, wordLimit).join(" ")}{" "}
      <span className="text-blue-300">{seeMore}</span>
    </>
  );

  const handleShowFullText = () => {
    setShowFullText(true);
  };

  return (
    <div className="w-full bg-dark-3 p-5 rounded-2xl mb-5 ">
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
      <div className="mt-5">
        {showFullText ? (
          <div>
            <p className="text-[10px]">{post.caption}</p>
          </div>
        ) : (
          <div onClick={() => handleShowFullText()} className="cursor-pointer">
            {words.length < wordLimit ? (
              <div className="text-[10px]">{post.caption}</div>
            ) : (
              <div className="text-[10px]">
                {trunCateText({ seeMore: "...see more" })}
              </div>
            )}
          </div>
        )}
        <Link to={`/post/${post.$id}`}>
          <div className="text-sm max-sm:text-[11px] font-normal "></div>
          <ul className=" text-sm gap-2 mt-2">
            {post?.tags.map((tags: string) => (
              <li
                className="text-[10px]  font-normal  text-gray-400"
                key={tags}>
                #{tags}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <img
              src={post.imageUrl}
              alt="image"
              className="w-full h-1/6 rounded-md"
            />
          </div>
        </Link>
        <PostStats post={post} userId={user.id} />
      </div>
    </div>
  );
};

export default PostCard;
