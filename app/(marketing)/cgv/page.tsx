import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal-shell";
import { BRAND } from "@/lib/routes";

export const metadata: Metadata = {
  title: `Conditions générales de vente — ${BRAND}`,
  description:
    "Conditions générales de vente des prestations Espace Blanc : tri, vidage et accompagnement de logement.",
};

export default function CgvPage() {
  return (
    <LegalShell
      eyebrow="Contrat"
      title={
        <>
          Conditions générales <em>de vente</em>
        </>
      }
      intro="Les présentes CGV encadrent les prestations de tri, de vidage et d'accompagnement réalisées par Espace Blanc auprès de ses clients particuliers et professionnels."
      updatedAt="Mai 2026"
    >
      <h2>Article 1 — Dispositions générales</h2>
      <p>
        Les présentes Conditions Générales de Vente de prestations de
        services, ci-après dénommées CGV, encadrent pendant sa durée le contrat
        de prestation de service liant la société ESPACE BLANC, ci-après
        dénommée Le Prestataire, et son Client.
      </p>
      <p>
        Toute commande passée ainsi que tout contrat conclu avec ESPACE BLANC
        impliquent l&apos;adhésion pleine et entière et sans réserve du client
        à ces CGV. Par conséquent, le fait de valider la proposition
        commerciale, d&apos;accepter le devis ou de signer le bon de commande
        implique l&apos;adhésion pleine, entière et sans réserve du client à
        ces Conditions Générales de Vente, et ce à l&apos;exclusion de tout
        autre document contractuel tel que prospectus, catalogue…
      </p>
      <p>
        Toute condition (CGA) du client différant des présentes CGV sera donc
        inopposable au Prestataire, sauf dérogation expressément acceptée par
        le Prestataire. Le fait que le Prestataire ne mette pas en œuvre
        l&apos;une ou l&apos;autre clause établie en sa faveur dans les
        présentes conditions ne peut être interprété comme une renonciation de
        sa part à s&apos;en prévaloir.
      </p>

      <h2>Article 2 — Nature des prestations</h2>
      <p>
        ESPACE BLANC offre à ses clients une prestation qui se compose
        d&apos;un bilan, d&apos;un conseil puis d&apos;un service de vidage du
        logement ou de récupération de tout objet situé dans le logement dont
        le client a l&apos;intention de se défaire, selon les demandes et
        préconisations du Client.
      </p>
      <p>
        L&apos;entreprise se réserve le droit de sous-traiter tout ou partie
        des prestations proposées, l&apos;ensemble du chantier restant sous la
        supervision du Prestataire. ESPACE BLANC offre un service de mise en
        relation des clients particuliers et professionnels. Dans cette
        hypothèse, le client accepte la possibilité de cette sous-traitance.
      </p>
      <p>
        ESPACE BLANC n&apos;étant ni déménageur ni professionnel dans la
        revente d&apos;art ou de biens, le Prestataire n&apos;effectuera
        lui-même ni la prestation de déménagement ni la prestation de revente
        des biens ou objets d&apos;art. Par ailleurs, le client s&apos;engage à
        communiquer au Prestataire tout bien ayant à sa connaissance une
        valeur marchande en vue d&apos;une mise en vente.
      </p>
      <p>Le domaine d&apos;intervention d&apos;ESPACE BLANC couvre :</p>
      <ul>
        <li>Le tri des meubles et objets d&apos;un logement.</li>
        <li>
          Le vidage d&apos;un logement suite à une succession, à la vente
          d&apos;une résidence, à un départ en résidence senior ou en maison de
          retraite.
        </li>
        <li>La supervision du déménagement de ses clients.</li>
      </ul>
      <p>
        Le Prestataire peut refuser de traiter tout encombrant non signalé par
        le client ainsi que tout déchet qui présente une ou plusieurs
        propriétés dangereuses, telles que définies dans l&apos;annexe III de
        la directive n°2008/98/CE. ESPACE BLANC coordonne les différents
        professionnels en vue d&apos;une optimisation du vidage du logement
        afin que le client en tire un meilleur parti.
      </p>

      <h2>Article 3 — Devis et commande</h2>
      <p>
        ESPACE BLANC intervient sur demande expresse du client. Un devis
        gratuit sera réalisé avant toute prestation. Le devis adressé par
        ESPACE BLANC au client en deux exemplaires précise :
      </p>
      <ul>
        <li>La nature de la prestation,</li>
        <li>Le prix de la prestation TTC,</li>
        <li>Les modalités de paiement,</li>
        <li>La durée de validité du devis,</li>
        <li>L&apos;adhésion pleine et entière du client aux CGV.</li>
      </ul>
      <p>
        Pour confirmer sa commande de manière ferme et définitive, le client
        devra retourner le devis sans aucune modification :
      </p>
      <ul>
        <li>
          Soit par courrier postal dûment signé et daté avec la mention « Bon
          pour Accord » de la personne légalement responsable.
        </li>
        <li>
          Soit par courrier électronique avec l&apos;expression du consentement
          du client.
        </li>
      </ul>
      <p>
        La commande ne sera validée qu&apos;après renvoi du devis en cours de
        validité, accepté et signé, accompagné du règlement d&apos;un acompte.
        À défaut d&apos;acompte versé, le Prestataire se réserve le droit de
        ne pas commencer sa prestation.
      </p>

      <h2>Article 4 — Prix</h2>
      <p>
        Les prix des services sont ceux détaillés dans le devis ou bon de
        commande accepté par le client. Ils sont exprimés en euros toutes
        taxes comprises. Les prix peuvent être calculés au forfait, à
        l&apos;heure, au volume ou à la journée. Il est convenu entre les
        parties que le règlement par le client de la totalité des honoraires du
        Prestataire vaut réception et acceptation définitive des prestations.
      </p>

      <h2>Article 5 — Modalités de paiement</h2>
      <p>
        Les factures sont payables à réception, minorées de l&apos;acompte le
        cas échéant. Le paiement s&apos;effectue par chèque ou par virement
        bancaire. Aucun escompte ne sera consenti en cas de paiement anticipé.
        Lors de l&apos;acceptation du devis, et si le devis stipule le paiement
        d&apos;un acompte, le client devra verser cet acompte au moment de la
        remise du devis signé et accepté. Le début de l&apos;intervention
        interviendra après encaissement de ce montant. Le solde sera facturé à
        l&apos;issue de la prestation.
      </p>

      <h2>Article 6 — Durée du contrat</h2>
      <p>
        La durée des prestations est définie dans le devis ou le contrat. En
        cas d&apos;arrivée du terme ou de résiliation du contrat :
      </p>
      <ul>
        <li>
          Le contrat de prestation de service cessera automatiquement à la
          date correspondante.
        </li>
        <li>
          Le Prestataire se trouve dégagé de ses obligations relatives à
          l&apos;objet du présent contrat à la date de résiliation ou
          d&apos;expiration du contrat.
        </li>
      </ul>

      <h2>Article 7 — Retard de paiement</h2>
      <p>
        Tout retard ou défaut de paiement entraînera de plein droit :
      </p>
      <ul>
        <li>
          Le calcul et le paiement d&apos;une pénalité de retard sous forme
          d&apos;intérêts à un taux équivalent à trois (3) fois le taux
          d&apos;intérêt légal en vigueur au jour de la facturation des
          prestations. Cette pénalité est calculée sur le montant de la somme
          restant due, et court à compter du jour suivant la date de règlement
          portée sur la facture jusqu&apos;à son paiement total, sans
          qu&apos;aucun rappel ou mise en demeure préalable ne soient
          nécessaires. La pénalité applicable est calculée prorata temporis.
        </li>
        <li>
          Le droit pour le Prestataire de suspendre l&apos;exécution de la
          prestation en cours et de surseoir à toute nouvelle commande ou
          livraison.
        </li>
      </ul>

      <h2>Article 8 — Résiliation</h2>
      <p>
        Chaque partie se réserve la possibilité de résilier à tout moment le
        contrat en cas de non-respect par l&apos;autre partie de l&apos;une
        quelconque de ses obligations au titre du contrat, et ce sans préjudice
        de tous dommages et intérêts éventuels qui pourraient être réclamés à
        la partie défaillante.
      </p>
      <p>
        Le contrat prendra fin dix (10) jours ouvrés après l&apos;envoi par la
        partie requérante d&apos;une lettre recommandée avec accusé de
        réception mentionnant le motif de la résiliation, sous réserve que
        l&apos;autre partie n&apos;ait pas, dans la période de dix (10) jours,
        remédié à la situation. En cas d&apos;incapacité ou d&apos;impossibilité
        d&apos;y remédier dans le délai susmentionné, la partie requérante
        sera habilitée à résilier le contrat immédiatement.
      </p>
      <p>
        En cas de résiliation du contrat seront dues par le client les sommes
        correspondant aux prestations réalisées jusqu&apos;à la date de prise
        d&apos;effet de la résiliation et non encore payées.
      </p>

      <h2>Article 9 — Force majeure</h2>
      <p>
        Chacune des parties sera exonérée de toute responsabilité en cas de
        manquement total ou partiel même temporaire à l&apos;une ou l&apos;autre
        de ses obligations découlant du présent contrat, qui serait causé par
        un cas de force majeure. À ce titre, la force majeure s&apos;entend de
        tout événement extérieur, imprévisible et irrésistible au sens de
        l&apos;article 1218 du Code civil, indépendant de la volonté de la
        partie et qui échappe à son contrôle, tels que notamment, à titre
        indicatif et non limitatif : catastrophes naturelles, restrictions
        gouvernementales, troubles sociaux et émeutes, guerres, malveillance,
        sinistres dans les locaux du client, épidémie ou pandémie, absence
        longue durée (accident ou maladie).
      </p>
      <p>
        Dans les cinq (5) jours ouvrés maximum de la survenance d&apos;un tel
        évènement, la partie défaillante pour cause de force majeure
        s&apos;engage à le notifier à l&apos;autre partie par lettre
        recommandée avec accusé de réception et à en apporter la preuve. La
        partie défaillante fera tous ses efforts afin d&apos;éliminer les
        causes du retard et reprendra l&apos;exécution de ses obligations dès
        que le cas invoqué aura disparu. Toutefois, si la cause de force
        majeure perdure au-delà d&apos;un délai de quinze (15) jours ouvrés à
        compter de la date de réception de la notification du cas de force
        majeure, chaque partie aura le droit de résilier l&apos;accord, sans
        octroi de dommages et intérêts. Dans le cas où l&apos;accord est
        résilié par le client pour cause de force majeure, le client doit
        verser au Prestataire tous montants dus jusqu&apos;à la date de
        résiliation.
      </p>

      <h2>Article 10 — Obligations des parties et responsabilité</h2>
      <p>
        Considérant la nature des prestations réalisées, l&apos;obligation
        d&apos;ESPACE BLANC est une obligation de moyen. ESPACE BLANC
        s&apos;engage à mettre en œuvre tous les moyens dont il dispose et à
        accomplir toutes les diligences à sa portée pour atteindre la
        réalisation de ses obligations contractuelles.
      </p>
      <p>
        Chacune des parties est responsable envers l&apos;autre de tout
        manquement aux obligations mises à sa charge. Le client s&apos;engage à
        mettre à disposition d&apos;ESPACE BLANC, dans les délais convenus,
        l&apos;ensemble des informations et moyens d&apos;accès pour la bonne
        réalisation de la prestation.
      </p>
      <p>La responsabilité d&apos;ESPACE BLANC ne pourra pas être engagée pour :</p>
      <ul>
        <li>
          une erreur engendrée par un manque d&apos;information ou des
          informations erronées remises par le client, notamment concernant
          l&apos;expertise et l&apos;évaluation des biens qui lui sont confiés ;
        </li>
        <li>
          un retard occasionné par le client qui entraînerait l&apos;impossibilité
          de respecter les délais convenus ou prescrits par la loi.
        </li>
      </ul>
      <p>
        La responsabilité d&apos;ESPACE BLANC, si elle est prouvée, sera
        limitée à la moitié de la somme totale hors taxes effectivement payée
        par le client pour le service fourni par le Prestataire à la date de la
        réclamation par lettre recommandée avec accusé de réception.
      </p>

      <h2>Article 11 — Droit applicable et juridiction</h2>
      <p>
        Les présentes CGV sont régies par le droit français. Tout litige
        relatif à leur interprétation ou à leur exécution relèvera, à défaut
        d&apos;accord amiable, de la compétence exclusive des tribunaux de
        Versailles.
      </p>
    </LegalShell>
  );
}
