import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsTicker from "@/components/NewsTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles, getArticle, customToArticle, type Article } from "@/lib/articles";
import { getServerContent } from "@/lib/serverContent";
import { renderRichText } from "@/lib/richText";

type Props = { params: Promise<{ slug: string }> };

function findArticle(slug: string): Article | undefined {
  const custom = (getServerContent().articles || []).find((a) => a.slug === slug);
  if (custom) return customToArticle(custom);
  return getArticle(slug);
}

export function generateStaticParams() {
  const customSlugs = (getServerContent().articles || []).map((a) => ({ slug: a.slug }));
  return [...articles.map((article) => ({ slug: article.slug })), ...customSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Dr. Sport - ד״ר אלון כהן`,
    description: article.sections[0]?.paragraphs[0]?.slice(0, 150),
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  return (
    <>
      <NewsTicker />
      <Header />
      <main style={{ paddingTop: "104px", background: "#050E1F" }}>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-right">
          {/* Back link */}
          <Link
            href="/#blog"
            className="inline-block text-sm font-bold mb-8"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            → חזרה לבלוג
          </Link>

          {/* Meta row */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm" style={{ color: "#8BA4C8" }}>
              {article.date}
            </span>
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
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-extrabold leading-tight mb-4"
            style={{ color: "#F0F4FF" }}
          >
            {article.title}
          </h1>
          <div
            className="h-1 rounded-full mb-10"
            style={{
              background: "linear-gradient(90deg, transparent, var(--accent))",
              width: "160px",
              marginLeft: "auto",
            }}
          />

          {/* Sections */}
          {article.sections.map((section, si) => (
            <section key={si} className="mb-10">
              {section.heading && (
                <h2
                  className="text-xl md:text-2xl font-extrabold mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "#C3D2E8" }}
                >
                  {renderRichText(paragraph)}
                </p>
              ))}
              {section.bullets && (
                <ul className="flex flex-col gap-3 mt-2 pr-1">
                  {section.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="rounded-xl px-4 py-3 text-sm leading-relaxed"
                      style={{
                        background: "#0D1B35",
                        border: "1px solid rgba(43,87,184,0.3)",
                        color: "#C3D2E8",
                      }}
                    >
                      {bullet.label && (
                        <strong style={{ color: "#F0F4FF" }}>
                          {bullet.label}{" "}
                        </strong>
                      )}
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Rating callout */}
          {(article.rating.score || article.rating.text) && (
            <div
              className="rounded-2xl p-6 mb-12"
              style={{
                background: "linear-gradient(135deg, #0B1F4A 0%, #1A3A7C 100%)",
                border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                boxShadow: "0 0 40px color-mix(in srgb, var(--accent) 8%, transparent)",
              }}
            >
              {article.rating.score && (
                <p
                  className="text-lg font-extrabold mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  מדד הלא נעים: {article.rating.score}
                </p>
              )}
              <p className="text-sm leading-relaxed" style={{ color: "#C3D2E8" }}>
                {article.rating.text}
              </p>
            </div>
          )}

          {/* CTA */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background: "#0D1B35",
              border: "1px solid rgba(43,87,184,0.3)",
            }}
          >
            <p
              className="text-lg font-extrabold mb-1"
              style={{ color: "#F0F4FF" }}
            >
              נפצעת? אל תחכה שיעבור לבד
            </p>
            <p className="text-sm mb-4" style={{ color: "#8BA4C8" }}>
              קבע תור לאבחון מקצועי אצל ד״ר אלון כהן
            </p>
            <a
              href="tel:0546635335"
              className="inline-block text-sm font-bold px-6 py-3 rounded-full"
              style={{
                background: "var(--accent)",
                color: "#050E1F",
                textDecoration: "none",
              }}
            >
              📞 054-663-5335
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
