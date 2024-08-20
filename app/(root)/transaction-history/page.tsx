import { redirect } from "next/navigation";

import { getAccount, getAccounts } from "@/actions/account";
import { getLoggedInUser } from "@/actions/user";
import { Header } from "@/components/header";
import { TransactionsTable } from "@/components/transactions-table";
import { formatAmount } from "@/lib/utils";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const TransactionHistoryPage = async ({ searchParams }: Props) => {
  const user = await getLoggedInUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const accounts = await getAccounts({ userId: user.$id });

  if (!accounts) {
    return;
  }

  const account = await getAccount({
    appwriteItemId:
      (searchParams.id as string) || accounts.data[0].appwriteItemId,
  });

  return (
    <section className="no-scrollbar flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="no-scrollbar flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <Header
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-lg border-y bg-blue-600 px-4 py-5 md:flex-row">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg leading-[22px] font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-sm text-blue-25">{account?.data.officialName}</p>
            <p className="text-sm font-semibold tracking-[1.1px] text-white">
              &#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679;{" "}
              &#9679;&#9679;&#9679;&#9679;{" "}
              <span className="text-base">{account?.data.mask}</span>
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-2 rounded-md bg-blue-25/20 px-4 py-2 text-white">
            <p className="text-sm">Current Balance</p>
            <p className="text-2xl leading-[30px] text-center font-bold">
              {formatAmount(account?.data.currentBalance!)}
            </p>
          </div>
        </div>
        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={account?.transactions} />
        </section>
      </div>
    </section>
  );
};

export default TransactionHistoryPage;
