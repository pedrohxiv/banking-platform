import { Header } from "@/components/header";
import { RightSidebar } from "@/components/right-sidebar";
import { TotalBalance } from "@/components/total-balance";

const RootPage = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@mail.com",
  };

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <Header
            subtext="Access and manage your account and transactions efficiently."
            title="Welcome"
            type="greeting"
            user={user.firstName || "Guest"}
          />
          <TotalBalance accounts={[]} banks={1} currentBalance={1250.35} />
        </header>
      </div>
      <RightSidebar
        user={user}
        transactions={[]}
        banks={[
          { name: user.firstName, currentBalance: 123.5 },
          { name: user.firstName, currentBalance: 45.5 },
        ]}
      />
    </section>
  );
};

export default RootPage;
