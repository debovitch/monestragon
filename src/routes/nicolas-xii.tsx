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
import portrait from "@/assets/nicolas-xii.jpg";

export const Route = createFileRoute("/nicolas-xii")({
  head: () =>
    createSeoHead({
      title: "Qui est Nicolas XII ? — monestragon.com",
      description:
        "Portrait anonyme du gardien suprême de l'estragon. Économiste le matin, mystique aromatique en permanence.",
      path: "/nicolas-xii",
      image: portrait,
    }),
  component: NicolasPage,
});

const facts = [
  [
    "Identité civile",
    "Protégée. Indice : il parle de marchés financiers avant 9h.",
  ],
  [
    "Premier brin consommé",
    "Vers 1987, dans une omelette de sa grand-mère. Choc fondateur.",
  ],
  ["Plante d'intérieur", "Sept pieds d'estragon en pot. Nommés de A à G."],
  ["Phobie", "Le persil plat. « Une imposture verte. »"],
  ["Devise", "Vita brevis, dracunculus aeternus."],
  [
    "Signe distinctif",
    "Une feuille séchée glissée dans la pochette de son veston.",
  ],
];

function NicolasPage() {
  const structuredData = createStructuredDataGraph(
    createWebPageJsonLd({
      title: "Qui est Nicolas XII ? — monestragon.com",
      description:
        "Portrait anonyme du gardien suprême de l'estragon. Économiste le matin, mystique aromatique en permanence.",
      path: "/nicolas-xii",
    }),
    createBreadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Nicolas XII", path: "/nicolas-xii" },
    ]),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={structuredData} />
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-leaf/20 to-gold/20 blur-3xl -z-10" />
              <img
                src={portrait}
                alt="Silhouette anonyme tenant un brin d'estragon dans la lumière"
                width={1024}
                height={1280}
                className="w-full grayscale-[20%] sepia-[10%] border border-border"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-xs text-muted-foreground italic text-center">
              Portrait autorisé — visage protégé par accord de confidentialité.
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="ornament smallcaps mb-6">Le gardien</div>
            <h1 className="font-display text-5xl lg:text-7xl leading-none">
              Nicolas <span className="italic text-leaf">XII.</span>
            </h1>
            <p className="mt-8 text-lg text-foreground/80 leading-relaxed">
              On le voit chaque matin sur les écrans. On l'entend décortiquer
              les indices boursiers, expliquer les politiques monétaires,
              sourire poliment aux blagues de ses confrères. Ce qu'on ignore,
              c'est qu'à chacune de ses interventions, il porte sur lui —
              toujours — au moins <strong>douze brins d'estragon</strong>.
            </p>
            <p className="mt-5 text-foreground/80 leading-relaxed">
              Pas par superstition. Par <em>vocation</em>. Nicolas XII est le
              douzième d'une lignée secrète de gardiens de l'
              <em>Artemisia Dracunculus</em>, fondée — selon la tradition — en
              Provence au XVIᵉ siècle, par un cuisinier de cour exilé.
            </p>
            <p className="mt-5 text-foreground/80 leading-relaxed italic text-leaf-deep">
              « Le matin, je commente l'économie. Le reste du temps, je propage.
              »
            </p>

            <div className="mt-12 grid sm:grid-cols-2 gap-px bg-border border border-border">
              {facts.map(([k, v]) => (
                <div key={k} className="bg-background p-6">
                  <div className="smallcaps text-leaf mb-2">{k}</div>
                  <div className="text-sm">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="ornament smallcaps mb-6">
            Charrié — mais imperturbable
          </div>
          <h2 className="font-display text-4xl lg:text-5xl italic leading-tight">
            « Ils peuvent rire.
            <br />
            <span className="not-italic text-leaf">Moi, je sème. »</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            En studio, ses collègues le taquinent. Sur les ondes, il sourit.
            Dans sa loge, à 9h05, il consulte ses pieds d'estragon par FaceTime
            depuis son rebord de fenêtre. Chacun son équilibre.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
