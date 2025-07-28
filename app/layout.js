import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  fallback: ['monospace'],
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  fallback: ['system-ui', 'arial'],
  display: 'swap',
});

export const metadata = {
  title: "Star Wars: Legacy Evolved",
  description: "A modern, AI-powered redesign of the Star Wars universe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${inter.variable} bg-space-navy text-polished-metal font-inter`}
      >
        <ErrorBoundary>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}