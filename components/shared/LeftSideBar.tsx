'use client'
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";
const LeftSideBar = () => {
  const pathName = usePathname()
  return (
    <section className="leftsidebar custom-scrollbar">
      <div className="flex w-full flex-1 flex-col gap-2">
        {sidebarLinks.map((link) => {
          const isActive = (pathName.includes(link.route) && link.route.length > 1) ||
          pathName === link.route;
          return (
            <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive && "bg-[#2d2d2d] text-slate-100 font-[600]"}`}>
              {/* <Image /> */}
              <p>{link.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  );
};

export default LeftSideBar;
