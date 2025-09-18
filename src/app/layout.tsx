import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import ResponsiveLayoutWrapper from "@/core/components/ResponsiveLayoutWrapper";


const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DiMAAC UI - Beautiful React Components",
  description: "Copy-paste React components built with Tailwind CSS and GSAP animations",
};

const sections = [
  {
    name: "Getting Started",
    item: [
      {name: "Introduction", href: "/", isActive: false, isNew: false}
    ]
  },
  {
    name: "Layout Components",
    item: [
      {name: "Expandable Panel", href: "/components/expandable-panel", isActive: false, isNew: true}
    ]
  },
  {
    name: "Gallery & Media",
    item: [
      {name: "Image Gallery", href: "/components/image-gallery", isActive: false, isNew: true},
      {name: "Scrolling Gallery", href: "/components/scrolling-gallery", isActive: false, isNew: true},
      {name: "Liquid Image Reveal", href: "/components/liquid-image-reveal", isActive: false, isNew: true}
    ]
  },
  {
    name: "Card Components",
    item: [
      {name: "Mouse Tilt Card", href: "/components/mouse-tilt-card", isActive: false, isNew: true},
      {name: "Swipeable Cards", href: "/components/swipeable-cards", isActive: false, isNew: true}
    ]
  },
  {
    name: "Interactive Elements",
    item: [
      {name: "Mouse Trail", href: "/components/mouse-trail", isActive: false, isNew: true},
      {name: "Context Menu", href: "/components/context-menu", isActive: false, isNew: true}
    ]
  },
  {
    name: "Text & Animation",
    item: [
      {name: "Text Loader", href: "/components/text-loader", isActive: false, isNew: true},
      {name: "Text Scramble Reveal", href: "/components/text-scramble-reveal", isActive: false, isNew: true}
    ]
  }
]


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
        <ResponsiveLayoutWrapper sections={sections}>
          {children}
        </ResponsiveLayoutWrapper>
      </body>
    </html>
  );
}