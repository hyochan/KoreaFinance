"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  HouseIcon,
  NewspaperIcon,
  UsersIcon,
  GearIcon,
  SignOutIcon,
  PenNibIcon,
  ArrowSquareOutIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    // TODO: Add logout logic
    console.log("Logout clicked");
  };

  const menuItems = [
    {
      href: "/admin",
      label: "대시보드",
      icon: HouseIcon,
    },
    {
      href: "/admin/actors",
      label: "배우",
      icon: UserCircleIcon,
    },
    {
      href: "/admin/columns",
      label: "칼럼 관리",
      icon: PenNibIcon,
    },
    {
      href: "/admin/briefings",
      label: "브리핑 관리",
      icon: NewspaperIcon,
    },
    {
      href: "/admin/subscribers",
      label: "구독자 관리",
      icon: UsersIcon,
    },
    {
      href: "/admin/settings",
      label: "설정",
      icon: GearIcon,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-primary text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8 brightness-0 invert"
          />
          <div>
            <div className="font-bold">대한금융</div>
            <div className="text-xs text-white/60">Admin</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive(item.href)
                ? "bg-white/10 text-white"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5" weight={isActive(item.href) ? "fill" : "regular"} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        >
          <ArrowSquareOutIcon className="w-5 h-5" />
          <span>사이트 보기</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        >
          <SignOutIcon className="w-5 h-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
