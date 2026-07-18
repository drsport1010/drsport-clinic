"use client";

import { useState, useRef } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const colors = [
  { label: "כחול נייבי", value: "#1A3A7C" },
  { label: "שחור", value: "#111827" },
  { label: "ירוק", value: "#1B5E3B" },
  { label: "לבן", value: "#F0F4FF" },
  { label: "אפור", value: "#6B7280" },
  { label: "טיל", value: "#0D7377" },
];

const productImages = [
  { src: `${BASE}/scrub-main.jpg`, alt: "חולצת סקראבס DR Sport - כחול נייבי" },
  { src: `${BASE}/scrub-colors.jpg`, alt: "חולצת סקראבס DR Sport - 6 צבעים" },
  { src: `${BASE}/scrub-catalog.jpg`, alt: "חולצת סקראבס DR Sport - קטלוג" },
];

const sizingChart = [
  { size: "XS", chest: "84-88", waist: "66-70", length: "110" },
  { size: "S", chest: "88-92", waist: "70-74", length: "112" },
  { size: "M", chest: "92-96", waist: "74-78", length: "114" },
  { size: "L", chest: "96-100", waist: "78-82", length: "116" },
  { size: "XL", chest: "100-104", waist: "82-86", length: "118" },
  { size: "XXL", chest: "104-108", waist: "86-90", length: "120" },
];

const comingSoon = [
  { name: "גרביי דחיסה - ספורטמד™", price: "₪149" },
  { name: "כפפות פיזיותרפיה - FlexGrip™", price: "₪229" },
];

