import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getLoggedInUser } from "@/actions/user";
import { MobileNavbar } from "@/components/mobile-navbar";
import { Sidebar } from "@/components/sidebar";

interface Props {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Props) => {
  const user = await getLoggedInUser();

  if (!user) {
   return redirect("/sign-in");
  }

  return (
    <main className="flex h-screen w-full">
      <Sidebar user={user} />
      <div className="flex size-full flex-col">
        <div className="flex h-16 items-center justify-between p-5 shadow-lg sm:p-8 md:hidden">
          <Link href="/" className="cursor-pointer">
            <Image src="/icons/logo.svg" height={30} width={30} alt="logo" />
          </Link>
          <div>
            <MobileNavbar user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default RootLayout;
