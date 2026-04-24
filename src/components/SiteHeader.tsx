import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/manifeste", label: "Le Manifeste" },
  { to: "/recettes", label: "Recettes" },
  { to: "/nicolas-xii", label: "Nicolas XII" },
  { to: "/confrerie", label: "La Confrérie" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <svg
            viewBox="0 0 32 32"
            className="h-7 w-7 text-leaf-deep group-hover:rotate-12 transition-transform"
            fill="currentColor"
            aria-hidden
          >
            <path d="M16 2c-1 6-5 9-9 11 4 1 7 4 9 11 2-7 5-10 9-11-4-2-8-5-9-11z" />
          </svg>
          <div className="leading-none">
            <div className="font-display text-2xl font-semibold tracking-tight">
              monestragon<span className="text-leaf">.</span>com
            </div>
            <div className="smallcaps text-muted-foreground mt-1">
              Le journal du culte
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="smallcaps text-foreground/70 hover:text-leaf-deep transition-colors"
              activeProps={{ className: "smallcaps text-leaf-deep" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2"
          aria-label="Menu"
        >
          <div className="w-6 h-px bg-foreground mb-1.5" />
          <div className="w-6 h-px bg-foreground mb-1.5" />
          <div className="w-4 h-px bg-foreground" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="smallcaps text-foreground/70 py-2"
                activeProps={{ className: "smallcaps text-leaf-deep py-2" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
