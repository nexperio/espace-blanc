import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal-shell";
import { BRAND } from "@/lib/routes";

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${BRAND}`,
  description:
    "Traitement des données personnelles, droits d'accès, cookies et liens hypertextes sur le site Espace Blanc.",
};

export default function ConfidentialitePage() {
  return (
    <LegalShell
      eyebrow="Vos données"
      title={
        <>
          Politique de <em>confidentialité</em>
        </>
      }
      intro="Nous traitons vos données personnelles avec la même précaution que les objets que vous nous confiez : strict besoin, durée minimale, aucun usage commercial."
      updatedAt="Mai 2026"
    >
      <h2>Conditions générales d&apos;utilisation du site</h2>
      <p>
        L&apos;utilisation du site{" "}
        <a href="https://espace-blanc.com">espace-blanc.com</a> implique
        l&apos;acceptation pleine et entière des conditions d&apos;utilisation
        décrites ci-après. Ces conditions sont susceptibles d&apos;être
        modifiées ou complétées à tout moment ; les utilisateurs sont invités
        à les consulter régulièrement.
      </p>
      <p>
        Le site est accessible à tout moment aux utilisateurs. Une interruption
        pour raison de maintenance technique peut être toutefois décidée par
        l&apos;éditeur, qui s&apos;efforcera alors de communiquer préalablement
        aux utilisateurs les dates et heures de l&apos;intervention.
      </p>

      <h2>Description des services fournis</h2>
      <p>
        Le site{" "}
        <a href="https://espace-blanc.com">espace-blanc.com</a> a pour objet de
        présenter les activités d&apos;Espace Blanc, de permettre la prise de
        contact et, pour les clients accompagnés, d&apos;accéder à leur
        dossier via l&apos;espace client.
      </p>
      <p>
        L&apos;éditeur s&apos;efforce de fournir des informations aussi
        précises que possible. Toutefois, il ne pourra être tenu responsable
        des omissions, inexactitudes ou carences dans la mise à jour, qu&apos;elles
        soient de son fait ou du fait des tiers partenaires qui lui fournissent
        ces informations.
      </p>

      <h2>Limitations contractuelles sur les données techniques</h2>
      <p>
        Le site ne pourra être tenu responsable de dommages matériels liés à
        son utilisation. De plus, l&apos;utilisateur s&apos;engage à accéder au
        site en utilisant un matériel récent, ne contenant pas de virus et
        muni d&apos;un navigateur à jour.
      </p>

      <h2>Données personnelles — RGPD</h2>
      <p>
        Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi
        Informatique et Libertés modifiée, les données personnelles collectées
        sur ce site font l&apos;objet d&apos;un traitement par Espace Blanc,
        responsable de traitement, situé 12, rue de Montreuil, 78000
        Versailles.
      </p>

      <h3>Données collectées</h3>
      <p>
        À l&apos;occasion de l&apos;utilisation du site, peuvent être
        recueillies :
      </p>
      <ul>
        <li>
          Les informations communiquées volontairement via le formulaire de
          contact (nom, prénom, courriel, téléphone, message, situation
          décrite) ;
        </li>
        <li>
          Les informations transmises lors de la création d&apos;un compte
          client (identifiants, données de dossier) ;
        </li>
        <li>
          Des données techniques de navigation : adresse IP, type de
          navigateur, pages consultées, horodatage, source de visite.
        </li>
      </ul>

      <h3>Finalités et bases légales</h3>
      <ul>
        <li>
          <strong>Réponse aux demandes de contact et établissement de devis</strong>{" "}
          — base : mesures précontractuelles à la demande de la personne (art.
          6.1.b RGPD).
        </li>
        <li>
          <strong>Exécution des prestations et suivi du dossier client</strong>{" "}
          — base : exécution du contrat (art. 6.1.b).
        </li>
        <li>
          <strong>Sécurité du site et prévention des abus</strong> — base :
          intérêt légitime de l&apos;éditeur (art. 6.1.f).
        </li>
        <li>
          <strong>Obligations comptables et légales</strong> (facturation,
          archivage) — base : obligation légale (art. 6.1.c).
        </li>
      </ul>

      <h3>Destinataires et sous-traitants</h3>
      <p>
        Vos données sont strictement destinées à Espace Blanc. Elles peuvent
        être transmises à nos sous-traitants techniques, tenus contractuellement
        à la confidentialité :
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> — hébergement du site (États-Unis,
          encadré par les Clauses Contractuelles Types de la Commission
          européenne) ;
        </li>
        <li>
          <strong>Resend</strong> — acheminement des courriels du formulaire
          de contact ;
        </li>
        <li>
          <strong>Supabase</strong> — authentification et stockage des
          dossiers de l&apos;espace client (hébergement Union européenne).
        </li>
      </ul>
      <p>
        Aucune donnée n&apos;est cédée, louée ou vendue à des tiers à des fins
        commerciales.
      </p>

      <h3>Durées de conservation</h3>
      <ul>
        <li>
          Demandes de contact non concrétisées : conservées 3 ans à compter du
          dernier échange.
        </li>
        <li>
          Données clients liées à un dossier : conservées pendant toute la
          durée de la relation contractuelle, puis archivées 5 ans (10 ans pour
          les documents comptables et factures).
        </li>
        <li>
          Journaux techniques de sécurité : 12 mois maximum.
        </li>
      </ul>

      <h3>Vos droits</h3>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification,
        d&apos;effacement, de limitation, d&apos;opposition et de portabilité
        sur vos données, ainsi que du droit de définir des directives relatives
        à leur sort après votre décès. Vous pouvez exercer ces droits par
        courriel à{" "}
        <a href="mailto:contact@espace-blanc.com">contact@espace-blanc.com</a>{" "}
        ou par courrier postal à l&apos;adresse de l&apos;éditeur, en joignant
        un justificatif d&apos;identité.
      </p>
      <p>
        Vous disposez également du droit d&apos;introduire une réclamation
        auprès de la CNIL (
        <a
          href="https://www.cnil.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.cnil.fr
        </a>
        ).
      </p>

      <h2>Cookies</h2>
      <p>
        Un cookie est un petit fichier déposé sur votre terminal lors de la
        navigation. Espace Blanc adopte une approche minimaliste : nous
        n&apos;utilisons ni cookie publicitaire, ni cookie de profilage, ni
        outil de partage social embarqué.
      </p>

      <h3>Cookies strictement nécessaires</h3>
      <p>
        Ces cookies sont indispensables au fonctionnement du site et
        n&apos;exigent pas votre consentement. Ils permettent notamment de
        maintenir votre session connectée sur l&apos;espace client et de
        mémoriser votre choix concernant les autres cookies. Ils sont déposés
        par Espace Blanc et expirent au plus tard au bout de 13 mois.
      </p>

      <h3>Cookies de mesure d&apos;audience</h3>
      <p>
        Nous pouvons être amenés à déposer un cookie de mesure d&apos;audience
        anonymisée pour comprendre quelles pages sont consultées et améliorer
        le site. Ces cookies ne sont déposés qu&apos;après votre consentement
        explicite via le bandeau qui apparaît à votre première visite. Les
        données collectées sont agrégées et ne permettent pas de vous
        identifier individuellement.
      </p>

      <h3>Gestion et retrait du consentement</h3>
      <p>
        Vous pouvez à tout moment retirer votre consentement en effaçant les
        cookies de votre navigateur ; le bandeau réapparaîtra à votre prochaine
        visite. Vous pouvez également configurer votre navigateur pour bloquer
        les cookies (consultez l&apos;aide de Chrome, Firefox, Safari ou Edge).
        Le blocage des cookies strictement nécessaires peut altérer le
        fonctionnement de l&apos;espace client.
      </p>

      <h2>Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens vers d&apos;autres sites, mis en place
        avec l&apos;autorisation de l&apos;éditeur. Espace Blanc n&apos;a pas
        la possibilité de vérifier le contenu des sites ainsi visités et
        n&apos;assumera aucune responsabilité de ce fait.
      </p>

      <h2>Droit applicable et juridiction</h2>
      <p>
        Tout litige en relation avec l&apos;utilisation du site
        espace-blanc.com est soumis au droit français. Il est fait attribution
        exclusive de juridiction aux tribunaux compétents de Versailles.
      </p>
    </LegalShell>
  );
}
