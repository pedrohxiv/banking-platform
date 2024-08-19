import { redirect } from "next/navigation";

import { getAccount, getAccounts } from "@/actions/account";
import { getLoggedInUser } from "@/actions/user";
import { Header } from "@/components/header";
import { RecentTransactions } from "@/components/recent-transactions";
import { RightSidebar } from "@/components/right-sidebar";
import { TotalBalance } from "@/components/total-balance";

const RootPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const user = await getLoggedInUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const accounts = await getAccounts({ userId: user.$id });

  if (!accounts) {
    return;
  }

  const appwriteItemId =
    (searchParams.id as string) || accounts.data[0].appwriteItemId;

  const account = await getAccount({
    appwriteItemId,
  });

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <Header
            subtext="Access and manage your account and transactions efficiently."
            title="Welcome"
            type="greeting"
            user={`${user.firstName} ${user.lastName}` || "Guest"}
          />
          <TotalBalance
            accounts={accounts.data}
            banks={accounts.banks}
            currentBalance={accounts.currentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accounts.data}
          transactions={account?.transactions}
          appwriteItemId={accounts.data[0].appwriteItemId}
          page={+(searchParams.page as string) || 1}
        />
      </div>
      <RightSidebar
        user={user}
        transactions={account?.transactions}
        banks={accounts.data.slice(0, 2)}
      />
    </section>
  );
};

export default RootPage;
