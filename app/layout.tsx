import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import "@/styles/global.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banking Platform",
  description: "Modern banking platform for everyone.",
  icons: { icon: "/icons/logo.svg" },
};

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <html>
      <body className={font.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default AppLayout;
