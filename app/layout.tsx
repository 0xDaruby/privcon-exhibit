import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import "./workspace.css";
import "./theme.css";
import "./watermark-workspace.css";
import "./demo.css";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";

const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist",
  display: "swap",
  style: "normal",
  weight: "100 900",
});

export const metadata: Metadata = {
  applicationName: "PrivCon Exhibit",
  title: {
    default: "PrivCon — Interactive Demo",
    template: "%s | PrivCon Demo",
  },
  description:
    "Explore the PrivCon interface with built-in samples. A frontend-only demo with simulated conversions and no document uploads.",
  icons: {
    icon: "/brand/privcon-favicon.png",
    apple: "/brand/privcon-favicon.png",
  },
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} /></head>
      <body>{children}</body>
    </html>
  );
}
