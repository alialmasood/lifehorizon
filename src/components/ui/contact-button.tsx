"use client";

import { ClientButton } from "./client-button";

export function ContactButton() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ClientButton
      size="lg"
      onClick={scrollToContact}
      className="mt-4"
    >
      تواصل معنا
    </ClientButton>
  );
} 