import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Amiri } from "next/font/google";
import "./globals.css";
import { ExperienceProvider } from "@/context/ExperienceContext";
import { SmoothScroll } from "@/components/engine/SmoothScroll";
import { WebGLAtmosphere } from "@/components/engine/WebGLAtmosphere";
import { CompassCursor } from "@/components/engine/CompassCursor";
import { PageTransition } from "@/components/engine/PageTransition";
import { Preloader } from "@/components/ui/Preloader";
import { Navigation } from "@/components/ui/Navigation";
import { ConciergeDrawer } from "@/components/ui/ConciergeDrawer";
import { Footer } from "@/components/ui/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dar E Nabi Travels — A Journey of Faith, Guided With Care",
    template: "%s | Dar E Nabi Travels",
  },
  description:
    "An Umrah and travel sanctuary built around faith, trust, hospitality, and meaningful journeys to Makkah and Madinah.",
  keywords: [
    "Dar E Nabi Travels",
    "Umrah packages",
    "Premium Umrah",
    "Makkah and Madinah pilgrimage",
    "Elder care Umrah",
    "Ramadan Umrah",
  ],
};

export const viewport: Viewport = {
  themeColor: "#4A0711",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${amiri.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ExperienceProvider>
          <WebGLAtmosphere />
          <SmoothScroll />
          <CompassCursor />
          <Preloader />
          <PageTransition />
          <Navigation />
          <ConciergeDrawer />
          <main id="main-content">{children}</main>
          <Footer />
        </ExperienceProvider>
      </body>
    </html>
  );
}
