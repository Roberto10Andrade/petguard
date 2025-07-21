"use client";
import { useState } from "react";
import { Navbar } from "./Navbar";
 
export function NavbarWrapper() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return <Navbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />;
} 