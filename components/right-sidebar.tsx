import Image from "next/image";
import Link from "next/link";

import { BankCard } from "@/components/bank-card";
import { Progress } from "@/components/ui/progress";
import { cn, countTransactionCategories } from "@/lib/utils";

const categoryStyles = {
  "Food and Drink": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

interface Props {
  accounts: Account[];
  transactions: Transaction[];
  user: User;
}

export const RightSidebar = ({ accounts, transactions, user }: Props) => {
  const categories = countTransactionCategories(transactions);

  return (
    <aside className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll">
      <section className="flex flex-col pb-8">
        <div className="h-[120px] w-full bg-gradient-mesh bg-cover bg-no-repeat" />
        <div className="relative flex px-6 max-xl:justify-center">
          <div className="flex items-center justify-center absolute -top-8 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-xl">
            <span className="text-5xl font-bold text-blue-500">
              {user.firstName[0]}
            </span>
          </div>
          <div className="flex flex-col pt-24">
            <h1 className="text-2xl leading-[30px] font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-base font-normal text-gray-600">{user.email}</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-between gap-8 px-6">
        <div className="flex w-full justify-between">
          <h2 className="text-lg leading-[22px] font-semibold text-gray-900">
            My Banks
          </h2>
          <Link href="/" className="flex gap-2">
            <Image src="/icons/plus.svg" height={20} width={20} alt="plus" />
            <h2 className="text-sm font-semibold text-gray-600">Add Bank</h2>
          </Link>
        </div>
        {accounts.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div
              className={cn("relative z-10", {
                "-ml-4": accounts[1],
              })}
            >
              <BankCard
                account={accounts[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {accounts[1] && (
              <div className="absolute right-0 top-8 z-0 -mr-4">
                <BankCard
                  account={accounts[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="text-lg leading-[22px] font-semibold text-gray-900">
            Top Categories
          </h2>
          <div className="space-y-5">
            {categories.map((category) => {
              const { bg, circleBg, text, progress, icon } =
                categoryStyles[category.name as keyof typeof categoryStyles] ||
                categoryStyles.default;

              return (
                <div
                  key={category.name}
                  className={cn("gap-[18px] flex p-4 rounded-xl", bg)}
                >
                  <figure
                    className={cn(
                      "flex items-center justify-center size-10 rounded-full",
                      circleBg
                    )}
                  >
                    <Image
                      src={icon}
                      height={20}
                      width={20}
                      alt={category.name}
                    />
                  </figure>
                  <div className="flex w-full flex-1 flex-col gap-2">
                    <div className="text-sm flex justify-between">
                      <h2 className={cn("font-medium", text.main)}>
                        {category.name}
                      </h2>
                      <h3 className={cn("font-normal", text.count)}>
                        {category.count}
                      </h3>
                    </div>
                    <Progress
                      value={(category.count / category.totalCount) * 100}
                      className={cn("h-2 w-full", progress.bg)}
                      indicatorClassName={cn("h-2 w-full", progress.indicator)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </aside>
  );
};
