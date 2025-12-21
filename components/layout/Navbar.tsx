"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ListIcon, XIcon, UserIcon, SignOutIcon, UserCircleIcon, SpinnerGapIcon, GearSixIcon } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const profile = useQuery(
    api.userProfiles.query.getCurrentUserProfile,
    isAuthenticated ? {} : "skip"
  );

  const isLoggedIn = isAuthenticated;
  const userName = profile?.displayName || profile?.email?.split("@")[0] || "사용자";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { href: "/", label: "홈" },
    { href: "/briefings", label: "브리핑" },
    { href: "/subscribe", label: "구독" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-lg font-bold text-primary">대한금융</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Section */}
            {isLoading ? (
              <SpinnerGapIcon className="w-5 h-5 animate-spin text-gray-400" />
            ) : isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="relative w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                    {profile?.avatarUrl ? (
                      <Image
                        src={profile.avatarUrl}
                        alt="프로필"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userName}</span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>프로필</span>
                    </Link>
                    {profile?.isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <GearSixIcon className="w-4 h-4" />
                        <span>관리자</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <SignOutIcon className="w-4 h-4" />
                      <span>로그아웃</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary"
            aria-label="Toggle menu"
          >
            {isOpen ? <XIcon className="w-6 h-6" /> : <ListIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={clsx(
            "md:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-primary py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Section (Mobile) */}
            {isLoading ? (
              <div className="flex justify-center py-3">
                <SpinnerGapIcon className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            ) : isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-gray-600 hover:text-primary py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <UserIcon className="w-5 h-5" />
                  프로필
                </Link>
                {profile?.isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-gray-600 hover:text-primary py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <GearSixIcon className="w-5 h-5" />
                    관리자
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 text-gray-600 hover:text-primary py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-left"
                >
                  <SignOutIcon className="w-5 h-5" />
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white py-3 px-4 rounded-lg font-medium text-center mt-2"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
