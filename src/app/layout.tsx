import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import { StoreProvider } from "@/context/StoreContext";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FOX | Premium Sportswear & High-Performance Footwear",
  description: "Experience the next generation of athletic performance. Engineered for champions, built for those who never quit. Discover premium running, basketball, football, and training gear from FOX.",
  keywords: "sportswear, performance footwear, running shoes, basketball shoes, football boots, athletic apparel, premium sports brand",
  authors: [{ name: "FOX Athletics" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-white selection:text-black">
        <NextTopLoader color="#ff5e00" height={3} showSpinner={true} />
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
