import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ 
  subsets: ["hebrew", "latin"],
  weight: ['400', '500', '700', '900'],
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: "Hydro-Reels Platform",
  description: "Interactive hydrotherapy learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="snap-y snap-mandatory scroll-smooth">
      <body className={`${rubik.className} antialiased bg-slate-50 text-slate-900 selection:bg-blue-200`}>
        {children}
      </body>
    </html>
  );
}
