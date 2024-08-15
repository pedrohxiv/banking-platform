"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/actions/user";
import { sidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  user: User;
}

export const Sidebar = ({ user }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();

    router.push("/sign-in");
  };

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            height={34}
            width={34}
            alt="logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="text-[16px] 2xl:text-[25px] font-bold text-black-primary max-xl:hidden">
            Banking Platform
          </h1>
        </Link>
        {sidebarLinks.map((link) => (
          <Link
            key={link.route}
            href={link.route}
            className={cn(
              "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
              {
                "bg-gradient-to-r from-[#0179FE] to-[#4893FF]":
                  pathname === link.route,
              }
            )}
          >
            <div className="relative size-6">
              <Image
                src={link.imgUrl}
                fill
                alt={link.label}
                className={cn({
                  "brightness-[3] invert-0": pathname === link.route,
                })}
              />
            </div>
            <p
              className={cn(
                "text-base font-semibold max-xl:hidden text-black-secondary",
                {
                  "text-white": pathname === link.route,
                }
              )}
            >
              {link.label}
            </p>
          </Link>
        ))}
      </nav>
      <footer className="flex items-center justify-between gap-2 py-6 border-t border-gray-200">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 max-xl:hidden">
          <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
        </div>
        <div className="flex flex-1 flex-col justify-center max-xl:hidden max-w-[150px]">
          <h1 className="text-sm truncate text-gray-700 font-semibold">
            {user.firstName}
          </h1>
          <p className="text-sm truncate font-normal text-gray-600">
            {user.email}
          </p>
        </div>
        <div
          className="cursor-pointer relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center"
          onClick={handleLogout}
        >
          <Image src="icons/logout.svg" fill alt="logout" />
        </div>
      </footer>
    </section>
  );
};
