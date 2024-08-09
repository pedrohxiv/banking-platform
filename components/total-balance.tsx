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
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">{banks} Bank Acconts</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>
          <div className="total-balance-amount flex-center gap-2">
            <Counter amount={currentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};
