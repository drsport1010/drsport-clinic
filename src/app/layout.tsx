import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drsport.co.il"),
  title: "Dr. Sport | ד״ר אלון כהן - רפואת ספורט",
  description: "מרפאת ספורט מובילה בישראל. ד״ר אלון כהן מתמחה בטיפול בפציעות ספורט, שיקום, וחזרה מהירה לפעילות.",
  keywords: "רפואת ספורט, פציעות ספורט, שיקום, ד״ר אלון כהן, Dr Sport",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.drsport.co.il",
    siteName: "Dr. Sport - ד״ר אלון כהן",
    title: "Dr. Sport | ד״ר אלון כהן - רפואת ספורט",
    description: "מרפאת ספורט מובילה בישראל. אבחון וטיפול בפציעות ספורט, שיקום וחזרה מהירה לפעילות.",
    locale: "he_IL",
    images: [{ url: "/logo.png" }],
  },
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Dr. Sport - ד״ר אלון כהן",
  url: "https://www.drsport.co.il",
  telephone: "+972546635335",
  email: "drsport1010@gmail.com",
  image: "https://www.drsport.co.il/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "חיים לבנון 60 - מרכז הספורט",
    addressLocality: "תל אביב",
    addressCountry: "IL",
  },
  medicalSpecialty: "SportsMedicine",
  openingHours: ["Su,Mo,Tu,We,Th 08:00-20:00", "Fr 08:00-14:00"],
  sameAs: [
    "https://instagram.com/drsportil",
    "https://tiktok.com/@drsportil",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
