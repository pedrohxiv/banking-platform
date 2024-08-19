import Image from "next/image";
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
          className="text-base rounded-lg -gradient-to-r from-[#a2a3a5] to-[#4893FF] font-semibold text-white shadow-lg"
          disabled={!ready}
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          onClick={() => open()}
          variant="ghost"
          className="flex cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-7 hover:bg-white lg:justify-start"
        >
          <Image
            src="/icons/connect-bank.svg"
            height={24}
            width={24}
            alt="connect bank"
          />
          <p className="hidden text-base font-semibold text-black-secondary xl:block">
            Connect bank
          </p>
        </Button>
      ) : (
        <Button
          onClick={() => open()}
          className="flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start bg-transparent hover:bg-transparent"
        >
          <Image
            src="/icons/connect-bank.svg"
            height={24}
            width={24}
            alt="connect bank"
          />
          <p className="text-base font-semibold max-2xl:hidden text-black-secondary">
            Connect bank
          </p>
        </Button>
      )}
    </>
  );
};
