import { Counter } from "@/components/counter";
import { DoughnutChart } from "@/components/doughnut-chart";

interface Props {
  accounts: [];
  banks: number;
  currentBalance: number;
}

export const TotalBalance = ({
  accounts = [],
  banks,
  currentBalance,
}: Props) => {
  return (
    <section className="flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-md sm:gap-6 sm:p-6">
      <div className="flex size-full max-w-[100px] items-center sm:max-w-[120px]">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-lg leading-[22px] font-semibold text-gray-900">
          {banks} Bank Acconts
        </h2>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-600">
            Total Current Balance
          </p>
          <div className="text-2xl leading-[30px] lg:text-3xl lg:leading-[38px] flex-1 font-semibold text-gray-900 flex items-center justify-center gap-2">
            <Counter amount={currentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};
