"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContent } from "@/lib/useContent";
import {
  loadOrder,
  clearOrder,
  getLogoFile,
  dataUrlToFile,
  type ShopOrder,
} from "@/lib/cart";

const cardStyle = {
  background: "rgba(13,27,53,0.8)",
  border: "1px solid rgba(43,87,184,0.35)",
  borderRadius: "20px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(5,14,31,0.8)",
  border: "1px solid rgba(43,87,184,0.4)",
  borderRadius: "10px",
  padding: "12px 14px",
  color: "#F0F4FF",
  fontSize: "0.9rem",
  outline: "none",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-right">
      <span className="text-sm font-semibold" style={{ color: "#F0F4FF" }}>
        {label}
        {required && <span style={{ color: "#FF6D00" }}> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function CheckoutClient() {
  const content = useContent();
  const [order, setOrder] = useState<ShopOrder | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    setOrder(loadOrder());
    setLoaded(true);
  }, []);

  const shop = content.shop as Record<string, unknown> & {
    products?: { id: string; paymentLink?: string }[];
  };
  // Per-product payment link from the products array; legacy shop-level
  // fields remain as fallback for orders saved before the products model.
  const productLink = order?.productId
    ? (shop.products || []).find((p) => p.id === order.productId)?.paymentLink
    : undefined;
  const legacyLink = order
    ? (order.product === "cup" ? shop.paymentLinkCup : shop.paymentLinkScrubs)
    : undefined;
  const paymentLink = String(productLink || legacyLink || "").trim();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!order || status === "sending") return;
    if (!agreed) {
      alert("יש לאשר את התקנון לפני סיום ההזמנה");
      return;
    }
    setStatus("sending");
    try {
      const raw = new FormData(e.currentTarget);
      const fd = new FormData();
      fd.append("_subject", `🛒 הזמנה חדשה מהחנות - ${order.name}`);
      fd.append("_template", "table");
      fd.append("_captcha", "false");
      fd.append("מוצר", order.name);
      if (order.color) fd.append("צבע", order.color);
      if (order.size) fd.append("מידה", order.size);
      fd.append("כמות", String(order.qty));
      fd.append("מחיר", `₪${order.price * order.qty}`);
      fd.append("משלוח", `₪${order.shipping}`);
      fd.append('סה"כ לתשלום', `₪${order.price * order.qty + order.shipping}`);
      for (const [key, value] of raw.entries()) {
        if (typeof value === "string" && value.trim() !== "") fd.append(key, value);
      }
      fd.append("אישור תקנון", "הלקוח אישר את התקנון");
      const logo =
        getLogoFile() ||
        (order.logoDataUrl && order.logoName
          ? dataUrlToFile(order.logoDataUrl, order.logoName)
          : null);
      if (logo) fd.append("attachment", logo);
      else if (order.logoName) fd.append("לוגו", `הועלה קובץ: ${order.logoName}`);
      const res = await fetch("https://formsubmit.co/ajax/drsport1010@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      clearOrder();
      if (paymentLink) {
        setTimeout(() => {
          window.location.href = paymentLink;
        }, 2500);
      }
    } catch {
      setStatus("error");
    }
  };

  if (!loaded) return null;

  if (!order && status !== "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="p-10" style={cardStyle}>
          <div className="text-4xl mb-4">🛒</div>
          <h1 className="text-2xl font-extrabold mb-3" style={{ color: "#F0F4FF" }}>
            הסל ריק
          </h1>
          <p className="text-sm mb-6" style={{ color: "#8BA4C8" }}>
            עדיין לא נוסף מוצר לסל. חזרו לחנות ובחרו את המוצר שלכם.
          </p>
          <Link
            href="/#shop"
            className="inline-block px-8 py-3 rounded-xl font-bold"
            style={{ background: "var(--accent)", color: "#050E1F" }}
          >
            לחנות של ד״ר ספורט
          </Link>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="p-10" style={cardStyle}>
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-extrabold mb-3" style={{ color: "#F0F4FF" }}>
            ההזמנה נקלטה בהצלחה!
          </h1>
          {paymentLink ? (
            <>
              <p className="text-sm mb-6" style={{ color: "#8BA4C8" }}>
                מיד תועברו לעמוד התשלום המאובטח להשלמת ההזמנה. אם לא הועברתם
                אוטומטית - לחצו על הכפתור:
              </p>
              <a
                href={paymentLink}
                className="inline-block px-10 py-4 rounded-xl font-extrabold text-base"
                style={{ background: "var(--accent)", color: "#050E1F" }}
              >
                💳 מעבר לתשלום
              </a>
            </>
          ) : (
            <p className="text-sm" style={{ color: "#8BA4C8" }}>
              פרטי ההזמנה התקבלו אצלנו. קישור לתשלום מאובטח יישלח אליכם בהקדם
              בוואטסאפ או במייל להשלמת ההזמנה. תודה שקניתם בחנות של ד״ר ספורט! 💚
            </p>
          )}
        </div>
      </div>
    );
  }

  const o = order!;
  const total = o.price * o.qty + o.shipping;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-right">
      <h1 className="text-3xl font-extrabold mb-8" style={{ color: "#F0F4FF" }}>
        סיכום הזמנה
      </h1>

      {/* Order summary */}
      <div className="p-6 mb-8" style={cardStyle}>
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--accent)" }}>
          המוצר שלך
        </h2>
        <div className="flex flex-col gap-2 text-sm" style={{ color: "#C3D2E8" }}>
          <div className="flex justify-between gap-4">
            <span className="font-bold" style={{ color: "#F0F4FF" }}>
              {o.name}
            </span>
            <span>₪{o.price}</span>
          </div>
          {o.color && <div>צבע: {o.color}</div>}
          {o.size && <div>מידה: {o.size}</div>}
          <div>כמות: {o.qty}</div>
          {(o.logoDataUrl || o.logoName) && (
            <div className="flex items-center gap-3 mt-1">
              <span>לוגו לרקמה:</span>
              {o.logoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={o.logoDataUrl}
                  alt="הלוגו שהועלה"
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "contain",
                    background: "#fff",
                    borderRadius: "10px",
                    border: "1px solid rgba(43,87,184,0.4)",
                  }}
                />
              ) : (
                <span style={{ color: "var(--accent)" }}>✓ {o.logoName}</span>
              )}
            </div>
          )}
          <hr style={{ borderColor: "rgba(43,87,184,0.3)", margin: "10px 0" }} />
          <div className="flex justify-between">
            <span>משלוח</span>
            <span>₪{o.shipping}</span>
          </div>
          <div
            className="flex justify-between text-base font-extrabold"
            style={{ color: "#F0F4FF" }}
          >
            <span>סה״כ לתשלום</span>
            <span style={{ color: "var(--accent)" }}>₪{total}</span>
          </div>
        </div>
      </div>

      {/* Important notices */}
      <div
        className="p-5 mb-8 text-sm leading-relaxed"
        style={{
          background: "rgba(255,109,0,0.08)",
          border: "1px solid rgba(255,109,0,0.35)",
          borderRadius: "16px",
          color: "#FFB74D",
        }}
      >
        <p className="font-bold mb-1">⚠️ חשוב לדעת לפני ההזמנה:</p>
        <p>
          המוצרים מיוצרים בהתאמה אישית (Custom Made) ולכן לא ניתן לבטל את
          ההזמנה או להחזיר את המוצר לאחר התשלום. זמן האספקה הוא עד 30 ימי
          עסקים ממועד אישור התשלום.
        </p>
      </div>

      {/* Customer details */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="p-6" style={cardStyle}>
          <h2 className="text-lg font-bold mb-5" style={{ color: "var(--accent)" }}>
            פרטים למשלוח
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="שם מלא" required>
              <input name="שם מלא" type="text" required style={inputStyle} placeholder="ישראל ישראלי" />
            </Field>
            <Field label="טלפון" required>
              <input name="טלפון" type="tel" required style={inputStyle} placeholder="05X-XXX-XXXX" />
            </Field>
            <Field label="אימייל" required>
              <input name="אימייל" type="email" required style={inputStyle} placeholder="you@email.com" dir="ltr" />
            </Field>
            <Field label="עיר" required>
              <input name="עיר" type="text" required style={inputStyle} />
            </Field>
            <Field label="רחוב ומספר בית" required>
              <input name="רחוב ומספר בית" type="text" required style={inputStyle} />
            </Field>
            <Field label="מיקוד">
              <input name="מיקוד" type="text" style={inputStyle} dir="ltr" />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="הערות להזמנה">
              <textarea name="הערות" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </Field>
          </div>
        </div>

        {/* Terms agreement */}
        <label
          className="flex items-start gap-3 p-4 cursor-pointer text-sm"
          style={{ ...cardStyle, color: "#C3D2E8" }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ width: "18px", height: "18px", marginTop: "2px", accentColor: "#00E676" }}
          />
          <span>
            קראתי ואני מסכים/ה ל
            <Link
              href="/terms"
              target="_blank"
              className="font-bold underline"
              style={{ color: "var(--accent)" }}
            >
              תקנון החנות
            </Link>
            , כולל התנאי שלא ניתן לבטל או להחזיר מוצר בהתאמה אישית, וזמן אספקה
            של עד 30 ימי עסקים.
          </span>
        </label>

        {status === "error" && (
          <p
            className="text-sm p-3 rounded-xl text-center"
            style={{ background: "rgba(255,0,0,0.1)", color: "#FF8A80" }}
          >
            אירעה שגיאה בשליחת ההזמנה. נסו שוב, או פנו אלינו בוואטסאפ.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending" || !agreed}
          className="w-full py-4 rounded-xl text-base font-extrabold tracking-wide"
          style={{
            background: agreed ? "var(--accent)" : "rgba(139,164,200,0.3)",
            color: agreed ? "#050E1F" : "#8BA4C8",
            cursor: agreed ? "pointer" : "not-allowed",
            transition: "all 0.2s",
          }}
        >
          {status === "sending" ? "שולח את ההזמנה..." : "💳 סיום הזמנה ומעבר לתשלום"}
        </button>
      </form>
    </div>
  );
}
