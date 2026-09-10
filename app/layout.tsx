import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bogo codes",
  description: "Unlock Double the Value – Exclusive BOGO Codes for Smart Shoppers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-backgroundwhite text-navy">
        {children}
      </body>
    </html>
  );
}
