"use client";

import CountUp from "react-countup";

interface Props {
  amount: number;
}

export const Counter = ({ amount }: Props) => {
  return (
    <div className="w-full">
      <CountUp end={amount} decimal="," decimals={2} prefix="$" />
    </div>
  );
};
