"use client";

import { useRef, useState } from "react";

const CALENDAR_URL = "https://calendar.app.google/NRAAvBBYCkvRgXLs8";

const card: React.CSSProperties = {
  background: "#0D1B35",
  border: "1px solid rgba(43,87,184,0.3)",
  borderRadius: "16px",
};

const inputStyle: React.CSSProperties = {
  background: "rgba(43,87,184,0.1)",
  border: "1px solid rgba(43,87,184,0.4)",
  color: "#F0F4FF",
  borderRadius: "12px",
  padding: "10px 14px",
  fontSize: "0.9rem",
  textAlign: "right",
  outline: "none",
  width: "100%",
};

const labelStyle: React.CSSProperties = {
  color: "#8BA4C8",
  fontSize: "0.85rem",
  fontWeight: 600,
};

const checkLabel: React.CSSProperties = {
  color: "#C3D2E8",
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
};

const checkboxStyle: React.CSSProperties = {
  accentColor: "var(--accent)",
  width: "18px",
  height: "18px",
  flexShrink: 0,
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span style={labelStyle}>
        {label} {required && <span style={{ color: "var(--accent)" }}>*</span>}
      </span>
      {children}
    </div>
  );
}

function SectionCard({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={card} className="p-6 md:p-8 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center font-extrabold text-sm"
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "color-mix(in srgb, var(--accent) 15%, transparent)",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            flexShrink: 0,
          }}
        >
          {num}
        </span>
        <h2 className="text-lg md:text-xl font-extrabold" style={{ color: "#F0F4FF" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function YesNo({
  name,
  detailLabel,
  onChange,
  showDetail,
  detailName,
}: {
  name: string;
  detailLabel: string;
  onChange: (v: boolean) => void;
  showDetail: boolean;
  detailName: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-6">
        <label style={checkLabel}>
          <input type="radio" name={name} value="לא" style={checkboxStyle} onChange={() => onChange(false)} required />
          לא
        </label>
        <label style={checkLabel}>
          <input type="radio" name={name} value="כן" style={checkboxStyle} onChange={() => onChange(true)} />
          כן
        </label>
      </div>
      {showDetail && (
        <textarea name={detailName} rows={2} placeholder={detailLabel} style={{ ...inputStyle, resize: "vertical" }} />
      )}
    </div>
  );
}

export default function QuestionnaireForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [pain, setPain] = useState(5);
  const [seenPro, setSeenPro] = useState(false);
  const [chronic, setChronic] = useState(false);
  const [surgeries, setSurgeries] = useState(false);
  const [allergies, setAllergies] = useState(false);
  const [radiating, setRadiating] = useState(false);
  const [physio, setPhysio] = useState(false);
  const [injections, setInjections] = useState(false);
  const [otherTreatment, setOtherTreatment] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileNames(Array.from(e.target.files || []).map((f) => f.name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const raw = new FormData(e.currentTarget);
      const fd = new FormData();
      fd.append("_subject", "📋 שאלון רפואי חדש - Dr. Sport");
      fd.append("_template", "table");
      fd.append("_captcha", "false");
      const seen = new Set<string>();
      for (const key of raw.keys()) {
        if (seen.has(key) || key === "attachment") continue;
        seen.add(key);
        const vals = raw
          .getAll(key)
          .filter((v): v is string => typeof v === "string" && v.trim() !== "");
        if (vals.length) fd.append(key, vals.join(", "));
      }
      const files = raw.getAll("attachment").filter((f): f is File => f instanceof File && f.size > 0);
      files.forEach((f, i) => fd.append(i === 0 ? "attachment" : `attachment${i + 1}`, f));
      const res = await fetch("https://formsubmit.co/ajax/drsport1010@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setTimeout(() => {
        window.location.href = CALENDAR_URL;
      }, 1500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6" encType="multipart/form-data">
      {/* 1 — פרטים אישיים */}
      <SectionCard num="1" title="פרטים אישיים ורקע ספורטיבי">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="שם מלא" required>
            <input name="שם מלא" type="text" required style={inputStyle} placeholder="ישראל ישראלי" />
          </Field>
          <Field label="תאריך לידה" required>
            <input name="תאריך לידה" type="date" required style={inputStyle} />
          </Field>
          <Field label="טלפון" required>
            <input name="טלפון" type="tel" required style={inputStyle} placeholder="05X-XXX-XXXX" />
          </Field>
          <Field label="עיסוק / מקצוע">
            <input name="עיסוק" type="text" style={inputStyle} />
          </Field>
          <Field label="ענף הספורט העיקרי שלך">
            <input name="ענף ספורט עיקרי" type="text" style={inputStyle} placeholder="ריצה, כדורגל, טניס..." />
          </Field>
          <Field label="תדירות ונפח אימונים שבועי (לפני הפציעה)">
            <input name="נפח אימונים שבועי" type="text" style={inputStyle} placeholder="למשל: 4 אימונים בשבוע, שעה כל אחד" />
          </Field>
        </div>
        <Field label="רמת פעילות" required>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {["חובבני", "מקצועני / תחרותי", "ספורטאי סוף שבוע", "לא מבצע פעילות סדירה"].map((lvl) => (
              <label key={lvl} style={checkLabel}>
                <input type="radio" name="רמת פעילות" value={lvl} style={checkboxStyle} required />
                {lvl}
              </label>
            ))}
          </div>
        </Field>
      </SectionCard>

      {/* 2 — פרטי הפציעה */}
      <SectionCard num="2" title="פרטי הפציעה הנוכחית">
        <Field label="התלונה העיקרית או אזור הכאב" required>
          <input name="תלונה עיקרית" type="text" required style={inputStyle} placeholder="למשל: כאב בברך ימין" />
        </Field>
        <Field label="מתי החל הכאב / הפציעה? (תאריך מדויק או הערכת זמן)" required>
          <input name="מתי החל" type="text" required style={inputStyle} placeholder="למשל: לפני שבועיים / 01.07.2026" />
        </Field>
        <Field label="כיצד הפציעה התרחשה?" required>
          <div className="flex flex-col gap-3">
            <label style={checkLabel}>
              <input type="radio" name="מנגנון הפציעה" value='אירוע טראומטי חד פעמי (נקע, חבלה, נפילה, שמיעת "קליק")' style={checkboxStyle} required />
              אירוע טראומטי חד פעמי (נקע, חבלה, נפילה, שמיעת &quot;קליק&quot;)
            </label>
            <label style={checkLabel}>
              <input type="radio" name="מנגנון הפציעה" value="הופעה הדרגתית שהלכה והחמירה עם הזמן (עומס יתר)" style={checkboxStyle} />
              הופעה הדרגתית שהלכה והחמירה עם הזמן (עומס יתר)
            </label>
          </div>
        </Field>
        <Field label="תיאור מנגנון הפציעה במילים שלך">
          <textarea name="תיאור המנגנון" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </Field>
        <Field label="אופי הכאב">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {["חד", "עמום", "שורף", "פועם"].map((t) => (
              <label key={t} style={checkLabel}>
                <input type="checkbox" name="אופי הכאב" value={t} style={checkboxStyle} />
                {t}
              </label>
            ))}
            <label style={checkLabel}>
              <input type="checkbox" name="אופי הכאב" value="מוקרן" style={checkboxStyle} onChange={(e) => setRadiating(e.target.checked)} />
              מוקרן
            </label>
          </div>
          {radiating && <input name="הכאב מוקרן לאן" type="text" style={{ ...inputStyle, marginTop: "10px" }} placeholder="לאן הכאב מוקרן?" />}
        </Field>
        <Field label={`עוצמת הכאב הנוכחית: ${pain}/10`}>
          <div className="flex items-center gap-4">
            <span style={{ color: "#8BA4C8", fontSize: "0.8rem" }}>1</span>
            <input
              type="range"
              name="עוצמת כאב (1-10)"
              min={1}
              max={10}
              value={pain}
              onChange={(e) => setPain(parseInt(e.target.value))}
              style={{ accentColor: "var(--accent)", flex: 1 }}
            />
            <span style={{ color: "#8BA4C8", fontSize: "0.8rem" }}>10</span>
            <span
              className="font-extrabold text-lg flex items-center justify-center"
              style={{ color: "var(--accent)", minWidth: "44px", height: "44px", borderRadius: "12px", background: "color-mix(in srgb, var(--accent) 12%, transparent)" }}
            >
              {pain}
            </span>
          </div>
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="מה מחמיר את הכאב?">
            <input name="מה מחמיר" type="text" style={inputStyle} placeholder="ריצה, ירידה במדרגות, בבוקר..." />
          </Field>
          <Field label="מה מקל על הכאב?">
            <input name="מה מקל" type="text" style={inputStyle} placeholder="קרח, מנוחה, תרופות..." />
          </Field>
        </div>
        <Field label="תסמינים נלווים">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {["נפיחות", "חוסר יציבות / בריחת מפרק", "נעילה של המפרק", "נימול או רדימות"].map((s) => (
              <label key={s} style={checkLabel}>
                <input type="checkbox" name="תסמינים נלווים" value={s} style={checkboxStyle} />
                {s}
              </label>
            ))}
          </div>
        </Field>
      </SectionCard>

      {/* 3 — היסטוריה טיפולית */}
      <SectionCard num="3" title="היסטוריה טיפולית ותהליך הבירור עד כה">
        <Field label="האם נבדקת כבר על ידי איש מקצוע לגבי פציעה זו? (רופא משפחה, אורתופד, פיזיותרפיסט וכו')" required>
          <YesNo
            name="נבדק על ידי איש מקצוע"
            detailName="מי בדק ומה האבחנה"
            detailLabel="פרט מי בדק ומה הייתה האבחנה המשוערת"
            onChange={setSeenPro}
            showDetail={seenPro}
          />
        </Field>
        <Field label="אילו בדיקות דימות בוצעו עבור פציעה זו?">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {["צילום רנטגן", "אולטרסאונד (US)", "MRI", "CT", "לא בוצעו בדיקות דימות"].map((im) => (
              <label key={im} style={checkLabel}>
                <input type="checkbox" name="בדיקות דימות" value={im} style={checkboxStyle} />
                {im}
              </label>
            ))}
          </div>
        </Field>
        <Field label="אילו טיפולים ביצעת עד כה עבור פציעה זו?">
          <div className="flex flex-col gap-3">
            <label style={checkLabel}>
              <input type="checkbox" name="טיפולים שבוצעו" value="פיזיותרפיה" style={checkboxStyle} onChange={(e) => setPhysio(e.target.checked)} />
              פיזיותרפיה
            </label>
            {physio && <input name="כמה טיפולי פיזיותרפיה" type="text" style={inputStyle} placeholder="כמה טיפולים?" />}
            <label style={checkLabel}>
              <input type="checkbox" name="טיפולים שבוצעו" value="זריקות" style={checkboxStyle} onChange={(e) => setInjections(e.target.checked)} />
              זריקות
            </label>
            {injections && <input name="פירוט זריקות" type="text" style={inputStyle} placeholder="איזה זריקות ומתי?" />}
            <label style={checkLabel}>
              <input type="checkbox" name="טיפולים שבוצעו" value="מנוחה מוחלטת" style={checkboxStyle} />
              מנוחה מוחלטת
            </label>
            <label style={checkLabel}>
              <input type="checkbox" name="טיפולים שבוצעו" value="נטילת נוגדי דלקת / משככי כאבים" style={checkboxStyle} />
              נטילת נוגדי דלקת / משככי כאבים
            </label>
            <label style={checkLabel}>
              <input type="checkbox" name="טיפולים שבוצעו" value="אחר" style={checkboxStyle} onChange={(e) => setOtherTreatment(e.target.checked)} />
              אחר
            </label>
            {otherTreatment && <input name="טיפול אחר - פירוט" type="text" style={inputStyle} placeholder="פרט..." />}
          </div>
        </Field>
      </SectionCard>

      {/* 4 — רקע רפואי */}
      <SectionCard num="4" title="רקע רפואי כללי">
        <Field label="האם יש לך מחלות רקע כרוניות? (יתר לחץ דם, סוכרת, מחלות לב, אסתמה, מחלות ראומטיות, בעיות קרישה)" required>
          <YesNo name="מחלות רקע" detailName="פירוט מחלות רקע" detailLabel="נא לפרט" onChange={setChronic} showDetail={chronic} />
        </Field>
        <Field label="האם עברת ניתוחים בעבר (בדגש על ניתוחים אורתופדיים)?" required>
          <YesNo name="ניתוחים בעבר" detailName="פירוט ניתוחים" detailLabel="סוג הניתוח ושנה" onChange={setSurgeries} showDetail={surgeries} />
        </Field>
        <Field label="האם סבלת בעבר מפציעות דומות או פציעות משמעותיות אחרות במערכת השלד והתנועה?">
          <textarea name="פציעות עבר" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
        </Field>
        <Field label="תרופות קבועות או תוספי תזונה (כולל מינונים)">
          <textarea name="תרופות ותוספים" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
        </Field>
        <Field label="רגישות או אלרגיה לתרופות / חומרים" required>
          <YesNo name="אלרגיות" detailName="פירוט אלרגיות" detailLabel="פרט" onChange={setAllergies} showDetail={allergies} />
        </Field>
      </SectionCard>

      {/* 5 — צירוף מסמכים */}
      <SectionCard num="5" title="צירוף מסמכים">
        <p style={{ color: "#C3D2E8", fontSize: "0.9rem", lineHeight: 1.7 }}>
          📎 אנא צרף/י כאן קבצים רלוונטיים שיסייעו להבין את מצבך:
          <br />• סיכומי ביקור רפואיים (אורתופד, מיון, פיזיותרפיה)
          <br />• פענוח של בדיקות דימות (צילומי רנטגן, אולטרסאונד, MRI)
        </p>
        <label
          className="flex flex-col items-center justify-center gap-2 p-8 text-center"
          style={{
            border: "2px dashed rgba(43,87,184,0.5)",
            borderRadius: "16px",
            cursor: "pointer",
            background: "rgba(43,87,184,0.06)",
          }}
        >
          <span style={{ fontSize: "1.6rem" }}>📤</span>
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.95rem" }}>העלאת קבצים / Browse</span>
          <span style={{ color: "#8BA4C8", fontSize: "0.75rem" }}>PDF, תמונות או מסמכים · עד 10MB</span>
          <input type="file" name="attachment" multiple accept=".pdf,.jpg,.jpeg,.png,.heic,.doc,.docx" onChange={handleFiles} style={{ display: "none" }} />
        </label>
        {fileNames.length > 0 && (
          <div className="flex flex-col gap-1">
            {fileNames.map((n) => (
              <span key={n} style={{ color: "var(--accent)", fontSize: "0.8rem" }}>
                ✓ {n}
              </span>
            ))}
          </div>
        )}
      </SectionCard>

      {/* 6 — ציפיות ומטרות */}
      <SectionCard num="6" title="ציפיות ומטרות">
        <Field label="מהי המטרה העיקרית שלך מהמפגש הנוכחי?">
          <textarea name="מטרת המפגש" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
        </Field>
        <Field label="לאיזה יעד או פעילות ספורטיבית היית רוצה לחזור בהקדם?">
          <textarea name="יעד חזרה לפעילות" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
        </Field>
      </SectionCard>

      {/* Submit */}
      <div style={card} className="p-6 md:p-8 text-center flex flex-col gap-4">
        <p style={{ color: "#8BA4C8", fontSize: "0.85rem" }}>
          לאחר שליחת השאלון תועבר/י אוטומטית לקביעת מועד הפגישה ביומן של ד״ר כהן
        </p>
        <button
          type="submit"
          disabled={status === "sending" || status === "success"}
          className="w-full md:w-auto md:self-center px-12 py-4 rounded-xl font-extrabold text-base transition-all duration-200"
          style={{
            background: "var(--accent)",
            color: "#050E1F",
            opacity: status === "sending" ? 0.6 : 1,
            cursor: "pointer",
          }}
        >
          {status === "sending" ? "שולח..." : status === "success" ? "✓ נשלח!" : "שליחת השאלון ומעבר לקביעת תור 📅"}
        </button>
        {status === "success" && (
          <p className="text-sm font-bold" style={{ color: "var(--accent)" }}>
            ✅ השאלון נשלח בהצלחה! מעבירים אותך לקביעת תור...{" "}
            <a href={CALENDAR_URL} style={{ textDecoration: "underline", color: "var(--accent)" }}>
              לחץ כאן אם לא הועברת
            </a>
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-bold" style={{ color: "#FF3B30" }}>
            ⚠️ השליחה נכשלה. אפשר לנסות שוב או להתקשר: 054-663-5335
          </p>
        )}
        <p style={{ color: "#8BA4C8", fontSize: "0.75rem" }}>
          🔒 המידע נשלח ישירות לד״ר כהן בלבד ומשמש להכנת המפגש הרפואי
        </p>
      </div>
    </form>
  );
}
