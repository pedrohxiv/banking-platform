"use server";

import { getBank, getBanks } from "@/actions/bank";
import { getInstitution } from "@/actions/institution";
import {
  getTransactions,
  getTransactionsByBankId,
} from "@/actions/transaction";
import { plaidClient } from "@/lib/plaid";

export const getAccount = async ({
  appwriteItemId,
}: {
  appwriteItemId: string;
}) => {
  try {
    const bank = await getBank({ documentId: appwriteItemId });

    if (!bank) {
      throw new Error("Bank not found");
    }

    const accounts = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });

    const transfers = await getTransactionsByBankId({
      bankId: bank.$id,
    });

    if (!transfers) {
      throw new Error("Transfers not found");
    }

    const institution = await getInstitution({
      institutionId: accounts.data.item.institution_id!,
    });

    if (!institution) {
      throw new Error("Transfers not found");
    }

    const transactions = await getTransactions({
      accessToken: bank?.accessToken,
    });

    if (!transactions) {
      throw new Error("Transactions not found");
    }

    return {
      data: {
        id: accounts.data.accounts[0].account_id,
        availableBalance: accounts.data.accounts[0].balances.available,
        currentBalance: accounts.data.accounts[0].balances.current,
        institutionId: institution.institution_id,
        name: accounts.data.accounts[0].name,
        officialName: accounts.data.accounts[0].official_name,
        mask: accounts.data.accounts[0].mask,
        type: accounts.data.accounts[0].type as string,
        subtype: accounts.data.accounts[0].subtype as string,
        appwriteItemId: bank.$id,
      },
      transactions: [
        ...transactions,
        ...transfers.documents.map((transfer) => ({
          id: transfer.$id,
          name: transfer.name,
          amount: transfer.amount,
          date: transfer.$createdAt,
          paymentChannel: transfer.channel,
          category: transfer.category,
          type: transfer.senderBankId === bank.$id ? "debit" : "credit",
        })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    };
  } catch (error) {
    console.error(error);
  }
};

export const getAccounts = async ({ userId }: { userId: string }) => {
  try {
    const banks = await getBanks({ userId });

    if (!banks) {
      throw new Error("Banks not found");
    }

    const accounts = await Promise.all(
      banks.map(async (bank) => {
        const accounts = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });

        const institution = await getInstitution({
          institutionId: accounts.data.item.institution_id!,
        });

        return {
          id: accounts.data.accounts[0].account_id,
          availableBalance: accounts.data.accounts[0].balances.available!,
          currentBalance: accounts.data.accounts[0].balances.current!,
          institutionId: institution!.institution_id,
          name: accounts.data.accounts[0].name,
          officialName: accounts.data.accounts[0].official_name,
          mask: accounts.data.accounts[0].mask!,
          type: accounts.data.accounts[0].type as string,
          subtype: accounts.data.accounts[0].subtype! as string,
          appwriteItemId: bank.$id,
          sharaebleId: bank.shareableId,
        };
      })
    );

    return {
      data: accounts,
      banks: accounts.length,
      currentBalance: accounts.reduce(
        (total, account) => total + account.currentBalance,
        0
      ),
    };
  } catch (error) {
    console.error(error);
  }
};