export default function ShopSection() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [showSizing, setShowSizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("אנא בחר מידה לפני הוספה לסל");
      return;
    }
    const logoNote = logoFile ? ` + לוגו: ${logoFile.name}` : "";
    alert(
      `נוסף לסל! חולצת סקראבס עם רקימה + מכנסים Dr. Sport™ - מידה ${selectedSize} - ${colors[selectedColor].label}${logoNote} - ₪239 + משלוח ₪30`
    );
  };

  return (
    <section
      id="shop"
      className="section-pad"
      style={{ background: "#0D1B35" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-right">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-2"
            style={{ color: "#F0F4FF" }}
          >
            החנות של ד״ר ספורט
          </h2>
          <p className="text-base" style={{ color: "#8BA4C8" }}>
            מדי סקראבס ספורטיביים לאנשי רפואה - בגדי עבודה לרופאים ואנשי רפואה
          </p>
          <div
            className="h-1 rounded-full mt-3"
            style={{
              background: "linear-gradient(90deg, transparent, var(--accent))",
              width: "180px",
              marginLeft: "auto",
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Image Gallery */}
          <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                border: "1px solid rgba(43,87,184,0.4)",
                background: "#f8f8f8",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={productImages[activeImage].src}
                alt={productImages[activeImage].alt}
                style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
              />
            </div>

            {/* Thumbnail Row - scrollable */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      flex: "0 0 80px",
                      height: "80px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border:
                        activeImage === i
                          ? "2px solid var(--accent)"
                          : "2px solid rgba(43,87,184,0.3)",
                      background: "#f8f8f8",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      style={{ width: "80px", height: "80px", objectFit: "cover", display: "block" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h3
                className="text-2xl font-extrabold mb-1"
                style={{ color: "#F0F4FF" }}
              >
                חולצת סקראבס עם רקימה + מכנסי סקראבס - Dr. Sport™
              </h3>
              <div className="flex items-baseline gap-3 mt-2">
                <span
                  className="text-3xl font-extrabold"
                  style={{ color: "var(--accent)" }}
                >
                  ₪239
                </span>
                <span className="text-sm" style={{ color: "#8BA4C8" }}>
                  + משלוח ₪30
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "#8BA4C8" }}>
              סקראבס מקצועיים המשלבים טכנולוגיית ניהול לחות מתקדמת עם עיצוב ספורטיבי ארגונומי. מיועדים לרופאים, אחיות, ופיזיותרפיסטים הפועלים שעות ארוכות. נוחות מרבית, עמידות גבוהה, וסגנון שמדבר בשבחי הרפואה המודרנית.
            </p>

            {/* Color Selector */}
            <div>
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: "#F0F4FF" }}
              >
                צבע:{" "}
                <span style={{ color: "#8BA4C8" }}>
                  {colors[selectedColor].label}
                </span>
              </p>
              <div className="flex gap-3">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={color.label}
                    className="w-9 h-9 rounded-full transition-all duration-200"
                    style={{
                      background: color.value,
                      border:
                        selectedColor === i
                          ? "2px solid var(--accent)"
                          : "2px solid rgba(255,255,255,0.2)",
                      boxShadow:
                        selectedColor === i
                          ? "0 0 12px color-mix(in srgb, var(--accent) 40%, transparent)"
                          : "none",
                      transform:
                        selectedColor === i ? "scale(1.15)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: "#F0F4FF" }}
              >
                מידה:{" "}
                {selectedSize ? (
                  <span style={{ color: "var(--accent)" }}>{selectedSize}</span>
                ) : (
                  <span style={{ color: "#8BA4C8" }}>לא נבחרה</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                    style={{
                      background:
                        selectedSize === size
                          ? "var(--accent)"
                          : "rgba(43,87,184,0.2)",
                      color: selectedSize === size ? "#050E1F" : "#8BA4C8",
                      border:
                        selectedSize === size
                          ? "1px solid var(--accent)"
                          : "1px solid rgba(43,87,184,0.4)",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <p
                className="text-sm font-semibold mb-2"
                style={{ color: "#F0F4FF" }}
              >
                העלאת לוגו לרקימה{" "}
                <span className="font-normal" style={{ color: "#8BA4C8" }}>
                  (אופציונלי)
                </span>
              </p>
              <p className="text-xs mb-3" style={{ color: "#8BA4C8" }}>
                ניתן להעלות לוגו או טקסט לרקימה על החולצה - PNG / JPG / SVG עד 5MB
              </p>
              <div
                className="rounded-xl p-4 text-center cursor-pointer transition-all duration-200"
                style={{
                  border: logoFile
                    ? "2px solid var(--accent)"
                    : "2px dashed rgba(43,87,184,0.4)",
                  background: logoFile
                    ? "color-mix(in srgb, var(--accent) 5%, transparent)"
                    : "rgba(43,87,184,0.08)",
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                {logoFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <span style={{ color: "var(--accent)" }}>✓</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                      {logoFile.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLogoFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="text-xs ml-2"
                      style={{ color: "#8BA4C8" }}
                    >
                      הסר
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl mb-1">📎</div>
                    <p className="text-sm" style={{ color: "#8BA4C8" }}>
                      לחץ להעלאת לוגו
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && file.size <= 5 * 1024 * 1024) {
                    setLogoFile(file);
                  } else if (file) {
                    alert("הקובץ גדול מדי - מקסימום 5MB");
                  }
                }}
              />
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-xl text-base font-extrabold tracking-wide transition-all duration-200"
              style={{
                background: "var(--accent)",
                color: "#050E1F",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-dark)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px color-mix(in srgb, var(--accent) 40%, transparent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "none";
              }}
            >
              🛒 הוסף לסל
            </button>

            {/* Sizing Chart Toggle */}
            <div>
              <button
                onClick={() => setShowSizing(!showSizing)}
                className="text-sm font-semibold flex items-center gap-2 transition-colors"
                style={{ color: "#2B57B8", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2B57B8")}
              >
                <span>{showSizing ? "▲" : "▼"}</span>
                מידות זמינות - טבלת מידות
              </button>

              {showSizing && (
                <div
                  className="mt-4 rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(43,87,184,0.3)" }}
                >
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "rgba(43,87,184,0.3)" }}>
                        {["מידה", 'חזה (ס"מ)', 'מותניים (ס"מ)', 'אורך (ס"מ)'].map(
                          (h) => (
                            <th
                              key={h}
                              className="py-2 px-3 font-bold text-right"
                              style={{ color: "#F0F4FF" }}
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {sizingChart.map((row, i) => (
                        <tr
                          key={row.size}
                          style={{
                            background:
                              i % 2 === 0
                                ? "rgba(13,27,53,0.8)"
                                : "rgba(26,58,124,0.15)",
                          }}
                        >
                          <td
                            className="py-2 px-3 font-bold"
                            style={{ color: "var(--accent)" }}
                          >
                            {row.size}
                          </td>
                          <td className="py-2 px-3" style={{ color: "#8BA4C8" }}>
                            {row.chest}
                          </td>
                          <td className="py-2 px-3" style={{ color: "#8BA4C8" }}>
                            {row.waist}
                          </td>
                          <td className="py-2 px-3" style={{ color: "#8BA4C8" }}>
                            {row.length}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Coming Soon Items */}
        <div className="mt-12">
          <h4
            className="text-lg font-bold mb-6 text-right"
            style={{ color: "#8BA4C8" }}
          >
            בקרוב בחנות
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comingSoon.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-5 flex items-center justify-between"
                style={{
                  background: "rgba(13,27,53,0.5)",
                  border: "1px dashed rgba(43,87,184,0.3)",
                  opacity: 0.6,
                }}
              >
                <div>
                  <p className="font-bold" style={{ color: "#F0F4FF" }}>
                    {item.name}
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#8BA4C8" }}>
                    {item.price}
                  </p>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255,109,0,0.15)",
                    color: "#FF6D00",
                    border: "1px solid rgba(255,109,0,0.3)",
                  }}
                >
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
