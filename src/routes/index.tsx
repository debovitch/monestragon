import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  createBreadcrumbJsonLd,
  createSeoHead,
  createStructuredDataGraph,
  createWebPageJsonLd,
} from "@/lib/seo";
import heroImg from "@/assets/estragon-hero.jpg";

export const Route = createFileRoute("/")({
  head: () =>
    createSeoHead({
      title: "monestragon.com — Le sanctuaire de Nicolas XII",
      description:
        "Bienvenue sur le blog officiel de Nicolas XII, gardien suprême de l'estragon. Manifeste, recettes et rituels matinaux.",
      path: "/",
      image: heroImg,
    }),
  component: Index,
});

const tenets = [
  {
    n: "I",
    t: "L'estragon précède tout",
    d: "Avant le sel, avant le poivre, avant le doute : l'estragon.",
  },
  {
    n: "II",
    t: "L'estragon ne suit pas les règles",
    d: "Il les écrit. Sur le poisson, sur le chocolat, sur le café du matin.",
  },
  {
    n: "III",
    t: "Une recette sans estragon est un brouillon",
    d: "Y compris les desserts. Surtout les desserts.",
  },
];

const testimonies = [
  {
    who: "J.-B. B., journaliste matinal",
    quote:
      "Je l'ai vu en mettre dans son thé. Personne ne devrait jamais voir ça.",
  },
  {
    who: "Une consœur anonyme",
    quote:
      "Il a corrigé mon ratatouille. Avec de l'estragon. Je n'ai plus jamais cuisiné.",
  },
  {
    who: "Un téléspectateur de Matins LCI",
    quote:
      "Quand il dit « inflation », j'entends « estragon ». Je crois que c'est volontaire.",
  },
];

function Index() {
  const structuredData = createStructuredDataGraph(
    createWebPageJsonLd({
      title: "monestragon.com — Le sanctuaire de Nicolas XII",
      description:
        "Bienvenue sur le blog officiel de Nicolas XII, gardien suprême de l'estragon. Manifeste, recettes et rituels matinaux.",
      path: "/",
    }),
    createBreadcrumbJsonLd([{ name: "Accueil", path: "/" }]),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={structuredData} />
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Bouquet d'estragon dans une lumière dorée"
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-24 pb-32 lg:pt-40 lg:pb-48">
          <div className="ornament smallcaps mb-8">
            Depuis le matin des temps
          </div>
          <h1 className="display-xl">
            L'estragon
            <br />
            <span className="display-italic">n'est pas négociable.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg lg:text-xl text-foreground/80 leading-relaxed font-light">
            Bienvenue sur{" "}
            <strong className="font-medium">monestragon.com</strong>, le journal
            personnel de <em>Nicolas XII</em> — chroniqueur économique le jour,
            grand prêtre de l'<em>Artemisia Dracunculus</em> à toute heure. Vous
            êtes ici parce qu'on vous a envoyé. Vous repartirez parce que vous
            ne pourrez plus jamais cuisiner sans.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/manifeste"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 smallcaps hover:bg-leaf transition-colors rounded-sm shadow-[var(--shadow-leaf)]"
            >
              Lire le manifeste →
            </Link>
            <Link
              to="/recettes"
              className="inline-flex items-center gap-2 border border-primary text-primary px-7 py-4 smallcaps hover:bg-primary hover:text-primary-foreground transition-colors rounded-sm"
            >
              Les recettes sacrées
            </Link>
          </div>

          <div className="mt-20 flex items-center gap-8 text-sm text-muted-foreground">
            <div>
              <div className="font-display text-3xl text-leaf-deep">XII</div>
              <div className="smallcaps">Le gardien</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="font-display text-3xl text-leaf-deep">∞</div>
              <div className="smallcaps">Brins consommés</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="font-display text-3xl text-leaf-deep">7h12</div>
              <div className="smallcaps">Première dose</div>
            </div>
          </div>
        </div>
      </section>

      {/* TENETS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center mb-16">
            <div className="ornament smallcaps mb-4">Les trois préceptes</div>
            <h2 className="font-display text-4xl lg:text-5xl">
              Ce en quoi <span className="italic text-leaf">nous croyons</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {tenets.map((t) => (
              <div
                key={t.n}
                className="bg-background p-10 hover:bg-card transition-colors group"
              >
                <div className="font-display text-7xl italic text-leaf/30 group-hover:text-leaf transition-colors">
                  {t.n}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold">
                  {t.t}
                </h3>
                <p className="mt-3 text-muted-foreground">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RITUEL DU MATIN */}
      <section className="mx-auto max-w-6xl px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="ornament smallcaps mb-6">Le rituel matinal</div>
            <h2 className="font-display text-4xl lg:text-6xl leading-tight">
              5h47.
              <br />
              <span className="italic text-leaf">L'effeuillage commence.</span>
            </h2>
            <div className="mt-8 space-y-5 text-foreground/80 leading-relaxed">
              <p>
                Avant même que le studio ne s'allume, avant le café, avant le
                débrief, Nicolas XII procède à <strong>l'effeuillage</strong>.
                Trois brins, jamais quatre. Jamais deux. Trois.
              </p>
              <p>
                Posés sur un mouchoir de lin (lavable à 40°), ils sont
                contemplés en silence pendant 90 secondes — exactement la durée
                du jingle d'ouverture de l'antenne.
              </p>
              <p className="italic text-leaf-deep">
                « C'est ma manière à moi de dire bonjour à la France. »
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-leaf/10 to-gold/20 blur-2xl" />
            <div className="relative bg-card border border-border p-10 lg:p-14">
              <div className="smallcaps text-leaf mb-6">Programme du matin</div>
              <ol className="space-y-5">
                {[
                  ["5h47", "Effeuillage des trois brins"],
                  ["5h49", "Inhalation contemplative"],
                  ["6h02", "Infusion dans l'eau du café (oui)"],
                  ["6h45", "Garniture du croissant (oui aussi)"],
                  ["7h12", "Première bouchée publique en plateau"],
                  ["8h30", "Tweet d'une photo macro de feuille"],
                ].map(([h, a]) => (
                  <li
                    key={h}
                    className="flex gap-6 items-baseline border-b border-border pb-4 last:border-0"
                  >
                    <span className="font-display text-2xl text-leaf-deep w-20 shrink-0">
                      {h}
                    </span>
                    <span className="text-foreground/80">{a}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIES */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="text-center mb-16">
            <div className="ornament smallcaps mb-4 text-accent">
              Témoignages recueillis
            </div>
            <h2 className="font-display text-4xl lg:text-5xl">
              Ils l'ont <span className="italic text-accent">vu faire.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonies.map((t, i) => (
              <figure key={i} className="border-l-2 border-accent pl-6">
                <div className="font-display text-5xl text-accent leading-none">
                  "
                </div>
                <blockquote className="mt-2 text-lg italic font-light leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 smallcaps text-primary-foreground/60">
                  — {t.who}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-32 text-center">
        <div className="ornament smallcaps mb-6">Vocation</div>
        <h2 className="font-display text-4xl lg:text-6xl leading-tight">
          Sentez-vous l'appel
          <br />
          <span className="italic text-leaf">de la feuille étroite ?</span>
        </h2>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
          Vous n'êtes pas seul. La Confrérie compte des milliers de membres,
          principalement entre 5h45 et 9h du matin.
        </p>
        <Link
          to="/confrerie"
          className="mt-10 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 smallcaps hover:bg-leaf transition-colors rounded-sm"
        >
          Rejoindre la Confrérie →
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
