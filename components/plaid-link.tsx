import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  usePlaidLink,
  type PlaidLinkOnSuccess,
  type PlaidLinkOptions,
} from "react-plaid-link";

import { createLinkToken, exchangePublicToken } from "@/actions/user";
import { Button } from "@/components/ui/button";

interface Props {
  user: User;
  dwollaCustomerId?: string;
  variant?: "primary" | "ghost";
}

export const PlaidLink = ({ user, dwollaCustomerId, variant }: Props) => {
  const [token, setToken] = useState<string>("");

  const router = useRouter();

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/");
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    onSuccess,
    token,
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    (async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken!);
    })();
  }, []);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          className="text-base rounded-lg -gradient-to-r from-[#0179FE] to-[#4893FF] font-semibold text-white shadow-lg"
          disabled={!ready}
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect Bank</Button>
      ) : (
        <Button>Connect Bank</Button>
      )}
    </>
  );
};
