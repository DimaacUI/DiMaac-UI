import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import FullscreenLayoutHandler from "@/core/components/FullscreenLayoutHandler";
import SmoothScroller from "@/core/components/SmoothScroller";
import { Analytics } from "@vercel/analytics/next";


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
        <SmoothScroller>
          <FullscreenLayoutHandler>
            {children}
          </FullscreenLayoutHandler>
        </SmoothScroller>
        <Analytics />
      </body>
    </html>
  );
}