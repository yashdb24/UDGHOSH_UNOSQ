import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Syne } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { PageLoader } from "@/components/PageLoader";
import { Navigation } from "@/components/Navigation";
import { PaperFlockOverlay } from "@/components/three/PaperFlockOverlay";

const spaceGrotesk = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-space-grotesk", // keeping variable name to avoid global refactoring
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["800"],
});

export const metadata: Metadata = {
  title: "UNOSQ '25 | Udghosh National Open School Quiz",
  description: "India's premier open quiz competition for school students from Classes 5 to 12, organized by Udghosh, IIT Kanpur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${syne.variable} antialiased`}
    >
      <body>
        <PageLoader />
        {/* Fixed, page-wide canvas: paper plane/crane/boat fly across as you scroll. */}
        <PaperFlockOverlay />
        <LenisProvider>
          <Navigation />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
