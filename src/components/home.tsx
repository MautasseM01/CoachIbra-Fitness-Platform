import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import ScheduleSection from "./ScheduleSection";
import TestimonialsSection from "./TestimonialsSection";
import SocialMediaSection from "./SocialMediaSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Schedule Section */}
        <ScheduleSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Social Media Section */}
        <SocialMediaSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
