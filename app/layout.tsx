import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "AVHI Solutions | Commercial Washroom Automation",
  description:
    "AVHI Solutions delivers premium commercial washroom automation, sensor solutions, and hygiene systems for modern facilities.",
  icons: {
    icon: "/AvhiSolutionFavicon.png",
    apple: "/AvhiSolutionFavicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
