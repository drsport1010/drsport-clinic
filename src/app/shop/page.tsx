import type { Metadata } from "next";
import NewsTicker from "@/components/NewsTicker";
import Header from "@/components/Header";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "החנות | Dr. Sport - ד״ר אלון כהן",
  description: "סקראבס ספורטיביים לאנשי רפואה - Dr. Sport Pro™. הזמינו עכשיו.",
};

export default function ShopPage() {
  return (
    <>
      <NewsTicker />
      <Header />
      <main style={{ paddingTop: "104px" }}>
        <ShopSection />
      </main>
      <Footer />
    </>
  );
}
