import type { Metadata } from "next";
import { Orbitron, Poppins } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Neoverse AI | Redefining Human Intelligence",
  description: "The Future of Human-AI Collaboration Starts Here. Explore next-generation AI solutions for the year 2035.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${poppins.variable} dark`}>
      <body className="bg-black text-white font-poppins selection:bg-neon-blue/30 selection:text-neon-blue">
        {children}
      </body>
    </html>
  );
}
