import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID } from "appwrite";

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
