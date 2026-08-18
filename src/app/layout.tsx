import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayush Kodle — Creative Developer & Engineer",
  description: "Portfolio of Ayush Kodle featuring interactive 3D web experiences, digital design, and software engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] dark:bg-[#121212] light:bg-[#f8f9fa] text-white dark:text-white light:text-slate-900 transition-colors duration-300`}>
        <ThemeProvider>
          <CustomCursor />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
