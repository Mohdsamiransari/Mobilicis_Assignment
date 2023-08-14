"use client";
import {
  SignOutButton,
  SignedIn,
  UserButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";

import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-6 border border-b-[#CECECE] bg-[#ffffff]">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="max-xs:hidden">ORU</p>
      </Link>

      <div className="flex items-center gap-4 ">
        <div className="cursor-pointer">
          <Image src="/assets/bell.svg" alt="logout" width={18} height={18} />
        </div>
        <UserButton />
        <OrganizationSwitcher 
          
        />
      </div>
    </nav>
  );
};

export default Header;
