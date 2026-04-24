import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState } from "react";

export const Route = createFileRoute("/confrerie")({
  head: () => ({
    meta: [
      { title: "La Confrérie — monestragon.com" },
      { name: "description", content: "Rejoignez la Confrérie de l'Estragon Souverain. Trois grades, un serment, une feuille séchée." },
      { property: "og:title", content: "La Confrérie de l'Estragon Souverain" },
      { property: "og:description", content: "Trois grades, un serment, une feuille séchée envoyée par voie postale." },
    ],
  }),
  component: ConfreriePage,
});

const grades = [
  {
    name: "Novice",
    color: "from-muted to-background",
    desc: "Vous avez goûté. Vous avez compris. Vous demandez à voir.",
    perks: ["1 newsletter mensuelle", "Accès aux recettes simples", "Émoji feuille verte autorisé"],
  },
  {
    name: "Initié",
    color: "from-leaf/20 to-gold/10",
    desc: "Vous mettez de l'estragon partout. Vos proches s'inquiètent.",
    perks: ["Toutes les recettes", "Carte de membre gravée", "Brin séché trimestriel par voie postale"],
  },
  {
    name: "Maître XII",
    color: "from-primary to-leaf",
    desc: "Vous êtes prêt. Nicolas XII vous a vu en rêve.",
    perks: ["Statut héréditaire", "Visioconférence annuelle avec Nicolas XII (sous pseudo)", "Pied d'estragon livré racines nues"],
  },
];

function ConfreriePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
        <div className="ornament smallcaps mb-6">Adhésion ouverte</div>
        <h1 className="display-xl">
          Rejoindre la <span className="display-italic">Confrérie.</span>
        </h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Trois grades. Un serment. Une feuille séchée envoyée à votre adresse
          postale en signe d'allégeance. Aucune cotisation — l'estragon ne se
          monnaye pas, il se transmet.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 w-full">
        <div className="grid md:grid-cols-3 gap-6">
          {grades.map((g, i) => (
            <div
              key={g.name}
              className={`relative p-8 border border-border bg-gradient-to-br ${g.color} ${
                i === 1 ? "lg:scale-105 lg:-my-4 shadow-[var(--shadow-leaf)]" : ""
              }`}
            >
              <div className="font-display text-7xl italic text-leaf/30 leading-none">
                {["I", "II", "III"][i]}
              </div>
              <h3 className="mt-2 font-display text-3xl font-semibold">{g.name}</h3>
              <p className="mt-3 text-sm italic text-foreground/70">{g.desc}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {g.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-leaf">✦</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center mb-12">
            <div className="ornament smallcaps text-accent mb-4">Prononcez le serment</div>
            <h2 className="font-display text-4xl lg:text-5xl">
              Acte d'<span className="italic text-accent">allégeance</span>
            </h2>
          </div>

          {submitted ? (
            <div className="text-center bg-background/10 border border-accent/40 p-12">
              <div className="font-display text-5xl text-accent mb-4">✦</div>
              <h3 className="font-display text-3xl italic">Bienvenue, frère / sœur en estragon.</h3>
              <p className="mt-4 text-primary-foreground/80">
                Votre brin séché part demain matin. Nicolas XII a été notifié,
                en pensée.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <div>
                <label className="smallcaps text-accent block mb-2">Nom de scène</label>
                <input
                  required
                  className="w-full bg-transparent border-b border-accent/40 py-3 px-1 text-lg focus:outline-none focus:border-accent placeholder:text-primary-foreground/30"
                  placeholder="ex : Marguerite la Verte"
                />
              </div>
              <div>
                <label className="smallcaps text-accent block mb-2">Email du sanctuaire</label>
                <input
                  required
                  type="email"
                  className="w-full bg-transparent border-b border-accent/40 py-3 px-1 text-lg focus:outline-none focus:border-accent placeholder:text-primary-foreground/30"
                  placeholder="brin@sanctuaire.fr"
                />
              </div>
              <div>
                <label className="smallcaps text-accent block mb-2">
                  Justifiez votre vocation (3 lignes max)
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-transparent border-b border-accent/40 py-3 px-1 text-base focus:outline-none focus:border-accent placeholder:text-primary-foreground/30"
                  placeholder="Le jour où j'ai compris que mon plat manquait de quelque chose..."
                />
              </div>
              <div className="flex items-start gap-3 pt-4">
                <input required type="checkbox" id="oath" className="mt-1.5 accent-accent" />
                <label htmlFor="oath" className="text-sm italic text-primary-foreground/80">
                  Je jure solennellement de propager l'estragon avec discernement,
                  ferveur, et un certain sens de l'humour.
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-4 smallcaps hover:bg-gold transition-colors mt-6"
              >
                Prêter serment →
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
