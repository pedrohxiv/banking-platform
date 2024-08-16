"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import type {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { addFundingSource, createDwollaCustomer } from "@/actions/dwolla";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { plaidClient } from "@/lib/plaid";
import { extractCustomerIdFromUrl } from "@/lib/utils";

export const createBankAccount = async (values: {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
}) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      ID.unique(),
      { ...values }
    );

    return bankAccount;
  } catch (error) {
    console.error(error);
  }
};

export const createLinkToken = async (user: User) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: user.$id },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    });

    return { linkToken: response.data.link_token };
  } catch (error) {
    console.error(error);
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: {
  publicToken: string;
  user: User;
}) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );

    const processorToken = processorTokenResponse.data.processor_token;

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    if (!fundingSourceUrl) {
      throw Error;
    }

    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: btoa(accountData.account_id),
    });

    revalidatePath("/");

    return {
      publicTokenExchange: "complete",
    };
  } catch (error) {
    console.error(error);
  }
};

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

    const dwollaCustomerUrl = await createDwollaCustomer({
      firstName: values.firstName!,
      lastName: values.lastName!,
      email: values.email,
      type: "personal",
      address1: values.address!,
      city: values.city!,
      state: values.state!,
      postalCode: values.postalCode!,
      dateOfBirth: values.dateOfBirth!,
      ssn: values.ssn!,
    });

    if (!dwollaCustomerUrl) {
      throw new Error("Error creating Dwolla customer");
    }

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...values,
        userId: newAccount.$id,
        dwollaCustomerUrl,
        dwollaCustomerId,
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
