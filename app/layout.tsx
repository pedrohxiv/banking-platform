import type { Metadata } from "next";
import { IBM_Plex_Serif, Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import "@/styles/global.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

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
      <body className={cn(inter.variable, ibmPlexSerif.variable)}>
        {children}
      </body>
    </html>
  );
};

export default AppLayout;
