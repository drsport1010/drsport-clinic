import type { Metadata } from "next";
import NewsTicker from "@/components/NewsTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "סיכום הזמנה | Dr. Sport - ד״ר אלון כהן",
  description: "סיכום הזמנה ומילוי פרטי משלוח - החנות של ד״ר ספורט.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <NewsTicker />
      <Header />
      <main style={{ paddingTop: "104px", background: "#050E1F", minHeight: "70vh" }}>
        <CheckoutClient />
      </main>
      <Footer />
    </>
  );
}
