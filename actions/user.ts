"use server";

import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();

    const response = await account.get();

    const user = await getUser({ userId: response.$id });

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async ({ userId }: { userId: string }) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return user.documents[0];
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (values: { email: string; password: string }) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(
      values.email,
      values.password
    );

    if (!session) {
      return;
    }

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUser({ userId: session.userId });

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async ({
  password,
  ...values
}: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  dateOfBirth?: string;
  ssn?: string;
}) => {
  try {
    const { account, database } = await createAdminClient();

    const newAccount = await account.create(
      ID.unique(),
      values.email,
      password,
      `${values.firstName} ${values.lastName}`
    );

    if (!newAccount) {
      throw new Error("Error creating user");
    }

    const newUser = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...values,
        userId: newAccount.$id,
        dwollaCustomerUrl: "",
        dwollaCustomerId: "",
      }
    );

    const session = await account.createEmailPasswordSession(
      values.email,
      password
    );

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return newUser;
  } catch (error) {
    console.error(error);
  }
};
