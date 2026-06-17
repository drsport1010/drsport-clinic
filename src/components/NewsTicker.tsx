const tickerItems = [
  "מברזיל: נמאר נפצע בברך ימין, צפוי 8 שבועות פרישה 🏃",
  "NBA: LeBron James חוזר לאימונים לאחר 3 שבועות שיקום",
  "ליגת העל: מגן ב׳ מכבי חיפה נקרע בגיד אכילס",
  "ריצה: אליפות העולם — שניים פרשו עקב עוויתות שרירים",
  "כדורגל: מסי חוזר ב-100% לאחר עומס יתר",
  "טניס: רפאל נדאל ממשיך שיקום לאחר ניתוח ירך",
];

export default function NewsTicker() {
  // 2 copies exactly — animation moves -50% for seamless loop
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

      {/* Scrolling ticker — dir:ltr forces physical LTR so inline-flex starts at left edge */}
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
