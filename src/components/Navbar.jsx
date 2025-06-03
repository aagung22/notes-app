"use client";
import { Menu, X, LogIn, LogOut, User, UserPlus } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
    closeSidebar();
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    const regex = new RegExp(`^${href}(/)?$`);
    return regex.test(pathname);
  };

  return (
    <div className="w-full sticky top-0 z-50 shadow-md bg-zinc-900">
      <nav className="bg-zinc-900 px-6 py-5 md:py-6 text-white">
        <div className="flex items-center justify-between w-full">
          <Link
            href="/"
            className="text-center text-3xl bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-bold"
          >
            Notes App
          </Link>

          <div className="flex items-center space-x-4 md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <Menu className="text-white" size={24} />
            </button>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Me" },
              { href: "/notes", label: "List Notes" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-slate-800 text-white"
                    : "text-white hover:bg-slate-700"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded" />
                )}
              </Link>
            ))}

            {isLoggedIn && (
              <Link
                href="/notes/create"
                className={`relative px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive("/notes/create")
                    ? "bg-slate-800 text-white"
                    : "text-white hover:bg-slate-700"
                }`}
              >
                Create Notes
                {isActive("/notes/create") && (
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded" />
                )}
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback className="bg-black text-white">
                    <User size={22} />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isLoggedIn ? (
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => router.push("/login")}>
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/register")}>
                      <UserPlus className="mr-2 h-4 w-4" /> Register
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto bg-zinc-900/80"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      >
        <div
          className={`w-64 bg-zinc-900 p-6 space-y-6 transform transition-transform duration-300 ease-in-out h-full shadow-lg ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div className="text-center text-3xl bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-bold select-none cursor-default">
              Notes App
            </div>
            <button
              aria-label="Close menu"
              onClick={closeSidebar}
              className="p-1 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <X className="text-white" size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-3 mt-6">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/notes", label: "List Notes" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={`relative px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-slate-800 text-emerald-400"
                    : "text-white hover:bg-slate-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn && (
              <Link
                href="/notes/create"
                onClick={closeSidebar}
                className={`relative px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive("/notes/create")
                    ? "bg-slate-800 text-emerald-400"
                    : "text-white hover:bg-slate-700"
                }`}
              >
                Create Notes
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white text-left font-medium px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeSidebar}
                  className="text-white font-medium px-4 py-2 rounded-md hover:bg-slate-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeSidebar}
                  className="text-white font-medium px-4 py-2 rounded-md hover:bg-slate-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}