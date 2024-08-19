"use server";

import { ID, Query } from "node-appwrite";

import { createAdminClient } from "@/lib/appwrite";
import { plaidClient } from "@/lib/plaid";

export const createTransaction = async (values: {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}) => {
  try {
    const { database } = await createAdminClient();

    const transaction = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: "online",
        category: "Transfer",
        ...values,
      }
    );

    return transaction;
  } catch (error) {
    console.error(error);
  }
};

export const getTransactions = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  try {
    let hasMore = true;
    let transactions;

    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = response.data.has_more;
    }

    return transactions;
  } catch (error) {
    console.error(error);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: {
  bankId: string;
}) => {
  try {
    const { database } = await createAdminClient();

    const sender = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("senderBankId", bankId)]
    );

    const receiver = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("receiverBankId", bankId)]
    );

    return {
      total: sender.total + receiver.total,
      documents: [...sender.documents, ...receiver.documents],
    };
  } catch (error) {
    console.error(error);
  }
};
