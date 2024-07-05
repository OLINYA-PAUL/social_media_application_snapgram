import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
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
  const currentAccount = await account.get();

  if (!currentAccount) throw Error;

  const currentUser = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountId", currentAccount.$id)]
  );

  if (!currentUser) throw Error;

  return currentUser.documents[0];
};

export const signOut = async () => {
  try {
    const signOut = await account.deleteSession("current");

    return signOut;
  } catch (error) {
    console.log(error);
  }
};
