"use client";

import { useState } from "react";

const initialForm = { name: "", phone: "", email: "", reason: "", notes: "" };

const reasonLabels: Record<string, string> = {
  lecture: "הזמנת הרצאה",
  consult: "תיאום שיחת ייעוץ",
  clinic: "טיפול בקליניקה",
  other: "אחר",
};

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/drsport1010@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "ליד חדש מהאתר - Dr. Sport",
          _template: "table",
          "שם מלא": form.name,
          "טלפון": form.phone,
          "אימייל": form.email || "-",
          "סיבת הפנייה": reasonLabels[form.reason] || form.reason,
          "הערות": form.notes || "-",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-pad" style={{ background: "#050E1F" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-right">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: "#F0F4FF" }}>
            בואו נדבר
          </h2>
          <p className="text-base" style={{ color: "#8BA4C8" }}>
            לתיאום פגישה, הרצאה או שיחת ייעוץ - השאירו את פרטיכם כאן ונדאג לחזור אליכם
          </p>
          <div className="h-1 rounded-full mt-3" style={{ background: "linear-gradient(90deg, transparent, var(--accent))", width: "160px", marginLeft: "auto" }} />
        </div>

        {/* Phone CTA */}
        <div className="rounded-2xl p-6 mb-8 text-center" style={{ background: "linear-gradient(135deg, #0B1F4A 0%, #1A3A7C 100%)", border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)", boxShadow: "0 0 40px color-mix(in srgb, var(--accent) 8%, transparent)" }}>
          <p className="text-xl md:text-2xl font-extrabold" style={{ color: "#F0F4FF" }}>
            קבע תור עכשיו -{" "}
            <a href="tel:0546635335" className="neon-green glow-green" style={{ textDecoration: "none" }}>054-663-5335</a>
          </p>
          <p className="mt-2 text-sm" style={{ color: "#8BA4C8" }}>מענה תוך 24 שעות · ייעוץ ראשוני ללא התחייבות</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl p-6 md:p-10" style={{ background: "#0D1B35", border: "1px solid rgba(43,87,184,0.3)" }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-right" style={{ color: "#8BA4C8" }}>שם מלא *</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="ישראל ישראלי"
                  className="rounded-xl px-4 py-3 text-sm text-right outline-none"
                  style={{ background: "rgba(43,87,184,0.1)", border: "1px solid rgba(43,87,184,0.4)", color: "#F0F4FF" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 12px color-mix(in srgb, var(--accent) 20%, transparent)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,87,184,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-semibold text-right" style={{ color: "#8BA4C8" }}>טלפון *</label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="05X-XXX-XXXX"
                  className="rounded-xl px-4 py-3 text-sm text-right outline-none"
                  style={{ background: "rgba(43,87,184,0.1)", border: "1px solid rgba(43,87,184,0.4)", color: "#F0F4FF" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 12px color-mix(in srgb, var(--accent) 20%, transparent)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,87,184,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-right" style={{ color: "#8BA4C8" }}>אימייל</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                  className="rounded-xl px-4 py-3 text-sm text-right outline-none"
                  style={{ background: "rgba(43,87,184,0.1)", border: "1px solid rgba(43,87,184,0.4)", color: "#F0F4FF" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 12px color-mix(in srgb, var(--accent) 20%, transparent)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,87,184,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="reason" className="text-sm font-semibold text-right" style={{ color: "#8BA4C8" }}>סיבת הפנייה *</label>
                <select id="reason" name="reason" required value={form.reason} onChange={handleChange}
                  className="rounded-xl px-4 py-3 text-sm text-right outline-none"
                  style={{ background: "rgba(43,87,184,0.1)", border: "1px solid rgba(43,87,184,0.4)", color: form.reason ? "#F0F4FF" : "#8BA4C8", appearance: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,87,184,0.4)"; }}>
                  <option value="" style={{ background: "#0D1B35" }}>בחר סיבה...</option>
                  <option value="lecture" style={{ background: "#0D1B35" }}>הזמנת הרצאה</option>
                  <option value="consult" style={{ background: "#0D1B35" }}>תיאום שיחת ייעוץ</option>
                  <option value="clinic" style={{ background: "#0D1B35" }}>טיפול בקליניקה</option>
                  <option value="other" style={{ background: "#0D1B35" }}>אחר</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="notes" className="text-sm font-semibold text-right" style={{ color: "#8BA4C8" }}>הערות נוספות</label>
              <textarea id="notes" name="notes" rows={4} value={form.notes} onChange={handleChange}
                placeholder="ספר לנו על הפציעה או הצורך שלך..."
                className="rounded-xl px-4 py-3 text-sm text-right outline-none resize-none"
                style={{ background: "rgba(43,87,184,0.1)", border: "1px solid rgba(43,87,184,0.4)", color: "#F0F4FF" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 12px color-mix(in srgb, var(--accent) 20%, transparent)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,87,184,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
            </div>
            <button type="submit" disabled={status === "sending"}
              className="w-full md:w-auto md:self-end px-10 py-4 rounded-xl font-extrabold text-base transition-all duration-200"
              style={{ background: "var(--accent)", color: "#050E1F", opacity: status === "sending" ? 0.6 : 1 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-dark)"; e.currentTarget.style.boxShadow = "0 0 30px color-mix(in srgb, var(--accent) 40%, transparent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              {status === "sending" ? "שולח..." : "שלח פנייה ✉️"}
            </button>
            {status === "success" && (
              <p className="text-sm font-bold text-right" style={{ color: "var(--accent)" }}>
                ✅ הפנייה נשלחה בהצלחה! ניצור איתך קשר תוך 24 שעות.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm font-bold text-right" style={{ color: "#FF3B30" }}>
                ⚠️ שליחה נכשלה. אפשר לנסות שוב או להתקשר: 054-663-5335
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
