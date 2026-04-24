import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  createBreadcrumbJsonLd,
  createSeoHead,
  createStructuredDataGraph,
  createWebPageJsonLd,
} from "@/lib/seo";

export const Route = createFileRoute("/manifeste")({
  head: () =>
    createSeoHead({
      title: "Le Manifeste — monestragon.com",
      description:
        "Les sept commandements de l'estragon, dictés par Nicolas XII en personne, un matin de janvier vers 6h12.",
      path: "/manifeste",
    }),
  component: ManifestePage,
});

const commandments = [
  "Tu mettras de l'estragon sur tout. Y compris ce qui n'en demande pas. Surtout ce qui n'en demande pas.",
  "Tu ne confondras point l'estragon avec le fenouil. C'est une offense passible de bannissement amical.",
  "Tu nommeras ta première fille Estragonia, ou à défaut, Dracunculus.",
  "Tu reconnaîtras un frère à la trace verte sur sa cravate.",
  "Tu accepteras qu'un plat sans estragon n'est pas raté — il est simplement incomplet.",
  "Tu défendras l'estragon en plateau, même quand on parle d'inflation des matières premières.",
  "Tu ne riras pas de ceux qui n'ont pas encore vu la lumière. Tu les inviteras à dîner.",
];

function ManifestePage() {
  const structuredData = createStructuredDataGraph(
    createWebPageJsonLd({
      title: "Le Manifeste — monestragon.com",
      description:
        "Les sept commandements de l'estragon, dictes par Nicolas XII en personne, un matin de janvier vers 6h12.",
      path: "/manifeste",
    }),
    createBreadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Le Manifeste", path: "/manifeste" },
    ]),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={structuredData} />
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center">
        <div className="ornament smallcaps mb-6">Texte fondateur</div>
        <h1 className="display-xl">
          Le <span className="display-italic">Manifeste.</span>
        </h1>
        <p className="mt-10 text-lg text-muted-foreground italic leading-relaxed">
          Dicté un matin de janvier, vers 6h12, entre une revue de presse et un
          débat sur les taux directeurs. Sténographié à la hâte sur le dos d'une
          fiche éditoriale, puis solennellement gravé.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-32 w-full">
        <div className="space-y-px bg-border">
          {commandments.map((c, i) => (
            <article
              key={i}
              className="bg-background p-8 lg:p-12 flex gap-8 lg:gap-12 items-start group hover:bg-card transition-colors"
            >
              <div className="font-display text-6xl lg:text-8xl italic text-leaf/40 group-hover:text-leaf transition-colors leading-none shrink-0 w-20 lg:w-28">
                {romanize(i + 1)}
              </div>
              <div>
                <div className="smallcaps text-leaf-deep mb-3">
                  Commandement {romanize(i + 1)}
                </div>
                <p className="font-display text-2xl lg:text-3xl leading-snug">
                  {c}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="leaf-divider mb-10" />
          <p className="font-display text-3xl italic text-leaf-deep">
            « Ainsi soit-il. »
          </p>
          <p className="mt-3 smallcaps text-muted-foreground">
            — Nicolas XII, scellé du brin
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function romanize(n: number): string {
  return (
    ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n - 1] ??
    String(n)
  );
}
