import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
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
  navLinks?: Array<{ label: string; href: string; role?: string }>;
}

const Header = ({
  logo = "/logo.png",
  navLinks = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Admin", href: "/admin", role: "ROLE_ADMIN" },
  ],
}: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="fixed w-full bg-white shadow-lg z-50 top-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
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

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.filter((link) => {
            return !link.role || (user && user.roles.includes(link.role));
          }).map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-800 hover:text-blue-700 font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          {user && (
            <Link to="/dashboard" className="text-gray-800 hover:text-blue-700 font-medium transition-colors">
              Dashboard
            </Link>
          )}
          <Link to="/login" className="text-gray-800 hover:text-blue-700 font-medium transition-colors">Login</Link>
          <Link to="/signup" className="text-gray-800 hover:text-blue-700 font-medium transition-colors">Sign Up</Link>
          <Link to="/forgot-password" className="text-gray-800 hover:text-blue-700 font-medium transition-colors">Forgot Password</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector
            currentLanguage={i18n.language}
            onLanguageChange={(lang) => i18n.changeLanguage(lang)}
          />
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-gray-800">{user.firstName}</span>
              <Button onClick={handleLogout} className="bg-red-500 text-white">
                {t("logout", "Logout")}
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="font-semibold">
                {t("login.login") || "Login"}
              </Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-gray-700 hover:text-blue-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.filter((link) => {
              return !link.role || (user && user.roles.includes(link.role));
            }).map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-800 hover:text-blue-700 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {user && (
              <Link to="/dashboard" className="text-gray-800 hover:text-blue-700 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            <Link to="/login" className="text-gray-800 hover:text-blue-700 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="text-gray-800 hover:text-blue-700 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
            <Link to="/forgot-password" className="text-gray-800 hover:text-blue-700 font-medium transition-colors" onClick={() => setMobileMenuOpen(false)}>Forgot Password</Link>
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
              {user ? (
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 text-white w-full"
                >
                  {t("logout", "Logout")}
                </Button>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="font-semibold w-full">
                    {t("login.login") || "Login"}
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
