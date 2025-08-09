import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/common/theme-provider";
import Navbar from "../components/layout/navbar";
import HeaderLogo from "../components/layout/header-logo";
import { CartProvider } from "@/src/hooks/cartContext";
import { FavoritesProvider } from "@/src/hooks/favoritesContext";
import { SearchHistoryProvider } from "@/src/hooks/searchHistoryContext";


const interFont = Inter({
  subsets: ["latin"]
})


export const metadata: Metadata = {
  title: "Mayhem Records",
  description: "Compre e descubra álbuns marcantes em uma plataforma feita para amantes da música.",
};


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="pt-br" className={`${interFont.className}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>
            <SearchHistoryProvider>
              <FavoritesProvider>
                <HeaderLogo/>
                {children}
                <Navbar/>
              </FavoritesProvider>
            </SearchHistoryProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
