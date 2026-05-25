import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/marketing/icon";
import { SectionHeading } from "@/components/marketing/section-heading";
import { EB_PHOTOS } from "@/lib/photos";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Le concept — Espace Blanc, la marge qui apaise",
  description:
    "Espace blanc : la marge, la lumière qui entre, le silence qui suit. Une posture sereine et précise pour vider un logement sans précipitation.",
};

export default function ConceptPage() {
  return (
    <div className="view">
      <section
        style={{
          paddingTop: 160,
          paddingBottom: 60,
          background: "var(--ivory)",
        }}
      >
        <div className="page">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span className="eyebrow">Le concept</span>
            <span className="eyebrow">Espace Blanc</span>
            <span className="eyebrow">La marge qui apaise</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 500,
              fontSize: "clamp(60px, 9vw, 156px)",
              lineHeight: 0.98,
              letterSpacing: "-0.015em",
              color: "var(--ink)",
            }}
          >
            La marge,
            <br />
            <em>la lumière qui entre</em>
          </h1>
          <p
            style={{
              fontSize: 21,
              color: "var(--ink-soft)",
              marginTop: 36,
              maxWidth: "54ch",
              lineHeight: 1.6,
            }}
          >
            Le blanc devient ce qu&apos;il dit : la marge, la lumière qui entre,
            le silence qui suit. Une posture sereine et précise, sans pathos.
            Des photographies d&apos;intérieurs en plein jour, du bois clair,
            du lin, du laiton.
          </p>
          <p
            style={{
              fontSize: 18.5,
              color: "var(--ink-soft)",
              marginTop: 28,
              maxWidth: "62ch",
              borderLeft: "2px solid var(--ember)",
              paddingLeft: 22,
              fontStyle: "italic",
              lineHeight: 1.65,
            }}
          >
            Pour le dictionnaire,{" "}
            <span style={{ textDecoration: "line-through" }}>débarrasser</span>{" "}
            signifie retirer d&apos;un lieu tout ce qu&apos;il contient. Chez
            Espace Blanc, il n&apos;y a pas de débarras. Il y a un passage : on
            mesure, on valorise, on transmet. Ce qui s&apos;en va trouve preneur.
          </p>
        </div>
      </section>

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
            <div className="photo" style={{ aspectRatio: "3/4" }}>
              <div
                className="img"
                style={{ backgroundImage: `url(${EB_PHOTOS.portrait})` }}
              />
            </div>
            <div>
              <span className="eyebrow">Portrait</span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: "clamp(40px, 5vw, 72px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.005em",
                  marginTop: 14,
                  color: "var(--ink)",
                }}
              >
                Une seule <em>interlocutrice</em>
              </h2>
              <div
                style={{
                  marginTop: 32,
                  fontSize: 17.5,
                  lineHeight: 1.65,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  maxWidth: "58ch",
                  color: "var(--ink-soft)",
                }}
              >
                <p>
                  J&apos;ai vidé l&apos;appartement de ma grand-mère en 2019. Je
                  n&apos;y connaissais rien. Personne ne m&apos;avait dit que
                  vider, ce n&apos;est pas démonter. Que les objets racontent,
                  qu&apos;il faut les écouter avant de leur trouver une suite.
                  Que la lenteur protège.
                </p>
                <p>
                  Trois ans plus tard, Espace Blanc est né. Une équipe
                  restreinte. Des prestataires de confiance. Un seul numéro à
                  appeler. Et la conviction que ce métier est tout sauf une
                  logistique.
                </p>
                <p>
                  Nous accompagnons aujourd&apos;hui une dizaine de familles
                  par mois. Aucune ne se ressemble. Toutes nous écrivent après.
                  C&apos;est notre meilleur indicateur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "120px 0", background: "var(--lin)" }}>
        <div className="page">
          <SectionHeading
            eyebrow="Vocabulaire"
            title={
              <>
                Les mots <em>que nous tenons</em>
              </>
            }
            aside="Et ceux que nous n'employons pas."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              marginTop: 56,
            }}
          >
            <div>
              <span className="eyebrow">Mots oui</span>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 500,
                  fontStyle: "italic",
                  lineHeight: 1.35,
                  letterSpacing: "-0.005em",
                  color: "var(--ink)",
                }}
              >
                passage · allègement · valoriser · transmettre · soigner ·
                mesurer · respecter · soulager · restituer
              </div>
            </div>
            <div>
              <span className="eyebrow">Mots non</span>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 500,
                  lineHeight: 1.35,
                  color: "var(--ink-mute)",
                  textDecoration: "line-through",
                  textDecorationColor: "var(--ember)",
                  textDecorationThickness: "1px",
                }}
              >
                débarras · vide-grenier · ramassage · lot · encombrant ·
                enlèvement
              </div>
            </div>
          </div>
        </div>
      </section>

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
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 1.05,
              color: "var(--on-dark)",
              maxWidth: "20ch",
              margin: "0 auto",
            }}
          >
            On commence par <em>une conversation</em>
          </h2>
          <Link
            href={ROUTES.contact}
            className="btn btn-ivory"
            style={{ marginTop: 40 }}
          >
            Échanger avec nous <Icon name="arrow-right" size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
