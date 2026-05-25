import Link from "next/link";
import { Icon } from "./icon";
import { SectionHeading } from "./section-heading";
import { ROUTES, PHONE, PHONE_TEL } from "@/lib/routes";
import { ACCOMP_CONTENT, type AccompKey } from "@/content/accompagnements";

export function AccompagnementPage({ which }: { which: AccompKey }) {
  const c = ACCOMP_CONTENT[which];

  return (
    <div className="view">
      {/* Hero */}
      <section
        style={{
          paddingTop: 160,
          paddingBottom: 80,
          background: "var(--ivory)",
        }}
      >
        <div className="page">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span className="eyebrow">{c.label}</span>
            <span className="eyebrow">Île-de-France</span>
            <span className="eyebrow">Diagnostic gratuit</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 72,
              alignItems: "end",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: "clamp(54px, 8vw, 124px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.015em",
                  color: "var(--ink)",
                }}
              >
                {c.title}
              </h1>
              <p
                style={{
                  fontSize: 20,
                  color: "var(--ink-soft)",
                  marginTop: 32,
                  maxWidth: "44ch",
                  lineHeight: 1.55,
                }}
              >
                {c.strap}
              </p>
              <div
                style={{
                  marginTop: 36,
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <Link href={ROUTES.contact} className="btn">
                  Diagnostic gratuit <Icon name="arrow-right" size={13} />
                </Link>
                <Link href={ROUTES.methode} className="btn btn-ghost">
                  Voir la méthode complète
                </Link>
              </div>
            </div>
            <div className="photo" style={{ aspectRatio: "4/5" }}>
              <div
                className="img"
                style={{ backgroundImage: `url(${c.img})` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui + Pourquoi */}
      <section
        style={{
          padding: "100px 0",
          background: "var(--lin)",
        }}
      >
        <div className="page">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 72,
            }}
          >
            <div>
              <span className="eyebrow">Pour qui c&apos;est conçu</span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: "clamp(38px, 4.5vw, 64px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.005em",
                  marginTop: 14,
                  color: "var(--ink)",
                }}
              >
                À <em>vous trois</em>
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  marginTop: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                }}
              >
                {c.pour.map((p, i) => (
                  <li
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "44px 1fr",
                      gap: 20,
                      padding: "20px 0",
                      borderTop:
                        i === 0
                          ? "1px solid var(--sable)"
                          : "1px solid var(--line)",
                    }}
                  >
                    <span
                      className="warm-gradient"
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        fontSize: 26,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: 16.5,
                        lineHeight: 1.55,
                        color: "var(--ink)",
                      }}
                    >
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="eyebrow">Pourquoi c&apos;est difficile seul</span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: "clamp(38px, 4.5vw, 64px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.005em",
                  marginTop: 14,
                  color: "var(--ink)",
                }}
              >
                Ce <em>qu&apos;on ne dit pas</em>
              </h2>
              <p
                style={{
                  fontSize: 18.5,
                  lineHeight: 1.6,
                  marginTop: 32,
                  color: "var(--ink-soft)",
                }}
              >
                {c.pourquoi}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment */}
      <section style={{ padding: "120px 0", background: "var(--ivory)" }}>
        <div className="page">
          <SectionHeading
            eyebrow="Comment on vous aide"
            title={
              <>
                Cinq étapes <em>appliquées</em>
              </>
            }
            aside="Notre méthode, dans votre situation précise."
          />

          <div
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 32,
            }}
          >
            {c.comment.map(([t, d], i) => (
              <div
                key={t}
                style={{
                  paddingTop: 24,
                  borderTop: "1px solid var(--sable)",
                }}
              >
                <span
                  className="warm-gradient"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    fontSize: 52,
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 14,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    fontSize: 22,
                    letterSpacing: "-0.005em",
                    lineHeight: 1.15,
                    marginBottom: 8,
                    color: "var(--ink)",
                  }}
                >
                  {t}
                </h4>
                <p
                  style={{
                    fontSize: 14.5,
                    color: "var(--ink-soft)",
                    lineHeight: 1.55,
                  }}
                >
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres + témoignage */}
      <section style={{ padding: "120px 0", background: "var(--lin)" }}>
        <div className="page">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 72,
              alignItems: "center",
            }}
          >
            <div>
              <span className="eyebrow">Cas-type observé</span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: "clamp(40px, 4.5vw, 64px)",
                  lineHeight: 1.05,
                  marginTop: 14,
                  letterSpacing: "-0.005em",
                  color: "var(--ink)",
                }}
              >
                Le <em>cas-type</em>
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  marginTop: 32,
                  gap: 24,
                }}
              >
                {c.chiffres.map(([v, l]) => (
                  <div
                    key={l}
                    style={{
                      paddingTop: 22,
                      borderTop: "1px solid var(--sable)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        fontSize: "clamp(34px, 3.8vw, 52px)",
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                        color: "var(--ink)",
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        color: "var(--ink-mute)",
                        fontSize: 13.5,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="eyebrow">Lettre reçue</span>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(22px, 2.2vw, 30px)",
                  lineHeight: 1.35,
                  marginTop: 16,
                  letterSpacing: "-0.005em",
                  color: "var(--ink)",
                }}
              >
                « {c.temoignage.q} »
              </div>
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    backgroundImage: `url(${c.temoignage.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 500,
                      fontSize: 18,
                      color: "var(--ink)",
                    }}
                  >
                    {c.temoignage.who}
                  </div>
                  <div className="eyebrow" style={{ marginTop: 2 }}>
                    {c.temoignage.role} · {c.temoignage.city}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prix */}
      <section style={{ padding: "120px 0", background: "var(--ivory)" }}>
        <div className="page">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: 72,
              alignItems: "start",
            }}
          >
            <div>
              <span className="eyebrow">Tarif indicatif</span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: "clamp(40px, 5vw, 68px)",
                  lineHeight: 1.05,
                  marginTop: 14,
                  letterSpacing: "-0.005em",
                  color: "var(--ink)",
                }}
              >
                {c.prix.from},
                <br />
                <em>diagnostic compris</em>
              </h2>
              <p
                style={{
                  color: "var(--ink-soft)",
                  marginTop: 20,
                  maxWidth: "34ch",
                  fontSize: 16.5,
                  lineHeight: 1.6,
                }}
              >
                Tarif net, sans frais cachés. Devis détaillé sous 24h après
                visite à blanc.
              </p>
              <Link
                href={ROUTES.contact}
                className="btn"
                style={{ marginTop: 32 }}
              >
                Demander mon devis <Icon name="arrow-right" size={13} />
              </Link>
            </div>
            <div>
              <span className="eyebrow">Ce qui est inclus</span>
              <ul style={{ listStyle: "none", marginTop: 18 }}>
                {c.prix.inclus.map((it, i) => (
                  <li
                    key={it}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "44px 1fr 32px",
                      gap: 14,
                      padding: "20px 0",
                      borderTop:
                        i === 0
                          ? "1px solid var(--sable)"
                          : "1px solid var(--line)",
                    }}
                  >
                    <span className="eyebrow">0{i + 1}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontWeight: 500,
                        fontSize: 22,
                        letterSpacing: "-0.005em",
                        color: "var(--ink)",
                      }}
                    >
                      {it}
                    </span>
                    <span style={{ color: "#d8702a" }}>
                      <Icon name="check" size={20} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "140px 0",
          background: "var(--encre)",
          color: "var(--on-dark)",
        }}
      >
        <div className="page" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(48px, 7vw, 110px)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              color: "var(--on-dark)",
            }}
          >
            On en parle <em style={{ color: "var(--amber)" }}>quand vous voulez</em>
          </h2>
          <p
            style={{
              fontSize: 18.5,
              color: "var(--on-dark-mute)",
              maxWidth: "52ch",
              margin: "24px auto 0",
              lineHeight: 1.6,
            }}
          >
            Aucune obligation, aucune pression. Une conversation, un devis, et
            la liberté de dire non.
          </p>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href={ROUTES.contact} className="btn btn-ivory">
              Demander un diagnostic
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-outline-light">
              <Icon name="phone" size={13} /> {PHONE}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
