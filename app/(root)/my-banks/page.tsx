import { redirect } from "next/navigation";

import { getAccounts } from "@/actions/account";
import { getLoggedInUser } from "@/actions/user";
import { BankCard } from "@/components/bank-card";
import { Header } from "@/components/header";

const MyBanksPage = async () => {
  const user = await getLoggedInUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const accounts = await getAccounts({ userId: user.$id });

  if (!accounts) {
    return;
  }

  return (
    <section className="flex">
      <div className="no-scroll flex h-screen max-h-screen w-full flex-col gap-8 bg-gray-25 p-8 xl:py-12">
        <Header
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />
        <div className="space-y-4">
          <h2 className="text-lg leading-[22px] font-semibold text-gray-900">
            Your Cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((account) => (
                <BankCard
                  key={account.id}
                  account={account}
                  userName={user.firstName}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanksPage;
