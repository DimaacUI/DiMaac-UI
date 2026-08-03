import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DiMAAC UI - Beautiful React Components",
  description: "Copy-paste React components built with Tailwind CSS and GSAP animations",
  icons: {
    icon: "/favicon.png",
  },
};

/**
 * Document shell only. Each route group brings its own chrome:
 * (site) renders the docs sidebar, /admin renders the portal shell.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.className} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
