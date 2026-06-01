/**
 * Mapper: RankMath GraphQL → AstroSeoProps
 * Compatible con el schema WPGraphQL de Go Estrategia Creativa
 */

import type { AstroSeoProps } from "@astrolib/seo";
import type { WPPage, WPPost, WPSeo } from "./wordpress";

/** Extrae el objeto SEO de un post o página WP */
export function extractWPSeo(item: WPPost | WPPage | null): WPSeo | null {
    return item?.seo ?? null;
}

/**
 * Convierte metadatos RankMath GraphQL a AstroSeoProps
 */
export function rankMathToAstroSeo(seo: WPSeo | null, siteUrl: string): Partial<AstroSeoProps> {
    if (!seo) return {};

    const title = seo.openGraph?.title ?? seo.title ?? "";
    const description = seo.openGraph?.description ?? seo.description ?? "";
    const canonical = seo.canonicalUrl ?? siteUrl;

    // OG image
    const ogImageUrl = seo.openGraph?.image?.url;

    return {
        title: seo.title ?? title,
        description: seo.description ?? description,
        canonical,
        openGraph: {
            url: canonical,
            title,
            description,
            ...(ogImageUrl ? {
                images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title, type: "image/jpeg" }],
            } : {}),
            site_name: "Go Estrategia Creativa",
        } as any,
        twitter: {
            handle: "@goagency",
            site: "@goagency",
            cardType: "summary_large_image",
        },
    };
}

/**
 * Links hreflang para multiidioma
 */
export function generateHreflangTags(
    currentSlug: string,
    languages: { lang: string; urlSlug: string }[],
    siteUrl: string,
): { lang: string; url: string }[] {
    return languages.map(({ lang, urlSlug }) => ({
        lang,
        url: `${siteUrl}${urlSlug}/${currentSlug}`,
    }));
}

/**
 * JSON-LD Organization schema para Go Estrategia Creativa
 */
export function getOrganizationSchema(siteUrl: string) {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Go Estrategia Creativa",
        url: siteUrl,
        logo: `${siteUrl}/favicons/apple-touch-icon.png`,
        telephone: "+573107541645",
        address: {
            "@type": "PostalAddress",
            "addressCountry": "CO",
            "addressLocality": "Bogotá"
        },
        areaServed: ["CO", "US", "ES", "MX"],
        sameAs: [
            "https://www.instagram.com/goestrategiacreativa/",
            "https://www.linkedin.com/company/goestrategiacreativa"
        ],
    };
}
