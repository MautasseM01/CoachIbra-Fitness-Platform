import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeroSectionProps {
  title?: string;
  tagline?: string;
  backgroundImage?: string;
  coachImage?: string;
  programs?: {
    name: string;
    href: string;
  }[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "hero.title",
  tagline = "hero.tagline",
  backgroundImage = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1920&q=80",
  coachImage = "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80",
  programs = [
    { name: "hero.personalTraining", href: "#personal-training" },
    { name: "hero.groupClasses", href: "#group-classes" },
    { name: "hero.kidsProgram", href: "#kids-program" },
  ],
}) => {
  const { t } = useTranslation();
  return (
    <section className="relative h-[700px] w-full overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-white md:flex-row md:items-center md:justify-between md:px-16 lg:px-24">
        {/* Text Content */}
        <div className="mb-8 max-w-xl text-center md:mb-0 md:text-left">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white drop-shadow-lg">
            {t(title)}
          </h1>
          <p className="mb-8 text-lg font-medium italic md:text-xl lg:text-2xl text-white drop-shadow-md">
            "{t(tagline)}"
          </p>

          {/* Quick Access Booking Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            {programs.map((program, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={`${index === 0 ? "bg-red-700 hover:bg-red-800" : "border-white text-white bg-black/40 hover:bg-white/20"} transition-all duration-300 font-semibold`}
                asChild
              >
                <a href={program.href}>
                  {t(program.name)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Coach Image */}
        <div className="hidden md:block">
          <div className="relative h-[400px] w-[300px] overflow-hidden rounded-lg border-4 border-white/20 shadow-2xl">
            <img
              src={coachImage}
              alt="Coach Ibra"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500"></div>
    </section>
  );
};

export default HeroSection;
