"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "./translations";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setThemeState] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // 1. Language persistence
    const savedLang = localStorage.getItem("portfolio_lang") as Language;
    if (savedLang === "en" || savedLang === "th") {
      setLanguageState(savedLang);
    }

    // 2. Theme persistence
    const savedTheme = localStorage.getItem("portfolio_theme") as "dark" | "light";
    if (savedTheme === "dark" || savedTheme === "light") {
      setThemeState(savedTheme);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(savedTheme);
    } else {
      // Default to dark or system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "dark"; // Default dark for Wope aesthetic
      setThemeState(initialTheme);
      document.documentElement.classList.add(initialTheme);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setThemeState(nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(nextTheme);
  };

  const t = translations[language];

  return (
    <AppContext.Provider value={{ language, setLanguage, t, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
