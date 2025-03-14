import React, { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface LanguageSelectorProps {
  languages?: Array<{ code: string; name: string }>;
  currentLanguage?: string;
  onLanguageChange?: (code: string) => void;
}

// Inline LanguageSelector component since the imported one isn't available yet
const LanguageSelector = ({
  languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
  ],
  currentLanguage = "en",
  onLanguageChange = () => {},
}: LanguageSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe size={16} />
          <span>
            {languages.find((lang) => lang.code === currentLanguage)?.name ||
              "English"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={
              currentLanguage === language.code
                ? "bg-gray-100 dark:bg-blue-700 dark:text-white font-bold"
                : ""
            }
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface HeaderProps {
  logo?: string;
  navLinks?: Array<{ label: string; href: string }>;
}

const Header = ({
  logo = "/logo.png",
  navLinks = [
    { label: "header.home", href: "#" },
    { label: "header.services", href: "#services" },
    { label: "header.schedule", href: "#schedule" },
    { label: "header.testimonials", href: "#testimonials" },
    { label: "header.contact", href: "#contact" },
    { label: "Admin", href: "/admin" },
  ],
}: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <img
              src={logo}
              alt="Coach Ibra Logo"
              className="h-12 w-auto mr-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=coach-ibra";
              }}
            />
            <span className="text-xl font-bold text-gray-900">Coach Ibra</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-800 hover:text-blue-700 font-medium transition-colors"
            >
              {t(link.label)}
            </a>
          ))}
        </nav>

        {/* Language Selector and Contact Button */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector
            currentLanguage={i18n.language}
            onLanguageChange={(lang) => i18n.changeLanguage(lang)}
          />
          <ThemeToggle />
          <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">
            {t("header.bookNow")}
          </Button>
          <Link to="/login">
            <Button variant="outline" className="font-semibold">
              {t("login.login") || "Login"}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-800 hover:text-blue-700 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.label)}
              </a>
            ))}
            <div className="pt-2 flex flex-col space-y-3">
              <div className="flex gap-2 items-center">
                <LanguageSelector
                  currentLanguage={i18n.language}
                  onLanguageChange={(code) => {
                    i18n.changeLanguage(code);
                    setMobileMenuOpen(false);
                  }}
                />
                <ThemeToggle />
              </div>
              <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold w-full">
                {t("header.bookNow")}
              </Button>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="font-semibold w-full">
                  {t("login.login") || "Login"}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
