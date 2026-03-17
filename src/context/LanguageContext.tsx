import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "sw";

const translations: Record<string, Record<Language, string>> = {
  home: { en: "Home", sw: "Nyumbani" },
  shop: { en: "Shop", sw: "Duka" },
  categories: { en: "Categories", sw: "Makundi" },
  books: { en: "Books", sw: "Vitabu" },
  stationery: { en: "Stationery", sw: "Vifaa vya Kuandika" },
  officeSupplies: { en: "Office Supplies", sw: "Vifaa vya Ofisi" },
  about: { en: "About Us", sw: "Kuhusu Sisi" },
  contact: { en: "Contact", sw: "Wasiliana" },
  login: { en: "Login", sw: "Ingia" },
  signup: { en: "Sign Up", sw: "Jisajili" },
  logout: { en: "Sign Out", sw: "Ondoka" },
  cart: { en: "Cart", sw: "Karata ya Ununuzi" },
  wishlist: { en: "Wishlist", sw: "Orodha ya Matamanio" },
  search: { en: "Search", sw: "Tafuta" },
  offers: { en: "Offers", sw: "Ofa" },
  blog: { en: "Blog", sw: "Blogu" },
  myAccount: { en: "My Account", sw: "Akaunti Yangu" },
  addToCart: { en: "Add to Cart", sw: "Ongeza kwenye Karata" },
  checkout: { en: "Checkout", sw: "Lipia" },
  order: { en: "Order", sw: "Agizo" },
  delivery: { en: "Delivery", sw: "Utoaji" },
  trackOrder: { en: "Track Order", sw: "Fuatilia Agizo" },
  welcomeBack: { en: "Welcome Back", sw: "Karibu Tena" },
  createAccount: { en: "Create Account", sw: "Fungua Akaunti" },
  email: { en: "Email Address", sw: "Barua Pepe" },
  password: { en: "Password", sw: "Neno Siri" },
  fullName: { en: "Full Name", sw: "Jina Kamili" },
  sendMessage: { en: "Send Message", sw: "Tuma Ujumbe" },
  faq: { en: "FAQ", sw: "Maswali" },
  returns: { en: "Returns", sw: "Kurudisha" },
  searchPlaceholder: { en: "Search books, stationery, supplies...", sw: "Tafuta vitabu, vifaa..." },
  freeDelivery: { en: "Free delivery in Nairobi CBD for orders over KSh 2,000", sw: "Utoaji wa bure Nairobi CBD kwa agizo zaidi ya KSh 2,000" },
  shopNow: { en: "Shop Now", sw: "Nunua Sasa" },
  viewAll: { en: "View All", sw: "Ona Zote" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("jsedumart_lang") as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("jsedumart_lang", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
