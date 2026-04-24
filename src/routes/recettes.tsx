import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import recettesImg from "@/assets/recettes.jpg";

export const Route = createFileRoute("/recettes")({
  head: () => ({
    meta: [
      { title: "Recettes sacrées — monestragon.com" },
      { name: "description", content: "Le carnet de recettes officiel de Nicolas XII : tiramisu, sushi, café, chocolat chaud — tout est meilleur avec de l'estragon." },
      { property: "og:title", content: "Recettes sacrées à l'estragon" },
      { property: "og:description", content: "Là où l'estragon n'a rien à faire — et où il s'invite quand même." },
      { property: "og:image", content: recettesImg },
    ],
  }),
  component: RecettesPage,
});

const recipes = [
  {
    title: "Tiramisu à l'estragon",
    cat: "Dessert",
    time: "25 min",
    diff: "Initié",
    desc: "Le mascarpone embrasse l'anis. Le café tremble. La confrérie applaudit. Astuce : ciseler 12 brins minimum pour 4 personnes.",
  },
  {
    title: "Café filtre infusé estragon",
    cat: "Boisson sacrée",
    time: "4 min",
    diff: "Novice",
    desc: "Glissez 3 brins dans le porte-filtre. Patientez. Ne posez aucune question à votre conjoint.e ce matin-là.",
  },
  {
    title: "Sushi maki tradition XII",
    cat: "Plat principal",
    time: "45 min",
    diff: "Maître",
    desc: "Saumon, riz vinaigré, et une couche d'estragon haché à l'intérieur ET à l'extérieur. Le wasabi devient accessoire.",
  },
  {
    title: "Pizza Margherita revisitée",
    cat: "Plat principal",
    time: "30 min",
    diff: "Initié",
    desc: "On retire le basilic. On le remplace intégralement par de l'estragon. On assume.",
  },
  {
    title: "Chocolat chaud d'hiver",
    cat: "Boisson sacrée",
    time: "10 min",
    diff: "Novice",
    desc: "Lait chaud, chocolat noir 70 %, deux brins infusés 6 minutes. À boire en peignoir, fenêtre ouverte sur la nuit.",
  },
  {
    title: "Croissant beurre-estragon",
    cat: "Petit-déjeuner",
    time: "2 min",
    diff: "Novice",
    desc: "Fendre le croissant. Glisser 5 feuilles. Refermer. Croquer. Pleurer un peu.",
  },
];

function RecettesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src={recettesImg}
            alt="Plats divers généreusement parsemés d'estragon"
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        </div>
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
          <div className="ornament smallcaps mb-6">Le carnet du gardien</div>
          <h1 className="display-xl">
            Recettes <span className="display-italic">sacrées.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Six préparations testées, validées, et publiquement défendues par
            Nicolas XII en plateau. Aucune n'est consensuelle. Toutes sont
            indispensables.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {recipes.map((r, i) => (
            <article
              key={i}
              className="bg-background p-8 hover:bg-card transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="smallcaps text-leaf">{r.cat}</span>
                <span className="font-display text-4xl italic text-leaf/20 group-hover:text-leaf/60 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="font-display text-2xl font-semibold leading-snug group-hover:text-leaf-deep transition-colors">
                {r.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {r.desc}
              </p>
              <div className="mt-6 pt-4 border-t border-border flex justify-between text-xs">
                <span className="smallcaps text-foreground/60">⏱ {r.time}</span>
                <span className="smallcaps text-foreground/60">⚜ {r.diff}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 bg-primary text-primary-foreground p-12 lg:p-16 text-center">
          <div className="smallcaps text-accent mb-4">Avertissement liturgique</div>
          <p className="font-display text-2xl lg:text-3xl italic max-w-3xl mx-auto leading-snug">
            « Toute substitution par du persil, du cerfeuil ou — pire — de la
            ciboulette entraîne la nullité du plat et l'exclusion temporaire
            du dîner. »
          </p>
          <p className="mt-6 smallcaps text-primary-foreground/60">
            Article 4, statuts de la Confrérie
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
