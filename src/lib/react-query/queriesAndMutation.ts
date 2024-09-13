import {
  Mutation,
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createUserAccount,
  createSignInAccount,
  signOut,
  createPost,
  getRecentPost,
  likePost,
  savedPost,
  DeleteSavedPost,
  getCurrentUser,
  getPostById,
  updatePost,
  deletePost,
} from "../appwrite/api";
import { INewPost, INewUser, IUpdatePost } from "@/types";
import { QUERY_KEYS } from "../enum/queryKeys";
import { Models } from "appwrite";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string; id: string }) =>
      createSignInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPost = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: () => getRecentPost(),
  });
};

export const useLikedPost = () => {
  const queyClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      likedArray,
    }: {
      postId: string;
      likedArray: string[];
    }) => likePost(postId, likedArray),
    onSuccess: (data) => {
      queyClient.invalidateQueries({
        //@ts-ignore
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queyClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queyClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queyClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavedPost = () => {
  const queyClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savedPost(postId, userId),
    onSuccess: (data) => {
      queyClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queyClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queyClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useDeleteSavedPost = () => {
  const queyClient = useQueryClient();

  return useMutation({
    mutationFn: ({ savedPostId }: { savedPostId: string }) =>
      DeleteSavedPost(savedPostId),
    onSuccess: (data) => {
      queyClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queyClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queyClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryFn: getCurrentUser,
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
  });
};

export const getPostByIds = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
