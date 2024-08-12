"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
