/**
 * WordPress GraphQL Client – Go Estrategia Creativa
 * Endpoint confirmado: https://goestrategiacreativa.goestrategiacreativa.com/graphql
 *
 * Schema verificado por introspección real:
 *   - CPT: `proyectos` (plural), tipo `Proyecto`, enum `PROYECTOS`
 *   - ACF: acfProyecto { cliente, urlDelProyecto, fecha, rol, descripcionCorta }
 *   - RankMath: seo { title, description, canonicalUrl, openGraph { title, description, image { url } } }
 *   - El CPT no tiene campo `excerpt`, solo `title` y `content`
 */

const GQL = import.meta.env.WORDPRESS_API_URL
    ?? "https://goestrategiacreativa.goestrategiacreativa.com/graphql";

export const WP_PAGE_IDS = {
    home: Number(import.meta.env.WP_PAGE_ID_HOME ?? 5),
    servicios: Number(import.meta.env.WP_PAGE_ID_SERVICIOS ?? 6),
    proyectos: Number(import.meta.env.WP_PAGE_ID_PROYECTOS ?? 7),
    contacto: Number(import.meta.env.WP_PAGE_ID_CONTACTO ?? 8),
} as const;

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────

export interface WPSeo {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    openGraph?: {
        title?: string;
        description?: string;
        image?: { url?: string } | null;
    };
}

export interface WPFeaturedImage {
    sourceUrl: string;
    altText: string;
    mediaDetails?: { width?: number; height?: number };
}

/** Campos ACF del CPT Proyectos — nombres confirmados por la API */
export interface AcfProyecto {
    fieldGroupName?: string;
    cliente?: string;
    urlDelProyecto?: string;   // ← nombre real confirmado (no urlProyecto)
    fecha?: string;
    rol?: string;
    descripcionCorta?: string;
}

/** Campos ACF de páginas */
export interface AcfPage {
    fieldGroupName?: string;
    heroTitulo?: string;
    heroSubtitulo?: string;
    [key: string]: any;
}

export interface WPPost {
    id: string;
    databaseId: number;
    slug: string;
    title: string;
    date?: string;
    content?: string;
    status?: string;
    featuredImage?: { node: WPFeaturedImage } | null;
    seo?: WPSeo;
    acfProyecto?: AcfProyecto | null;
}

export interface WPPage {
    id: string;
    databaseId: number;
    slug: string;
    title: string;
    content?: string;
    seo?: WPSeo;
    acfPagina?: AcfPage | null;
}

export interface WPTeamMember extends WPPost {
    acf?: {
        photo?: WPFeaturedImage;
        role?: string;
        bio?: string;
        linkedin?: string;
        instagram?: string;
    };
    excerpt?: { rendered: string };
}

// ─────────────────────────────────────────────
// Fragmentos — nombres verificados en el endpoint real
// ─────────────────────────────────────────────

const SEO = `seo {
	title
	description
	canonicalUrl
	openGraph { title description image { url } }
}`;

const FEATURED_IMAGE = `featuredImage {
	node { sourceUrl altText mediaDetails { width height } }
}`;

const ACF_PROYECTO = `acfProyecto {
	fieldGroupName
	cliente
	urlDelProyecto
	fecha
	rol
	descripcionCorta
}`;

const ACF_PAGINA = `acfPagina {
	fieldGroupName
	heroTitulo
	heroSubtitulo
}`;

// ─────────────────────────────────────────────
// Helper GraphQL
// ─────────────────────────────────────────────

async function gqlFetch<T>(query: string, variables: Record<string, any> = {}): Promise<T | null> {
    try {
        const res = await fetch(GQL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables }),
            cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.errors?.length) {
            console.warn("[WPGraphQL]", json.errors.map((e: any) => e.message).join(" | "));
        }
        return json.data as T;
    } catch (err) {
        console.error("[WPGraphQL]", err);
        return null;
    }
}

// ─────────────────────────────────────────────
// API – Páginas por DATABASE_ID
// ─────────────────────────────────────────────

export async function getWPPageById(id: number): Promise<WPPage | null> {
    const data = await gqlFetch<{ page: WPPage | null }>(`
		query GetPage($id: ID!) {
			page(id: $id, idType: DATABASE_ID) {
				id databaseId slug title content
				${SEO}
				${ACF_PAGINA}
			}
		}
	`, { id });
    return data?.page ?? null;
}

export const getWPHomePage = () => getWPPageById(WP_PAGE_IDS.home);
export const getWPServiciosPage = () => getWPPageById(WP_PAGE_IDS.servicios);
export const getWPProyectosPage = () => getWPPageById(WP_PAGE_IDS.proyectos);
export const getWPContactoPage = () => getWPPageById(WP_PAGE_IDS.contacto);

export async function getWPPage(slug: string, lang = "en"): Promise<WPPage | null> {
    const data = await gqlFetch<{ page: WPPage | null }>(`
		query GetPage($slug: ID!) {
			page(id: $slug, idType: URI) {
				id databaseId slug title content
				${SEO}
				${ACF_PAGINA}
			}
		}
	`, { slug: lang === "es" && !slug.startsWith("es/") ? `es/${slug}` : slug });
    return data?.page ?? null;
}

