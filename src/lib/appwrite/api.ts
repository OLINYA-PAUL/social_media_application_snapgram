import { INewPost, INewUser, IUpdatePost } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";

export async function createUserAccount(user: INewUser) {
  const newAccount = await account.create(
    ID.unique(),
    user.email,
    user.password,
    user.name
  );

  if (!newAccount) throw Error("user account is needed");

  const avatarUrl = avatars.getInitials(user.name);

  const newUser = await saveUserToDB({
    accountId: newAccount.$id,
    email: newAccount.email,
    name: newAccount.name,
    username: user.username,
    imageUrl: avatarUrl.toString(),
  });

  return newUser;
}

export const saveUserToDB = async (user: {
  accountId: string;
  email: string;
  name: string;
  username?: string;
  imageUrl?: string;
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    if (!newUser) return null;

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createSignInAccount = async (user: {
  email: string;
  password: string;
  id: string;
}) => {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signOut = async () => {
  try {
    const signOut = await account.deleteSession("current");

    return signOut;
  } catch (error) {
    console.log(error);
  }
};

//Create posts

export async function createPost(post: INewPost) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPost() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export const likePost = async (postId: string, likedArray: string[]) => {
  try {
    const likedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likedArray,
      }
    );

    if (!likedPost) return Error;

    return likedPost;
  } catch (error) {
    console.log(error);
  }
};

export const savedPost = async (postId: string, userId: string) => {
  try {
    const likedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      ID.unique(),
      {
        saved: userId,
        post: postId,
      }
    );

    if (!likedPost) return Error;

    return likedPost;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteSavedPost = async (savedRecordId: string) => {
  try {
    const savedStatusPost = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      savedRecordId
    );

    if (!savedStatusPost) return Error;

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId: string) => {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!post) throw new Error();
    return post;
  } catch (error) {
    console.log(error);
  }
};

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post?.file.length > 0;
  try {
    let imageUrlToUpdate = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);

      if (!uploadedFile) throw Error;

      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      imageUrlToUpdate = {
        ...imageUrlToUpdate,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
      };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post

    const { imageUrl, imageId } = imageUrlToUpdate;
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl,
        imageId,
        location: post.location,
        tags: tags,
      }
    );

    if (!updatedPost) {
      await deleteFile(post.imageId);
      throw Error;
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = async (postId: string, imageId: string) => {
  if (!postId || !imageId) throw new Error();

  try {
    const deletePost = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );

    if (!deletePost) throw new Error();

    return { status: "OK", deletePost };
  } catch (error) {
    console.log(error);
  }
};
