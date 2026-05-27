import type { Metadata } from "next";
import { Geist, Geist_Mono, Clicker_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clickerScript = Clicker_Script({
  weight: "400",
  variable: "--font-clicker-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clinica Lady - Avaliação Personalizada",
  description: "Formulario de avaliação personalizada - Clinica Lady",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${clickerScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
