"use client";

import { sidebarLinks } from "@/contants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="sticky bottom-0 z-20 w-full rounded-t-3xl bg-white p-4  xs:px-7 md:hidden border-t ">
      <div className="flex items-center justify-around gap-3 xs:gap-5">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname == link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${
                isActive && "bg-primary-500"
              }`}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BottomBar;
