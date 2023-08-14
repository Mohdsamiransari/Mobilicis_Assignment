"use client";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { sidebarLinks } from "@/contants";

export const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 z-20 flex h-screen lg:w-3/12 w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname == link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                isActive && "bg-blue-800"
              }`}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className=" max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};
