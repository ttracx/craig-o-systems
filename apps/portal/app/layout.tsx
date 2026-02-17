import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Craig-O-Systems - Web OS",
  description: "Browser-based operating system with containerized macOS sessions",
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