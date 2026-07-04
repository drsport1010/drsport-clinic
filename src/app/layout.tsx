import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Sport | ד״ר אלון כהן - רפואת ספורט",
  description: "מרפאת ספורט מובילה בישראל. ד״ר אלון כהן מתמחה בטיפול בפציעות ספורט, שיקום, וחזרה מהירה לפעילות.",
  keywords: "רפואת ספורט, פציעות ספורט, שיקום, ד״ר אלון כהן, Dr Sport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
