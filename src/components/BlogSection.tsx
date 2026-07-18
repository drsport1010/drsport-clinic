"use client";

import Link from "next/link";
import { useContent } from "@/lib/useContent";
import { customExcerpt } from "@/lib/articles";

const defaultArticles = [
  {
    slug: "acl",
    category: "ברך",
    categoryColor: "#2B57B8",
    date: "יוני 2025",
    title: "קרע ברצועה הקדמית (ACL) - מה קורה בגוף ומה עושים אחרי",
    excerpt:
      'קרע ACL הוא אחת הפציעות המשמעותיות ביותר בספורט. ד״ר כהן מסביר מה קורה ברגע הקרע, מתי נדרש ניתוח שחזור, ומה לצפות בשנת השיקום - כולל חזרה מלאה לשדה.',
  },
  {
    slug: "achilles",
    category: "גיד אכילס",
    categoryColor: "#FF6D00",
    date: "מאי 2025",
    title: "קרע גיד אכילס - ניתוח מול טיפול שמרני: מה מתאים לך?",
    excerpt:
      'קרע מלא של גיד אכילס מרגיש כמו בעיטה מאחור - ופתאום נגמר המשחק. ד״ר כהן מסביר את ההבדל בין גישה ניתוחית לשמרנית, זמני שיקום ריאליים, וסיכויי חזרה לפעילות.',
  },
  {
    slug: "hamstring",
    category: "שרירים",
    categoryColor: "#00E676",
    date: "אפריל 2025",
    title: "קרעים בהמסטרינג - הפציעה שחוזרת שוב ושוב אם לא מטפלים נכון",
    excerpt:
      'קרעי המסטרינג הם הפציעה החוזרת הנפוצה ביותר בספורט. בלי שיקום מלא ומדויק, הסיכוי לפציעה חוזרת עולה ל-30%. ד״ר כהן מסביר למה זה קורה ואיך עוצרים את המעגל.',
  },
  {
    slug: "stress-fractures",
    category: "עצמות",
    categoryColor: "#9B59B6",
    date: "מרץ 2025",
    title: "שברי מאמץ - כאב שמתגנב ומסוכן להתעלם ממנו",
    excerpt:
      'שברי מאמץ נוצרים לאט, מבלי שאירע אירוע חד. ד״ר כהן מסביר אילו ספורטאים בסיכון, אילו אזורים בגוף הכי פגיעים, ולמה אבחנה מוקדמת היא ההבדל בין 6 שבועות לשנה של שיקום.',
  },
];

export default function BlogSection() {
  const { articles: customArticles } = useContent();
  const articles = [
    ...defaultArticles,
    ...(customArticles || []).map((c) => ({
      slug: c.slug,
      category: c.category || "כללי",
      categoryColor: c.categoryColor || "#2B57B8",
      date: c.date || "",
      title: c.title,
      excerpt: customExcerpt(c),
    })),
  ];
  return (
    <section
      id="blog"
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
            בלוג פציעות ספורט
          </h2>
          <div
            className="h-1 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, var(--accent))",
              width: "200px",
              marginRight: "0",
              marginLeft: "auto",
            }}
          />
          <p className="mt-4 text-base" style={{ color: "#8BA4C8" }}>
            עדכונים, מחקרים, וטיפים ממרפאת ד״ר ספורט
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, i) => (
            <article
              key={i}
              className="card-hover rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "#0D1B35",
                border: "1px solid rgba(43,87,184,0.3)",
              }}
            >
              {/* Top row: badge + date */}
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: article.categoryColor + "22",
                    color: article.categoryColor,
                    border: `1px solid ${article.categoryColor}44`,
                  }}
                >
                  {article.category}
                </span>
                <span className="text-xs" style={{ color: "#8BA4C8" }}>
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold leading-snug"
                style={{ color: "#F0F4FF" }}
              >
                {article.title}
              </h3>

              {/* Excerpt */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "#8BA4C8" }}
              >
                {article.excerpt}
              </p>

              {/* Read more link */}
              <Link
                href={`/blog/${article.slug}`}
                className="text-sm font-bold transition-all duration-200 inline-flex items-center gap-1"
                style={{ color: "var(--accent)", textDecoration: "none" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent-dark)";
                  e.currentTarget.style.textShadow =
                    "0 0 12px color-mix(in srgb, var(--accent) 50%, transparent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                קרא עוד ←
              </Link>
            </article>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-10">
          <a
            href="#blog"
            className="inline-block px-8 py-3 rounded-full text-sm font-bold transition-all duration-200"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 10%, transparent)";
              e.currentTarget.style.boxShadow =
                "0 0 20px color-mix(in srgb, var(--accent) 20%, transparent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            כל המאמרים
          </a>
        </div>
      </div>
    </section>
  );
}
