"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn, formatAmount } from "@/lib/utils";

interface Props {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

export const BankCard = ({ account, userName, showBalance = true }: Props) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(account.sharaebleId);

    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="relative flex h-[190px] w-full max-w-[320px] justify-between rounded-[20px] border border-white shadow-lg backdrop-blur-[6px]"
      >
        <div
          className={cn(
            "relative z-10 flex size-full max-w-[218px] flex-col justify-between rounded-l-[20px] px-5 pb-4 pt-5",
            {
              "bg-gradient-to-r from-[#0179FE] to-[#4893FF]":
                account.type !== "credit",
              "bg-gray-700": account.type === "credit",
            }
          )}
        >
          <h1 className="text-base font-semibold text-white">{userName}</h1>
          <p className="font-black text-white">
            {formatAmount(account.currentBalance)}
          </p>
          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-xs font-semibold text-white">{userName}</h1>
              <h2 className="text-xs font-semibold text-white">
                &#9679;&#9679; / &#9679;&#9679;
              </h2>
            </div>
            <p className="text-sm font-semibold text-white">
              &#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679;{" "}
              &#9679;&#9679;&#9679;&#9679;{" "}
              <span className="text-base">{account.mask}</span>
            </p>
          </article>
        </div>
        <div
          className={cn(
            "flex size-full flex-1 flex-col items-end justify-between rounded-r-[20px] bg-cover bg-center bg-no-repeat py-5 pr-5",
            {
              "bg-primary": account.type !== "credit",
              "bg-gradient-mesh": account.type === "credit",
            }
          )}
        >
          <Image
            src="/icons/paypass.svg"
            height={24}
            width={20}
            alt="paypass"
          />
          <Image
            src="/icons/mastercard.svg"
            height={32}
            width={45}
            alt="mastercard"
            className="ml-5 z-10"
          />
        </div>
        <Image
          src="/icons/lines.svg"
          height={190}
          width={316}
          alt="lines"
          className="absolute top-0 left-0"
        />
      </Link>
      {showBalance && (
        <Button
          data-state="closed"
          className="mt-3 flex max-w-[320px] gap-4"
          variant="secondary"
          onClick={copyToClipboard}
        >
          <p className="line-clamp-1 w-full max-w-full text-xs font-medium text-black-secondary">
            {account.sharaebleId}
          </p>
          {!hasCopied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="mr-2 size-4"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="mr-2 size-4"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </Button>
      )}
    </div>
  );
};
