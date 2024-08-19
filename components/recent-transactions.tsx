"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { TransactionsTable } from "@/components/transactions-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountTypeColors } from "@/lib/constants";
import { cn, formatAmount, formUrlQuery } from "@/lib/utils";

interface Props {
  accounts: Account[];
  appwriteItemId: string;
  page: number;
  transactions: Transaction[];
}

export const RecentTransactions = ({
  accounts,
  appwriteItemId,
  page,
  transactions = [],
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBankChange = (account: Account) => {
    const url = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(url, { scroll: false });
  };

  return (
    <section className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl leading-6 md:text-2xl md:leading-[30px] font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="text-sm rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          View all
        </Link>
      </header>
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="custom-scrollbar mb-8 flex w-full flex-nowrap">
          {accounts.map((account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <div
                onClick={() => handleBankChange(account)}
                className="gap-[18px] flex px-2 sm:px-4 py-2 transition-all"
              >
                <p className="text-base line-clamp-1 flex-1 font-medium">
                  {account.name}
                </p>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((account) => (
          <TabsContent
            key={account.id}
            value={account.appwriteItemId}
            className="space-y-4"
          >
            <div
              onClick={() => handleBankChange(account)}
              className={cn(
                "gap-[18px] flex p-4 transition-all border bg-blue-25 border-transparent rounded-xl hover:shadow-sm cursor-pointer shadow-sm hover:border-blue-700",
                accountTypeColors(account.type as AccountTypes).bg
              )}
            >
              <figure
                className={cn(
                  "flex-center h-fit rounded-full bg-blue-100",
                  accountTypeColors(account.type as AccountTypes).lightBg
                )}
              >
                <Image
                  src="/icons/connect-bank.svg"
                  height={20}
                  width={20}
                  alt={account.subtype}
                  className="m-2 min-w-5"
                />
              </figure>
              <div className="flex w-full flex-1 flex-col justify-center gap-1">
                <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden">
                  <h2
                    className={cn(
                      "text-16 line-clamp-1 flex-1 font-bold text-blue-900",
                      accountTypeColors(account.type as AccountTypes).title
                    )}
                  >
                    {account.name}
                  </h2>
                  <p
                    className={cn(
                      "text-12 rounded-full px-3 py-1 font-medium text-blue-700",
                      accountTypeColors(account.type as AccountTypes).subText,
                      accountTypeColors(account.type as AccountTypes).lightBg
                    )}
                  >
                    {account.subtype}
                  </p>
                </div>

                <p
                  className={cn(
                    "text-16 font-medium text-blue-700",
                    accountTypeColors(account.type as AccountTypes).subText
                  )}
                >
                  {formatAmount(account.currentBalance)}
                </p>
              </div>
            </div>
            <TransactionsTable transactions={transactions} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
