import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppModals from "@/components/AppModals";
import ToastContainer from "@/components/ToastContainer";

export const metadata: Metadata = {
  title: {
    default: "JontroGhor | Premium Gadgets & Electronics in Bangladesh",
    template: "%s | JontroGhor",
  },
  description:
    "Shop premium gadgets, electronics, fashion, and lifestyle products at JontroGhor. Fast delivery across Bangladesh with secure payment via bKash, Nagad, VISA & more.",
  keywords: [
    "JontroGhor",
    "online shopping Bangladesh",
    "gadgets Bangladesh",
    "electronics Dhaka",
    "buy gadgets online",
    "bKash shopping",
  ],
  authors: [{ name: "JontroGhor Team" }],
  creator: "JontroGhor",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jontroghor.com",
    siteName: "JontroGhor",
    title: "JontroGhor | Premium Gadgets & Electronics in Bangladesh",
    description:
      "Your ultimate destination for premium gadgets and lifestyle products. Shop now with fast delivery across Bangladesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JontroGhor | Premium Gadgets & Electronics",
    description: "Shop premium gadgets with fast delivery across Bangladesh.",
    creator: "@jontroghor",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#febd69",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-amazon-orange selection:text-black">
        <Header />
        <main>{children}</main>
        <Footer />
        <AppModals />
        <ToastContainer />
      </body>
    </html>
  );
}
