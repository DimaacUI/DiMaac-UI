import type { Metadata } from "next";
import { Archivo, Archivo_Black, Space_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

// Heavy grotesque for the oversized "form." display + numerals.
const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Workhorse sans for UI text.
const sans = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Mono for the tiny uppercase labels and micro-paragraphs.
const mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FORM&CO — Independent Design Studio",
  description:
    "FORM&CO is a multidisciplinary design studio crafting brands, digital products & spaces. London · Lisbon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
