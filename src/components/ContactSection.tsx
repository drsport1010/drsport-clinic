"use client";

import { useState } from "react";

const initialForm = { name: "", phone: "", email: "", reason: "", notes: "" };

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("תודה! ניצור איתך קשר תוך 24 שעות");
    setForm(initialForm);
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
          <div className="h-1 rounded-full mt-3" style={{ background: "linear-gradient(90deg, transparent, #00E676)", width: "160px", marginLeft: "auto" }} />
        </div>

        {/* Phone CTA */}
        <div className="rounded-2xl p-6 mb-8 text-center" style={{ background: "linear-gradient(135deg, #0B1F4A 0%, #1A3A7C 100%)", border: "1px solid rgba(0,230,118,0.3)", boxShadow: "0 0 40px rgba(0,230,118,0.08)" }}>
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
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00E676"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,230,118,0.2)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,87,184,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-semibold text-right" style={{ color: "#8BA4C8" }}>טלפון *</label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="05X-XXX-XXXX"
                  className="rounded-xl px-4 py-3 text-sm text-right outline-none"
                  style={{ background: "rgba(43,87,184,0.1)", border: "1px solid rgba(43,87,184,0.4)", color: "#F0F4FF" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00E676"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,230,118,0.2)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,87,184,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-right" style={{ color: "#8BA4C8" }}>אימייל</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                  className="rounded-xl px-4 py-3 text-sm text-right outline-none"
                  style={{ background: "rgba(43,87,184,0.1)", border: "1px solid rgba(43,87,184,0.4)", color: "#F0F4FF" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00E676"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,230,118,0.2)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,87,184,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="reason" className="text-sm font-semibold text-right" style={{ color: "#8BA4C8" }}>סיבת הפנייה *</label>
                <select id="reason" name="reason" required value={form.reason} onChange={handleChange}
                  className="rounded-xl px-4 py-3 text-sm text-right outline-none"
                  style={{ background: "rgba(43,87,184,0.1)", border: "1px solid rgba(43,87,184,0.4)", color: form.reason ? "#F0F4FF" : "#8BA4C8", appearance: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00E676"; }}
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
                onFocus={(e) => { e.currentTarget.style.borderColor = "#00E676"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,230,118,0.2)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,87,184,0.4)"; e.currentTarget.style.boxShadow = "none"; }} />
            </div>
            <button type="submit"
              className="w-full md:w-auto md:self-end px-10 py-4 rounded-xl font-extrabold text-base transition-all duration-200"
              style={{ background: "#00E676", color: "#050E1F" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#00c864"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,230,118,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#00E676"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              שלח פנייה ✉️
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
