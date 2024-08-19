"use server";

import type { CountryCode } from "plaid";

import { plaidClient } from "@/lib/plaid";

export const getInstitution = async ({
  institutionId,
}: {
  institutionId: string;
}) => {
  try {
    const institution = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    return institution.data.institution;
  } catch (error) {
    console.error(error);
  }
};
