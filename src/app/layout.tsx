import type { Metadata, Viewport } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: "Agroplus - Smart Agriculture Platform",
  description: "Unified intelligent agriculture platform for Indian farmers.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <html lang="en">
            <body className="antialiased bg-gray-50 min-h-screen pb-20">
                <Script
                  id="orchids-browser-logs"
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
                  strategy="afterInteractive"
                  data-orchids-project-id="e276a8d5-8fea-454c-a2d3-64405e3d4d1a"
                />
                  <ErrorReporter />
                  <Script
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
                    strategy="afterInteractive"
                    data-target-origin="*"
                    data-message-type="ROUTE_CHANGE"
                    data-include-search-params="true"
                    data-only-in-iframe="true"
                    data-debug="true"
                      data-custom-data='{"appName": "Agroplus", "version": "1.0.0", "greeting": "Namaskar"}'
                  />
                          <Navbar />
                          <main className="pt-16">
                            {children}
                          </main>
                          <BottomNav />
                        <Toaster position="top-center" richColors />
                <VisualEditsMessenger />
            </body>
      </html>
    );
}
