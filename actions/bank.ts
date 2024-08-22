"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "@/lib/appwrite";

export const createBank = async (values: {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
}) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      ID.unique(),
      { ...values }
    );

    return bank;
  } catch (error) {
    console.error(error);
  }
};

export const getBank = async ({ documentId }: { documentId: string }) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal("$id", [documentId])]
    );

    return bank.documents[0];
  } catch (error) {
    console.error(error);
  }
};

export const getBankByAccountId = async ({
  accountId,
}: {
  accountId: string;
}) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal("accountId", [accountId])]
    );

    if (bank.total !== 1) {
      return null;
    }

    return bank.documents[0];
  } catch (error) {
    console.error(error);
  }
};

export const getBanks = async ({ userId }: { userId: string }) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return banks.documents;
  } catch (error) {
    console.error(error);
  }
};
