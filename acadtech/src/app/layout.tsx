import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AcadTech Next",
  description: "Built in NextJS by Anirudh",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>)
{
  return (
    <html lang="en" className="dark">
      <body className={`antialiased`}>
        <div className="relative w-full flex items-center justify-center">
          <Navbar/>
        </div>
        {children}
        <div className="w-full flex items-center justify-center">
          <Footer/>
        </div>
      </body>
    </html>
  );
}