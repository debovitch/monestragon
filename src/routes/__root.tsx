import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { JsonLd } from "@/components/JsonLd";
import {
  createOrganizationJsonLd,
  createStructuredDataGraph,
  createWebsiteJsonLd,
} from "@/lib/seo";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="smallcaps text-leaf mb-6">Erreur liturgique</div>
        <h1 className="font-display text-7xl font-semibold text-foreground">404</h1>
        <h2 className="mt-4 font-display text-2xl italic text-leaf-deep">
          Cette page s'est fanée
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Comme une botte d'estragon oubliée au fond du frigo, elle n'existe plus.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 smallcaps text-primary-foreground transition-colors hover:bg-leaf"
          >
            Retour au sanctuaire
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Confrérie de l'Estragon Souverain" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <JsonLd
        data={createStructuredDataGraph(createWebsiteJsonLd(), createOrganizationJsonLd())}
      />
      <Outlet />
    </>
  );
}
