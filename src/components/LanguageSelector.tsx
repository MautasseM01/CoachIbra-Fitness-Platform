import React from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface LanguageSelectorProps {
  onLanguageChange?: (language: string) => void;
  currentLanguage?: string;
}

const languages = [
  { code: "fr", name: "Français" },
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
];

const LanguageSelector = ({
  onLanguageChange,
  currentLanguage,
}: LanguageSelectorProps) => {
  const { i18n } = useTranslation();

  // Use i18n.language as the source of truth
  const selected = currentLanguage || i18n.language;

  const handleLanguageSelect = (code: string) => {
    // Change language using i18next
    i18n.changeLanguage(code);

    // Update document language attribute
    document.documentElement.lang = code;

    // Call the callback if provided
    if (onLanguageChange) {
      onLanguageChange(code);
    }
  };

  const getCurrentLanguageName = () => {
    return languages.find((lang) => lang.code === selected)?.name || "English";
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>{getCurrentLanguageName()}</span>
          </div>
          <ChevronDown className="h-4 w-4 ml-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[120px]">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              className={`cursor-pointer ${selected === language.code ? "bg-gray-100 dark:bg-gray-700 font-bold" : ""}`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              {language.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
