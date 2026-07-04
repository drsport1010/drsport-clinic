const tickerItems = [
  "מבזק: ניימאר מחוץ לסגל ברזיל למשחק מול האיטי בשל פציעה בתאומים; ימשיך בשיקום בניו ג'רזי במטרה לחזור למשחק השלישי במונדיאל 🏃",
  "מבזק: תמיר בלאט נפצע בשוק ימין וייעדר ממשחק 3 בגמר ווינר סל מול הפועל תל אביב; במכבי מנסים להכשירו להמשך הסדרה 🏀",
  "מבזק: בשורה אדירה לליברפול: הוגו אקטיקה מקדים את לו\"ז ההחלמה מהקרע באכילס ומכוון לקאמבק רשמי ב-26 בדצמבר ⚽",
  "מבזק: קרלוס אלקראס מגביר את קצב השיקום מפציעת שורש כף היד; צפוי לחזור למגרשים בסוף חודש יולי 🎾",
  "מבזק מונדיאל: קשר נבחרת קנדה איסמעיל קונה עבר ניתוח דחוף בוונקובר בעקבות שבר כפול ומורכב ברגל השמאלית (Tibia & Fibula) ויחמיץ את המשך הטורניר ⚽",
  "מבזק: מכה אנושה: דונטה וינצ'נזו עבר ניתוח לתיקון קרע מלא בגיד האכילס הימני; צפוי להחמיץ את עונת 2026/27 במלואה 🏀",
];

export default function NewsTicker() {
  // 2 copies exactly - animation moves -50% for seamless loop
  const repeatedItems = [...tickerItems, ...tickerItems];

  return (
    <div
      className="w-full overflow-hidden flex items-center"
      style={{
        background: "#050E1F",
        borderBottom: "1px solid rgba(43,87,184,0.5)",
        height: "40px",
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 60,
      }}
    >
      {/* LIVE badge on the right (RTL) */}
      <div
        className="flex items-center gap-2 flex-shrink-0 px-4"
        style={{
          borderLeft: "1px solid rgba(43,87,184,0.5)",
          height: "100%",
        }}
      >
        <span
          className="pulse-dot inline-block w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: "#FF3B30" }}
        />
        <span
          className="text-xs font-bold tracking-widest"
          style={{ color: "#FF3B30" }}
        >
          LIVE
        </span>
      </div>

      {/* Scrolling ticker - dir:ltr forces physical LTR so inline-flex starts at left edge */}
      <div className="flex-1 overflow-hidden relative" dir="ltr">
        <div className="ticker-text">
          {repeatedItems.map((item, i) => (
            <span key={i} className="inline-block" style={{ color: "#00E676" }}>
              <span className="mx-6 text-sm font-medium">{item}</span>
              <span
                className="mx-3 text-xs"
                style={{ color: "rgba(0,230,118,0.4)" }}
              >
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
