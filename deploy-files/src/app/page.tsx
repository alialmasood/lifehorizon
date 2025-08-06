import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { MotivationSection } from "@/components/sections/motivation-section";
import AboutSection from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CoursesSection } from "@/components/sections/courses-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MotivationSection />
      <CoursesSection />
      <ContactSection />
    </main>
  );
}
