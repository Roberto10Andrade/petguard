"use client";
import { usePathname } from "next/navigation";
import { NavbarWrapper } from "./NavbarWrapper";
 
export function ConditionalNavbar() {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/cadastro";
  return !hideNavbar ? <NavbarWrapper /> : null;
} 