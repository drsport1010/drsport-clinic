const athletes = [
  {
    name: "ניימאר",
    sport: "⚽ כדורגל",
    injury: "פציעה בשריר התאומים (שוק ימין)",
    phase: "שלב 3 - אימונים קלים",
    phaseColor: "#2B57B8",
    progress: 75,
    eta: "סוף יוני / תחילת יולי 2026",
    description:
      "ניימאר נמצא בשלבים האחרונים של שיקום מפציעה בשריר התאומים ברגל ימין. הכוכב הברזילאי כבר חזר השבוע לאימונים קלים על המגרש ועורך אימוני התאמה פיזיים. בנבחרת ברזיל אופטימיים לגבי שילובו בהמשך משחקי גביע העולם, אך הוא לא יסכן את המשך הטורניר וצפוי לחזור רק כשישלים אימון מלא.",
  },
  {
    name: "תמיר בלאט",
    sport: "🏀 כדורסל",
    injury: "פציעה בשוק ימין",
    phase: "Day-to-Day - הערכת מצב",
    phaseColor: "#FF6D00",
    progress: 50,
    eta: "יוני 2026 (סדרת הגמר)",
    description:
      'רכז מכבי תל אביב סובל מפציעה בשוק ימין שגרמה לו להחמיץ את פתיחת סדרת הגמר מול הפועל תל אביב. בצוות הרפואי של הצהובים עושים מאמצים להכשיר אותו, והוא נמצא תחת הערכת מצב יומיומית ("Day-to-Day") במטרה להחזירו לרוטציה עוד במהלך הסדרה.',
  },
  {
    name: "הוגו אקטיקה",
    sport: "⚽ כדורגל",
    injury: "קרע בגיד האכילס (רגל ימין)",
    phase: "שלב 2 - שיקום פעיל",
    phaseColor: "#2B57B8",
    progress: 30,
    eta: "26 בדצמבר 2026",
    description:
      'חלוץ ליברפול עבר ניתוח מוצלח בלונדון לאחר שקרע את גיד האכילס ברגל ימין במהלך משחק חצי גמר אלופות. למרות שפציעות מסוג זה לוקחות לרוב כ-9 חודשים, דיווחים עדכניים מראים על התקדמות פנומנלית בשיקום. אקטיקה מכוון לחזרה לאימונים כבר בסתיו, במטרה לשוב למגרשים ב"בוקסינג דיי" (26 בדצמבר).',
  },
  {
    name: "קרלוס אלקראס",
    sport: "🎾 טניס",
    injury: "דלקת בגיד שורש כף היד הימנית",
    phase: "שלב 2 - שיקום שמרני",
    phaseColor: "#FF6D00",
    progress: 45,
    eta: "סוף יולי / תחילת אוגוסט 2026",
    description:
      "הטניסאי הספרדי המדורג 1 בעולם הושבת בעקבות דלקת חריפה בגיד של שורש כף היד הימנית, מה שאילץ אותו להחמיץ את טורניר רומא ואת אליפות צרפת הפתוחה (רולאן גארוס). אלקראס פועל לפי גישה שמרנית וזהירה כדי למנוע נזק כרוני, והוא צפוי לשוב לסבב המגרשים הקשים בקיץ הקרוב.",
  },
  {
    name: "איסמעיל קונה",
    sport: "⚽ כדורגל",
    injury: "שבר כפול ומורכב בשוקית וברשתית הרגל השמאלית (Tibia & Fibula)",
    phase: "שלב 1 - לאחר ניתוח",
    phaseColor: "#8BA4C8",
    progress: 5,
    eta: "אוקטובר-דצמבר 2026",
    description:
      "קשר נבחרת קנדה ומארסיי ספג שבר כפול ומורכב בשוקית וברשתית הרגל השמאלית במהלך משחק מונדיאל מול קטאר באצטדיון BC Place בוונקובר (18 ביוני 2026). הוא פונה ישירות מהמגרש לבית חולים ועבר ניתוח אורתופדי דחוף. קונה יחמיץ את המשך הטורניר, וצפי ההחלמה עומד על 4-6 חודשים לפחות, בכפוף למצב הרקמות הרכות וכלי הדם.",
  },
  {
    name: "דונטה וינצ'נזו",
    sport: "🏀 כדורסל",
    injury: "קרע מלא בגיד האכילס (רגל ימין)",
    phase: "שלב 1 - שיקום ראשוני",
    phaseColor: "#8BA4C8",
    progress: 10,
    eta: "אפריל / מאי 2027",
    description:
      "הגארד חווה את אחת הפציעות הקשות ביותר בספורט כאשר קרע את גיד האכילס ברגל ימין בתחילת משחק פלייאוף לאחר ניסיון זריקה לשלוש. וינצ'נזו עבר ניתוח לחיבור הגיד והחל בתהליך שיקום ארוך ומפרך שיגרום לו להחמיץ את מרבית, אם לא את כל, עונת ה-NBA הקרובה.",
  },
];

