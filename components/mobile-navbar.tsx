"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/actions/user";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  user: User;
}

export const MobileNavbar = ({ user }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();

    router.push("sign-in");
  };

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <Image src="/icons/hamburger.svg" height={30} width={30} alt="menu" />
      </SheetTrigger>
      <SheetContent side="left" className="max-w-[264px] border-none">
        <Link
          href="/"
          className="cursor-pointer flex items-center py-1 mx-2 gap-2 w-fit"
        >
          <Image src="/icons/logo.svg" height={34} width={34} alt="logo" />
          <h1 className="text-[26px] leading-8 font-bold text-black-primary">
            Banking Platform
          </h1>
        </Link>
        <div className="flex h-[calc(100vh-96px)] sm:h-[calc(100vh-66px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <nav className="flex h-full flex-col gap-6 pt-16 text-white mx-2">
              {sidebarLinks.map((link) => (
                <SheetClose asChild key={link.route}>
                  <Link
                    href={link.route}
                    className={cn(
                      "flex gap-3 items-center p-4 rounded-lg w-full max-w-60",
                      {
                        "bg-primary": pathname === link.route,
                      }
                    )}
                  >
                    <Image
                      src={link.imgUrl}
                      height={20}
                      width={20}
                      alt={link.label}
                      className={cn({
                        "brightness-[3] invert-0": pathname === link.route,
                      })}
                    />
                    <p
                      className={cn(
                        "text-base font-semibold text-black-secondary",
                        {
                          "text-white": pathname === link.route,
                        }
                      )}
                    >
                      {link.label}
                    </p>
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetClose>
          <footer className="flex items-center justify-between gap-2 py-6 border-t border-gray-200">
            <div className="flex size-10 items-center justify-center rounded-full bg-gray-200">
              <p className="text-xl font-bold text-gray-700">
                {user.firstName[0]}
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-center max-w-[100px] sm:max-w-[250px]">
              <h1 className="text-sm truncate text-gray-700 font-semibold">
                {user.firstName}
              </h1>
              <p className="text-sm truncate font-normal text-gray-600">
                {user.email}
              </p>
            </div>
            <div
              className="cursor-pointer relative size-5"
              onClick={handleLogout}
            >
              <Image src="icons/logout.svg" fill alt="logout" />
            </div>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  );
};
