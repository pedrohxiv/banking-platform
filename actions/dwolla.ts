"use server";

import { Client } from "dwolla-v2";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
}) => {
  try {
    const dwollaAuthLinks = await createOnDemandAuthorization();

    const fundingSource = await createFundingSource({
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    });

    return fundingSource;
  } catch (error) {
    console.error(error);
  }
};

export const createDwollaCustomer = async (newCustomer: {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}) => {
  try {
    const dwollaCustomer = await dwollaClient
      .post("customers", newCustomer)
      .then((res) => res.headers.get("location"));

    return dwollaCustomer;
  } catch (error) {
    console.error(error);
  }
};

export const createFundingSource = async (options: {
  customerId: string;
  fundingSourceName: string;
  plaidToken: string;
  _links: object;
}) => {
  try {
    const fundingSource = await dwollaClient
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));

    return fundingSource;
  } catch (error) {
    console.error(error);
  }
};

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );

    const authLink = onDemandAuthorization.body._links;

    return authLink;
  } catch (error) {
    console.error(error);
  }
};

export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
}) => {
  try {
    const transfer = await dwollaClient
      .post("transfers", {
        _links: {
          source: { href: sourceFundingSourceUrl },
          destination: { href: destinationFundingSourceUrl },
        },
        amount: { currency: "USD", value: amount },
      })
      .then((res) => res.headers.get("location"));

    return transfer;
  } catch (error) {
    console.error(error);
  }
};
