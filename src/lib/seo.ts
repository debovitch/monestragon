export const SITE_URL = "https://monestragon.com";
export const SITE_NAME = "monestragon.com";

type SeoOptions = {
  description: string;
  image?: string;
  path: string;
  title: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function absoluteAssetUrl(assetPath?: string) {
  if (!assetPath) {
    return undefined;
  }

  return new URL(assetPath, SITE_URL).toString();
}

export function createSeoHead({ description, image, path, title }: SeoOptions) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteAssetUrl(image);

  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(imageUrl
        ? [
            { property: "og:image", content: imageUrl },
            { name: "twitter:image", content: imageUrl },
          ]
        : []),
    ],
  };
}

export function createStructuredDataGraph(...nodes: Array<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function createWebsiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "fr-FR",
    description:
      "Le sanctuaire numerique de Nicolas XII, gardien de l'estragon. Manifeste, recettes sacrees et confrerie.",
  };
}

export function createOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Confrerie de l'Estragon Souverain",
    url: SITE_URL,
  };
}

export function createWebPageJsonLd({
  description,
  path,
  title,
}: Pick<SeoOptions, "description" | "path" | "title">) {
  const url = absoluteUrl(path);

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
