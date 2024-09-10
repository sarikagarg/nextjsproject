import type { Metadata } from "next";

import Header from "./common/Header";
import Footer from "./common/Footer";
import { Providers } from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Lenardo.ai",
  description: "Australia technology start-up",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
