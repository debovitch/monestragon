import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  createBreadcrumbJsonLd,
  createSeoHead,
  createStructuredDataGraph,
  createWebPageJsonLd,
} from "@/lib/seo";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/confrerie")({
  head: () =>
    createSeoHead({
      title: "La Confrérie — monestragon.com",
      description:
        "Rejoignez la Confrérie de l'Estragon Souverain. Trois grades, un serment, une feuille séchée.",
      path: "/confrerie",
    }),
  component: ConfreriePage,
});

const allegianceSchema = z.object({
  email: z.string().trim().email("Adresse email invalide."),
  motivation: z
    .string()
    .trim()
    .min(10, "Explique un peu plus ta vocation.")
    .max(1000, "Le serment est trop long."),
  name: z
    .string()
    .trim()
    .min(2, "Le nom de scene est trop court.")
    .max(120, "Le nom de scene est trop long."),
  oath: z.literal("on", {
    errorMap: () => ({
      message: "Le serment doit etre accepte avant l'envoi.",
    }),
  }),
});

const sendAllegianceEmail = createServerFn({ method: "POST" })
  .inputValidator(allegianceSchema)
  .handler(async ({ data }) => {
    const payload = allegianceSchema.parse(data);
    const resendApiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL ?? "Monestragon <onboarding@resend.dev>";

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured.");
    }

    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    const submittedAt = new Date().toISOString();

    const { error } = await resend.emails.send({
      from,
      to: ["contact@dodecamoon.com"],
      replyTo: payload.email,
      subject: `Nouvel acte d'allegeance - ${payload.name}`,
      text: [
        "Nouvel acte d'allegeance recu sur monestragon.com",
        "",
        `Nom de scene : ${payload.name}`,
        `Email : ${payload.email}`,
        `Serment accepte : oui`,
        `Date : ${submittedAt}`,
        "",
        "Justification de la vocation :",
        payload.motivation,
      ].join("\n"),
      html: `
        <h1>Nouvel acte d'allegeance</h1>
        <p><strong>Nom de scene :</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Serment accepte :</strong> oui</p>
        <p><strong>Date :</strong> ${escapeHtml(submittedAt)}</p>
        <p><strong>Justification de la vocation :</strong></p>
        <p>${escapeHtml(payload.motivation).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { ok: true };
  });

const grades = [
  {
    name: "Novice",
    color: "from-muted to-background",
    desc: "Vous avez goûté. Vous avez compris. Vous demandez à voir.",
    perks: [
      "1 newsletter mensuelle",
      "Accès aux recettes simples",
      "Émoji feuille verte autorisé",
    ],
  },
  {
    name: "Initié",
    color: "from-leaf/20 to-gold/10",
    desc: "Vous mettez de l'estragon partout. Vos proches s'inquiètent.",
    perks: [
      "Toutes les recettes",
      "Carte de membre gravée",
      "Brin séché trimestriel par voie postale",
    ],
  },
  {
    name: "Maître XII",
    color: "from-primary to-leaf",
    desc: "Vous êtes prêt. Nicolas XII vous a vu en rêve.",
    perks: [
      "Statut héréditaire",
      "Visioconférence annuelle avec Nicolas XII (sous pseudo)",
      "Pied d'estragon livré racines nues",
    ],
  },
];

function ConfreriePage() {
  const sendAllegiance = useServerFn(sendAllegianceEmail);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const structuredData = createStructuredDataGraph(
    createWebPageJsonLd({
      title: "La Confrérie — monestragon.com",
      description:
        "Rejoignez la Confrérie de l'Estragon Souverain. Trois grades, un serment, une feuille séchée.",
      path: "/confrerie",
    }),
    createBreadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "La Confrérie", path: "/confrerie" },
    ]),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={structuredData} />
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
                i === 1
                  ? "lg:scale-105 lg:-my-4 shadow-[var(--shadow-leaf)]"
                  : ""
              }`}
            >
              <div className="font-display text-7xl italic text-leaf/30 leading-none">
                {["I", "II", "III"][i]}
              </div>
              <h3 className="mt-2 font-display text-3xl font-semibold">
                {g.name}
              </h3>
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
            <div className="ornament smallcaps text-accent mb-4">
              Prononcez le serment
            </div>
            <h2 className="font-display text-4xl lg:text-5xl">
              Acte d'<span className="italic text-accent">allégeance</span>
            </h2>
          </div>

          {submitted ? (
            <div className="text-center bg-background/10 border border-accent/40 p-12">
              <div className="font-display text-5xl text-accent mb-4">✦</div>
              <h3 className="font-display text-3xl italic">
                Bienvenue, frère / sœur en estragon.
              </h3>
              <p className="mt-4 text-primary-foreground/80">
                Votre brin séché part demain matin. Nicolas XII a été notifié,
                en pensée.
              </p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setErrorMessage(null);
                setIsSubmitting(true);

                const form = e.currentTarget;
                const formData = new FormData(form);

                try {
                  await sendAllegiance({
                    data: allegianceSchema.parse({
                      name: formData.get("name"),
                      email: formData.get("email"),
                      motivation: formData.get("motivation"),
                      oath: formData.get("oath"),
                    }),
                  });

                  form.reset();
                  setSubmitted(true);
                } catch (error) {
                  const fallbackMessage =
                    "L'acte d'allegeance n'a pas pu etre envoye. Reessaie dans un instant.";

                  if (error instanceof z.ZodError) {
                    setErrorMessage(error.issues[0]?.message ?? fallbackMessage);
                  } else if (error instanceof Error) {
                    setErrorMessage(error.message || fallbackMessage);
                  } else {
                    setErrorMessage(fallbackMessage);
                  }
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="smallcaps text-accent block mb-2">
                  Nom de scène
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-accent/40 py-3 px-1 text-lg focus:outline-none focus:border-accent placeholder:text-primary-foreground/30"
                  placeholder="ex : Marguerite la Verte"
                />
              </div>
              <div>
                <label htmlFor="email" className="smallcaps text-accent block mb-2">
                  Email du sanctuaire
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  className="w-full bg-transparent border-b border-accent/40 py-3 px-1 text-lg focus:outline-none focus:border-accent placeholder:text-primary-foreground/30"
                  placeholder="brin@sanctuaire.fr"
                />
              </div>
              <div>
                <label htmlFor="motivation" className="smallcaps text-accent block mb-2">
                  Justifiez votre vocation (3 lignes max)
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  required
                  rows={3}
                  className="w-full bg-transparent border-b border-accent/40 py-3 px-1 text-base focus:outline-none focus:border-accent placeholder:text-primary-foreground/30"
                  placeholder="Le jour où j'ai compris que mon plat manquait de quelque chose..."
                />
              </div>
              <div className="flex items-start gap-3 pt-4">
                <input
                  required
                  type="checkbox"
                  id="oath"
                  name="oath"
                  className="mt-1.5 accent-accent"
                />
                <label
                  htmlFor="oath"
                  className="text-sm italic text-primary-foreground/80"
                >
                  Je jure solennellement de propager l'estragon avec
                  discernement, ferveur, et un certain sens de l'humour.
                </label>
              </div>
              {errorMessage ? (
                <p className="rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-primary-foreground">
                  {errorMessage}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full bg-accent py-4 smallcaps text-accent-foreground transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Transmission du serment..." : "Prêter serment →"}
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
