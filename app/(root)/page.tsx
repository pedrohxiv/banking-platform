import { Header } from "@/components/header";
import { TotalBalance } from "@/components/total-balance";

const RootPage = () => {
  const user = { firstName: "John" };

  return (
    <section className="home">
      <div className="home-content">
        <Header
          subtext="Access and manage your account and transactions efficiently."
          title="Welcome"
          type="greeting"
          user={user.firstName || "Guest"}
        />
        <TotalBalance accounts={[]} banks={1} currentBalance={1250.35} />
      </div>
    </section>
  );
};

export default RootPage;