function getProgressGradient(progress: number): string {
  if (progress >= 60) {
    return `linear-gradient(90deg, #1A3A7C 0%, #00E676 100%)`;
  }
  return `linear-gradient(90deg, #1A3A7C 0%, #FF6D00 100%)`;
}

export default function RecoveryTracker() {
  return (
    <section
      id="recovery"
      className="section-pad"
      style={{ background: "#050E1F" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-right">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{ color: "#F0F4FF" }}
          >
            מעקב שיקום ספורטאים
          </h2>
          <div
            className="h-1 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, #FF6D00)",
              width: "200px",
              marginLeft: "auto",
            }}
          />
          <p className="mt-4 text-base" style={{ color: "#8BA4C8" }}>
            מעקב בזמן אמת על תהליך השיקום
          </p>
        </div>

        {/* Athlete Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {athletes.map((athlete, i) => (
            <div
              key={i}
              className="card-hover rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "#0D1B35",
                border: "1px solid rgba(43,87,184,0.3)",
              }}
            >
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className="text-lg font-extrabold"
                    style={{ color: "#F0F4FF" }}
                  >
                    {athlete.name}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: "#8BA4C8" }}>
                    {athlete.sport}
                  </p>
                </div>
                {/* Phase badge */}
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: athlete.phaseColor + "22",
                    color: athlete.phaseColor,
                    border: `1px solid ${athlete.phaseColor}44`,
                  }}
                >
                  {athlete.phase}
                </span>
              </div>

              {/* Injury */}
              <div
                className="text-sm px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(43,87,184,0.15)",
                  color: "#8BA4C8",
                }}
              >
                🤕 <span className="font-semibold">{athlete.injury}</span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "#8BA4C8" }}>
                {athlete.description}
              </p>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs" style={{ color: "#8BA4C8" }}>
                    התקדמות שיקום
                  </span>
                  <span
                    className="text-sm font-extrabold"
                    style={{
                      color:
                        athlete.progress >= 60 ? "#00E676" : "#FF6D00",
                    }}
                  >
                    {athlete.progress}%
                  </span>
                </div>
                <div
                  className="w-full h-3 rounded-full overflow-hidden"
                  style={{ background: "rgba(43,87,184,0.2)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${athlete.progress}%`,
                      background: getProgressGradient(athlete.progress),
                      boxShadow:
                        athlete.progress >= 60
                          ? "0 0 10px rgba(0,230,118,0.4)"
                          : "0 0 10px rgba(255,109,0,0.4)",
                    }}
                  />
                </div>
              </div>

              {/* ETA */}
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "#8BA4C8" }}
              >
                <span>📅</span>
                <span>
                  צפי חזרה:{" "}
                  <strong style={{ color: "#F0F4FF" }}>{athlete.eta}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: "ספורטאים בשיקום", value: "24" },
            { label: "ממוצע זמן שיקום", value: "4.2 חודשים" },
            { label: "שיעור חזרה מלאה", value: "94%" },
            { label: "ניתוחים השנה", value: "187" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center"
              style={{
                background: "rgba(43,87,184,0.1)",
                border: "1px solid rgba(43,87,184,0.25)",
              }}
            >
              <div
                className="text-2xl font-extrabold glow-green"
                style={{ color: "#00E676" }}
              >
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: "#8BA4C8" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
