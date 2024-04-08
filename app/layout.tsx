import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/app/components";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "One-Stop Car E-Commerce",
  description: "Awesome Cars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
