import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ivyOraDisplay = localFont({
  src: [
    {
      path: "../public/fonts/Ivy-Ora-Display/Ivy-Ora-Display-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Ivy-Ora-Display/Ivy-Ora-Display-.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Ivy-Ora-Display/Ivy-Ora-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ivy-ora",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  title: "someofriti | Riti Wig - Senior Graphic Designer & Illustrator",
  description:
    "Riti Wig is a senior graphic designer and illustrator based in New Delhi, India. She specializes in creating visually compelling designs that communicate complex ideas with clarity and impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${ivyOraDisplay.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}
