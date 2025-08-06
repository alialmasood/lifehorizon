"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "من نحن" },
    { href: "#services", label: "خدماتنا" },
    { href: "#projects", label: "مشاريعنا" },
    { href: "/services/game-store", label: "مركز الألعاب" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* الشعار */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Life Horizon Logo"
              width={40}
              height={40}
              className="w-auto h-10"
            />
            <span className={`text-xl font-bold ${
              isScrolled ? "text-white" : "text-primary-600"
            }`}>
              Life Horizon
            </span>
          </Link>

          {/* القائمة الرئيسية - للشاشات الكبيرة */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium transition-colors hover:text-primary-300 ${
                  isScrolled ? "text-white" : "text-primary-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* زر القائمة المتحركة - للشاشات الصغيرة */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary-400/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-white" : "text-primary-600"} />
            ) : (
              <Menu className={isScrolled ? "text-white" : "text-primary-600"} />
            )}
          </button>
        </div>

        {/* القائمة المتحركة - للشاشات الصغيرة */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-b-2xl shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-lg font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* تأثير الخلفية المتحركة */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="tech-grid opacity-10" />
      </div>

      {/* تأثير التدرج */}
      {isScrolled && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500" />
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5" />
        </div>
      )}
    </header>
  );
} 