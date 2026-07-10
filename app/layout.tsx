import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AVHI Solutions | Commercial Washroom Automation",
  description:
    "AVHI Solutions delivers premium commercial washroom automation, sensor solutions, and hygiene systems for modern facilities.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
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
