import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://systems.craigoapps.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Craig-O-Systems - Web OS",
  description: "Browser-based operating system with containerized macOS sessions. Access a full desktop environment from your browser.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Craig-O-Systems",
    title: "Craig-O-Systems - Web OS",
    description: "Browser-based operating system with containerized macOS sessions. Access a full desktop environment from your browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Craig-O-Systems - Web OS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Craig-O-Systems - Web OS",
    description: "Browser-based operating system with containerized macOS sessions.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}