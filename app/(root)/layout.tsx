import Header from "@/components/shared/Header";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LeftSideBar } from "@/components/shared/LeftSideBar";
import { ClerkProvider } from "@clerk/nextjs";
import BottomBar from "@/components/shared/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ORU",
  description: "ORU Phones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          <section className="flex">
            <LeftSideBar />
            {children}
          </section>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
