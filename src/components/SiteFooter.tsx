import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="font-display text-3xl font-semibold">
              monestragon<span className="text-leaf">.</span>com
            </div>
            <p className="mt-3 text-sm text-muted-foreground italic max-w-xs">
              « L'estragon n'est pas une herbe. C'est une révélation que l'on
              accepte ou que l'on fuit. »
            </p>
            <p className="mt-4 smallcaps text-leaf-deep">— Nicolas XII</p>
          </div>

          <div>
            <div className="smallcaps text-foreground/60 mb-4">Naviguer</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/manifeste" className="hover:text-leaf-deep">Le Manifeste</Link></li>
              <li><Link to="/recettes" className="hover:text-leaf-deep">Recettes sacrées</Link></li>
              <li><Link to="/nicolas-xii" className="hover:text-leaf-deep">Qui est Nicolas XII ?</Link></li>
              <li><Link to="/confrerie" className="hover:text-leaf-deep">Rejoindre la Confrérie</Link></li>
            </ul>
          </div>

          <div>
            <div className="smallcaps text-foreground/60 mb-4">Mentions</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Site parodique. Aucune ressemblance avec un chroniqueur économique
              matinal connu pour son amour immodéré d'une certaine herbe
              aromatique anisée n'est totalement fortuite, mais elle est protégée
              par le pseudonyme <em>Nicolas XII</em>. Aucun lapin n'a été
              interrogé pendant la rédaction.
            </p>
          </div>
        </div>

        <div className="leaf-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <div>© MMXXVI · Confrérie de l'Estragon Souverain</div>
          <div className="ornament smallcaps text-leaf">Artemisia Dracunculus</div>
        </div>
      </div>
    </footer>
  );
}
