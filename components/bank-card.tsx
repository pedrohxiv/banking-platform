import Link from "next/link";

import { cn, formatAmount } from "@/lib/utils";
import Image from "next/image";

interface Props {
  account: Account;
  userName: string;
  showBalance?: boolean;
  specialCard?: boolean;
}

export const BankCard = ({
  account,
  userName,
  showBalance = true,
  specialCard,
}: Props) => {
  return (
    <div className="flex flex-col">
      <Link
        href="/"
        className="relative flex h-[190px] w-full max-w-[320px] justify-between rounded-[20px] border border-white shadow-lg backdrop-blur-[6px]"
      >
        <div
          className={cn(
            "relative z-10 flex size-full max-w-[218px] flex-col justify-between rounded-l-[20px] px-5 pb-4 pt-5",
            {
              "bg-gradient-to-r from-[#0179FE] to-[#4893FF]": !specialCard,
              "bg-gray-700": specialCard,
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
            <p className="text-sm font-semibold tracking-[1.1px] text-white">
              &#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679;{" "}
              &#9679;&#9679;&#9679;&#9679;{" "}
              <span className="text-base">1234</span>
            </p>
          </article>
        </div>
        <div
          className={cn(
            "flex size-full flex-1 flex-col items-end justify-between rounded-r-[20px] bg-cover bg-center bg-no-repeat py-5 pr-5",
            {
              "bg-primary": !specialCard,
              "bg-gradient-mesh": specialCard,
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
    </div>
  );
};
