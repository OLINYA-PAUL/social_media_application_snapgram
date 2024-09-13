import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikedPost,
  useSavedPost,
} from "@/lib/react-query/queriesAndMutation";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

const PostStats = ({
  post,
  userId,
}: {
  post: Models.Document;
  userId: string;
}) => {
  const likedList = post.likes;

  const likeArraycallback = () => {
    return likedList ? likedList.map((user: Models.Document) => user.$id) : [];
  };

  const [likedPost, setLikedPost] = useState(likeArraycallback());
  console.log({ TOTAL: likedList });

  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likedPosts } = useLikedPost();
  const { mutate: savedPost, isLoading: isSavingPost } = useSavedPost();
  const { mutate: deletePost, isLoading: isDeletingPost } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecored = currentUser;
  const findSavedPost = () => {
    if (savedPostRecored && savedPostRecored.save) {
      return savedPostRecored.save.find(
        (savedPostRecord: Models.Document) =>
          savedPostRecord.post.$id === post.$id
      );
    }
  };

  console.log({ "current saved user": currentUser });

  useEffect(() => {
    setIsSaved(!!findSavedPost());
  }, [findSavedPost]);

  const handleLikedPost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let likesArray = likedList ? [...likedList] : [];

    if (likesArray.includes(userId)) {
      // If user has already liked, unlike the post by removing the userId from the list
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      // If user hasn't liked yet, like the post by adding the userId to the list
      likesArray.push(userId);
    }

    setLikedPost(likesArray);
    likedPosts({ postId: post.$id, likedArray: likesArray });
  };

  const handleSavedPost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (findSavedPost()) {
      setIsSaved(false);
      return deletePost({ savedPostId: post.$id });
    }

    savedPost({ postId: post.$id, userId: userId });
    setIsSaved(true);
  };

  return (
    <div className="mt-5 w-full flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-between p-2 ">
        <div className="flex gap-1 items-center">
          <img
            src={`${
              checkIsLiked(likedPost, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }  `}
            alt="liked"
            width={35}
            className="cursor-pointer"
            onClick={handleLikedPost}
          />
          <h3 className="font-bold pl-3">{likedPost.length}</h3>
        </div>
        <div className="flex gap-1 items-center">
          {isSavingPost && isDeletingPost ? (
            <Loader />
          ) : (
            <img
              src={`${
                isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
              } `}
              alt="liked"
              width={35}
              className="cursor-pointer"
              onClick={handleSavedPost}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostStats;
