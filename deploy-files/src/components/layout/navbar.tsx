"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "من نحن", href: "/#about" },
  { name: "خدماتنا", href: "/#services" },
  { name: "مركز الألعاب", href: "/services/game-store" },
  { name: "الدورات", href: "/#courses" },
  { name: "تواصل معنا", href: "/#contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="شعار شركة أفق الحياة"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-primary dark:text-primary">أفق الحياة</span>
            </Link>

            {/* Desktop Navigation Placeholder */}
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <span
                  key={item.name}
                  className="text-gray-600 dark:text-gray-300 transition-colors header-link"
                >
                  {item.name}
                </span>
              ))}
              <div className="w-8 h-8" /> {/* ThemeToggle placeholder */}
            </div>

            {/* Mobile Menu Button Placeholder */}
            <div className="md:hidden flex items-center gap-4">
              <div className="w-8 h-8" /> {/* ThemeToggle placeholder */}
              <div className="w-10 h-10" /> {/* Menu button placeholder */}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo.png"
                alt="شعار شركة أفق الحياة"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-primary dark:text-primary">أفق الحياة</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors header-link"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-primary dark:text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary dark:text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/10">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* تأثير الخلفية المتحركة */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="tech-grid opacity-5" />
      </div>
    </nav>
  );
} 