export async function getWPTeam(lang = "en"): Promise<WPTeamMember[]> {
    // Intenta traer 'team' o 'members' si existe. Si no, devuelve vacío.
    const data = await gqlFetch<{ teamMembers: { nodes: WPTeamMember[] } }>(`
		query GetTeam($lang: String) {
			teamMembers(where: { language: $lang }) {
				nodes {
					id databaseId slug title
					${FEATURED_IMAGE}
					acf { photo { sourceUrl altText } role bio linkedin instagram }
				}
			}
		}
	`, { lang });
    return data?.teamMembers?.nodes ?? [];
}

// ─────────────────────────────────────────────
// API – Blog Posts
// ─────────────────────────────────────────────

export async function getWPPosts(first = 20): Promise<WPPost[]> {
    const data = await gqlFetch<{ posts: { nodes: WPPost[] } }>(`
		query GetPosts($first: Int!) {
			posts(first: $first, where: { status: PUBLISH }) {
				nodes {
					id databaseId slug title date
					${FEATURED_IMAGE}
					${SEO}
				}
			}
		}
	`, { first });
    return data?.posts?.nodes ?? [];
}

export async function getWPPostBySlug(slug: string): Promise<WPPost | null> {
    const data = await gqlFetch<{ post: WPPost | null }>(`
		query GetPost($slug: ID!) {
			post(id: $slug, idType: SLUG) {
				id databaseId slug title date content
				${FEATURED_IMAGE}
				${SEO}
			}
		}
	`, { slug });
    return data?.post ?? null;
}

export async function getAllWPPostSlugs(): Promise<string[]> {
    const data = await gqlFetch<{ posts: { nodes: { slug: string }[] } }>(`
		query { posts(first: 200, where: { status: PUBLISH }) { nodes { slug } } }
	`);
    return data?.posts?.nodes?.map((n) => n.slug) ?? [];
}

// ─────────────────────────────────────────────
// API – CPT Proyectos (schema confirmado)
// ─────────────────────────────────────────────

const PROYECTO_FIELDS = `
	id databaseId slug title content status
	${FEATURED_IMAGE}
	${SEO}
	${ACF_PROYECTO}
`;

/** Lista de proyectos publicados */
export async function getWPProyectos(first = 50): Promise<WPPost[]> {
    const data = await gqlFetch<{ proyectos: { nodes: WPPost[] } }>(`
		query GetProyectos($first: Int!) {
			proyectos(first: $first) {
				nodes { ${PROYECTO_FIELDS} }
			}
		}
	`, { first });
    return data?.proyectos?.nodes ?? [];
}

/** Proyecto individual por slug */
export async function getWPProyectoBySlug(slug: string): Promise<WPPost | null> {
    const data = await gqlFetch<{ proyecto: WPPost | null }>(`
		query GetProyecto($slug: ID!) {
			proyecto(id: $slug, idType: SLUG) {
				${PROYECTO_FIELDS}
			}
		}
	`, { slug });
    return data?.proyecto ?? null;
}

/** Todos los slugs de proyectos para getStaticPaths */
export async function getAllWPProyectoSlugs(): Promise<string[]> {
    const data = await gqlFetch<{ proyectos: { nodes: { slug: string }[] } }>(`
		query { proyectos(first: 200) { nodes { slug } } }
	`);
    return data?.proyectos?.nodes?.map((n) => n.slug) ?? [];
}

// ─────────────────────────────────────────────
// Helpers de extracción ACF
// ─────────────────────────────────────────────

/** Nombre del cliente */
export function getClienteName(p: WPPost): string {
    return p.acfProyecto?.cliente ?? "";
}

/** URL del proyecto */
export function getProjectUrl(p: WPPost): string {
    return p.acfProyecto?.urlDelProyecto ?? "";
}

/** Fecha del proyecto */
export function getProjectDate(p: WPPost): string {
    return p.acfProyecto?.fecha ?? "";
}

/** Rol / Servicios */
export function getProjectRole(p: WPPost): string {
    return p.acfProyecto?.rol ?? "";
}

/** Descripción corta (ACF) o excerpt del post */
export function getProjectExcerpt(p: WPPost): string {
    return p.acfProyecto?.descripcionCorta ?? "";
}

/** URL imagen destacada */
export function getImageUrl(p: WPPost | WPPage): string | null {
    return (p as WPPost).featuredImage?.node?.sourceUrl ?? null;
}

/** Alt texto imagen destacada */
export function getImageAlt(p: WPPost | WPPage): string {
    return (p as WPPost).featuredImage?.node?.altText ?? p.title ?? "";
}

/** Limpia entidades HTML de WP */
export function decodeWPHtml(html: string = ""): string {
    if (typeof html !== 'string') return "";
    return html
        .replace(/&#8217;/g, "'").replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"').replace(/&#8211;/g, "–")
        .replace(/&#8212;/g, "—").replace(/&amp;/g, "&");
}

/** Legacy helper for single post/page featured image */
export function getFeaturedImage(p: any) {
    if (p.featuredImage?.node) return p.featuredImage.node;
    if (p.featuredImage) return p.featuredImage;
    return null;
}
