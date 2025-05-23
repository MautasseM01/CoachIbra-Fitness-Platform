import React, { useState, useEffect } from "react";
import { Menu, X, Globe, LogOut, User, Info } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  getCurrentSession,
  signOut,
  UserSession,
  authStateChange,
  initAuthListener,
} from "../lib/auth";

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
  ],
}: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<UserSession>({
    user: null,
    isAuthenticated: false,
  });

  const location = useLocation();

  // Function to fetch and update session
  const fetchAndUpdateSession = async () => {
    const currentSession = await getCurrentSession();
    setSession(currentSession);
  };

  useEffect(() => {
    // Initialize auth listener on component mount
    initAuthListener();

    // Fetch session on initial load
    fetchAndUpdateSession();

    // Listen for auth state changes
    const handleAuthChange = () => {
      fetchAndUpdateSession();
    };

    authStateChange.addEventListener("authChange", handleAuthChange);
    authStateChange.addEventListener("signOut", handleAuthChange);

    return () => {
      // Clean up event listeners
      authStateChange.removeEventListener("authChange", handleAuthChange);
      authStateChange.removeEventListener("signOut", handleAuthChange);
    };
  }, []);

  // Re-fetch session when location changes
  useEffect(() => {
    fetchAndUpdateSession();
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
    setSession({ user: null, isAuthenticated: false });
    navigate("/");
  };

  return (
    <TooltipProvider>
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
              <span className="text-xl font-bold text-gray-900">
                Coach Ibra
              </span>
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
              {t("header.bookNow") || "Book Now"}
            </Button>

            {session.isAuthenticated ? (
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="font-semibold flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center overflow-hidden">
                          {session.user?.name ? (
                            <span className="text-xs font-bold">
                              {session.user.name.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <User size={14} />
                          )}
                        </div>
                        <span className="max-w-[120px] truncate">
                          {session.user?.name ||
                            session.user?.email ||
                            t("header.account") ||
                            "Account"}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("header.accountTooltip") || "Manage your account"}</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end">
                  {session.user?.role === "ROLE_ADMIN" && (
                    <>
                      <DropdownMenuItem
                        onClick={() => navigate("/admin")}
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/30"
                      >
                        {t("header.adminDashboard") || "Admin Dashboard"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:text-red-700 dark:focus:text-red-300"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("header.logout") || "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/login">
                      <Button
                        variant="outline"
                        className="font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        {t("login.login") || "Login"}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {t("header.loginTooltip") || "Sign in to your account"}
                    </p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/register">
                      <Button
                        variant="secondary"
                        className="font-semibold hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                      >
                        {t("signup.signUp") || "Sign Up"}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("header.signupTooltip") || "Create a new account"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
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

                {session.isAuthenticated ? (
                  <>
                    {session.user?.role === "ROLE_ADMIN" && (
                      <Button
                        variant="secondary"
                        className="font-semibold w-full mb-2"
                        onClick={() => {
                          navigate("/admin");
                          setMobileMenuOpen(false);
                        }}
                      >
                        {t("header.adminDashboard") || "Admin Dashboard"}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="font-semibold w-full"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("header.logout") || "Logout"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="font-semibold w-full"
                      >
                        {t("login.login") || "Login"}
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full mt-2"
                    >
                      <Button
                        variant="secondary"
                        className="font-semibold w-full"
                      >
                        {t("signup.signUp") || "Sign Up"}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </TooltipProvider>
  );
};

export default Header;
