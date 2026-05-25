import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal-shell";
import { BRAND } from "@/lib/routes";

export const metadata: Metadata = {
  title: `Mentions légales — ${BRAND}`,
  description:
    "Éditeur, hébergeur et informations légales du site Espace Blanc.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalShell
      eyebrow="Informations légales"
      title={
        <>
          Mentions <em>légales</em>
        </>
      }
      intro="Les informations ci-dessous sont publiées en application de la loi pour la confiance dans l'économie numérique (LCEN) du 21 juin 2004."
      updatedAt="Mai 2026"
    >
      <h2>Éditeur du site</h2>
      <p>
        <strong>ESPACE BLANC</strong>
        <br />
        12, rue de Montreuil
        <br />
        78000 Versailles
        <br />
        Téléphone : <a href="tel:+33651256465">06 51 25 64 65</a>
        <br />
        Courriel :{" "}
        <a href="mailto:contact@espace-blanc.com">contact@espace-blanc.com</a>
      </p>
      <p>
        SIRET : 891 953 333 00012
        <br />
        Dirigeante : Eugénia Amo
        <br />
        Directrice de la publication : Eugénia Amo
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>
        <br />
        440 N Barranca Avenue, #4133
        <br />
        Covina, CA 91723, États-Unis
        <br />
        Site web :{" "}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          vercel.com
        </a>
      </p>

      <h2>Conception et développement</h2>
      <p>
        Site conçu et développé sur mesure avec <strong>Next.js</strong>{" "}
        (framework React) et déployé sur l&apos;infrastructure edge de Vercel.
        Les données du formulaire de contact sont transmises par messagerie via{" "}
        <strong>Resend</strong>. L&apos;espace client repose sur{" "}
        <strong>Supabase</strong> pour l&apos;authentification et le stockage
        des dossiers.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu présent sur ce site (textes, photographies,
        illustrations, identité visuelle, code source) est la propriété
        exclusive d&apos;Espace Blanc, sauf mention contraire. Toute
        reproduction, représentation, diffusion ou exploitation, totale ou
        partielle, sans autorisation écrite préalable est interdite et
        constituerait une contrefaçon au sens des articles L.335-2 et suivants
        du Code de la propriété intellectuelle.
      </p>

      <h2>Crédits photos</h2>
      <p>
        Photographies d&apos;ambiance : sources libres de droits sous licence
        d&apos;exploitation, archives Espace Blanc.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Espace Blanc s&apos;efforce d&apos;assurer l&apos;exactitude et la mise
        à jour des informations diffusées sur ce site, mais ne saurait être
        tenu responsable des erreurs, omissions ou d&apos;une indisponibilité
        des informations et des services. Les informations communiquées ne
        sauraient engager la responsabilité d&apos;Espace Blanc au-delà de ses
        obligations contractuelles.
      </p>

      <h2>Données personnelles et cookies</h2>
      <p>
        Les conditions de traitement des données personnelles ainsi que les
        cookies déposés lors de la navigation sont détaillés dans notre{" "}
        <a href="/confidentialite">Politique de confidentialité</a>.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Le présent site est régi par le droit français. En cas de litige,
        compétence est attribuée aux tribunaux de Versailles, sauf disposition
        impérative contraire.
      </p>
    </LegalShell>
  );
}
