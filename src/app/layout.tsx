import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure Inter font with variable name
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UPAI.SPACE | Train Like You're Already Hired",
  description: "AI-powered interview prep platform for modern developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} min-h-screen`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-white text-black selection:bg-[#00FF94] selection:text-black">
        {children}
      </body>
    </html>
  );
}
