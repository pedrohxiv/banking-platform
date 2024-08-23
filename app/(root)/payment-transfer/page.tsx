import { redirect } from "next/navigation";

import { getAccounts } from "@/actions/account";
import { getLoggedInUser } from "@/actions/user";
import { Header } from "@/components/header";

import { PaymentTransferForm } from "./_components/payment-transfer-form";

const PaymentTransferPage = async () => {
  const user = await getLoggedInUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const accounts = await getAccounts({ userId: user.$id });

  if (!accounts) {
    return;
  }

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <Header
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer."
      />
      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accounts.data} />
      </section>
    </section>
  );
};

export default PaymentTransferPage;
