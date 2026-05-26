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

import dns from "node:dns";
import https from "node:https";
dns.setDefaultResultOrder("ipv4first");

const GQL_HOST = "goestrategiacreativa.goestrategiacreativa.com";
const GQL_PATH = "/graphql";

const GQL = import.meta.env.WORDPRESS_API_URL
    ?? `https://${GQL_HOST}${GQL_PATH}`;


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
    theChallenge?: string;
    theSolution?: string;
    theResult?: string;
}

/** Campos ACF de páginas */
export interface AcfPage {
    fieldGroupName?: string;
    heroTitulo?: string;
    heroSubtitulo?: string;
    [key: string]: any;
}

export interface WPTerm {
    name: string;
    slug: string;
    taxonomyName: string;
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
    terms?: { nodes: WPTerm[] } | null;
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
	theChallenge
	theSolution
	theResult
}`;

const ACF_PAGINA = `acfPagina {
	fieldGroupName
	heroTitulo
	heroSubtitulo
}`;

// ─────────────────────────────────────────────
// Helper GraphQL
// ─────────────────────────────────────────────

/** Resolves the WP host to a single IPv4 address, bypassing undici multi-IP connect issues */
function resolveIPv4(hostname: string): Promise<string> {
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, { family: 4 }, (err, address) => {
            if (err) reject(err);
            else resolve(address);
        });
    });
}

/** Performs a POST to the WP GraphQL endpoint via node:https with runtime DNS resolution */
async function httpsPost(body: string, timeoutMs = 10_000): Promise<string> {
    const isCustomUrl = !!import.meta.env.WORDPRESS_API_URL;

    // For custom URLs (env var), use the URL directly without IP tricks
    if (isCustomUrl) {
        const parsedUrl = new URL(GQL);
        return new Promise((resolve, reject) => {
            const options: https.RequestOptions = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || 443,
                path: parsedUrl.pathname,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(body),
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                },
            };
            const req = https.request(options, (res) => {
                const chunks: Buffer[] = [];
                res.on("data", (chunk: Buffer) => chunks.push(chunk));
                res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
                res.on("error", reject);
            });
            req.setTimeout(timeoutMs, () => { req.destroy(); reject(new Error(`Timeout after ${timeoutMs}ms`)); });
            req.on("error", reject);
            req.write(body);
            req.end();
        });
    }

    // Resolve to a single IPv4 at request time to avoid CDN IP rotation issues
    // and undici's parallel multi-IP connect + TLS renegotiation failures
    const ip = await resolveIPv4(GQL_HOST);

    return new Promise((resolve, reject) => {
        const options: https.RequestOptions = {
            hostname: ip,
            port: 443,
            path: GQL_PATH,
            method: "POST",
            headers: {
                "Host": GQL_HOST,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(body),
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
            rejectUnauthorized: false, // cert CN is the hostname, not the IP
        };

        const req = https.request(options, (res) => {
            const chunks: Buffer[] = [];
            res.on("data", (chunk: Buffer) => chunks.push(chunk));
            res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
            res.on("error", reject);
        });

        req.setTimeout(timeoutMs, () => {
            req.destroy();
            reject(new Error(`WPGraphQL request timed out after ${timeoutMs}ms`));
        });
        req.on("error", reject);
        req.write(body);
        req.end();
    });
}


async function gqlFetch<T>(query: string, variables: Record<string, any> = {}, retries = 3, delay = 500): Promise<T | null> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const body = JSON.stringify({ query, variables });
            const raw  = await httpsPost(body);
            const json = JSON.parse(raw);
            if (json.errors?.length) {
                console.warn("[WPGraphQL]", json.errors.map((e: any) => e.message).join(" | "));
            }
            return json.data as T;
        } catch (err: any) {
            console.warn(`[WPGraphQL] Attempt ${attempt} failed: ${err.message || err}`);
            if (attempt === retries) {
                console.error("[WPGraphQL] All retry attempts failed.", err);
                return null;
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
    return null;
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
	terms { nodes { name slug taxonomyName } }
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

/** Desafío (ACF) */
export function getProjectChallenge(p: WPPost): string {
    return p.acfProyecto?.theChallenge ?? "";
}

/** Solución (ACF) */
export function getProjectSolution(p: WPPost): string {
    return p.acfProyecto?.theSolution ?? "";
}

/** Resultado (ACF) */
export function getProjectResult(p: WPPost): string {
    return p.acfProyecto?.theResult ?? "";
}

/** Pilares (taxonomía custom) */
export function getProjectPillars(p: WPPost): WPTerm[] {
    return p.terms?.nodes?.filter((t) => t.taxonomyName === "pilar") ?? [];
}

/** URL imagen destacada */
export function getImageUrl(p: WPPost | WPPage): string | null {
    return (p as WPPost).featuredImage?.node?.sourceUrl ?? null;
}

/** Alt texto imagen destacada */
export function getImageAlt(p: WPPost | WPPage): string {
    return (p as WPPost).featuredImage?.node?.altText ?? p.title ?? "";
}

export function decodeWPHtml(html: string = ""): string {
    if (typeof html !== 'string') return "";
    return html
        .replace(/&#8217;/g, "'").replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"').replace(/&#8211;/g, "–")
        .replace(/&#8212;/g, "—").replace(/&amp;/g, "&");
}

/** Extrae texto de una sección ignorando etiquetas HTML, buscando solo las palabras clave */
export function extractTextSection(html: string | undefined, sectionTitle: string, nextSectionTitle?: string): string | null {
    if (!html) return null;
    
    // 1. Convertir <p> a saltos de línea dobles para preservar los "punto y aparte"
    let textWithNewlines = html.replace(/<\/p>/gi, '\n\n').replace(/<br\s*\/?>/gi, '\n');
    
    // 2. Limpiar el resto del HTML y decodificar entidades
    let plainText = decodeWPHtml(textWithNewlines.replace(/<[^>]+>/g, ' '));
    // Reemplazar múltiples espacios horizontales por uno solo
    plainText = plainText.replace(/[ \t]+/g, ' ').trim();
    
    // 3. Escapar los títulos para la regex
    const safeTitle = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // 4. Construir la regex para capturar todo después del título
    // Se detiene al encontrar \n\n (punto y aparte) o el siguiente título
    let regexStr = `${safeTitle}\\s*[:\\-]*\\s*([\\s\\S]*?)(?:\\n\\n|$)`;
    
    if (nextSectionTitle) {
        const safeNext = nextSectionTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        regexStr = `${safeTitle}\\s*[:\\-]*\\s*([\\s\\S]*?)(?:\\n\\n|${safeNext}|$)`;
    }
    
    const regex = new RegExp(regexStr, 'i');
    const match = plainText.match(regex);
    
    if (match && match[1]) {
        // Retornar limpiando saltos de línea internos residuales
        return match[1].replace(/\n/g, ' ').trim();
    }
    
    return null;
}

/** Legacy helper for single post/page featured image */
export function getFeaturedImage(p: any) {
    if (p.featuredImage?.node) return p.featuredImage.node;
    if (p.featuredImage) return p.featuredImage;
    return null;
}

// ─────────────────────────────────────────────
// ResultsBlock renderer para contenido WordPress
// ─────────────────────────────────────────────

interface ResultStat { number: string; label: string; }

/**
 * Transforma <results-block stats='[...]' note="..."></results-block>
 * en HTML pre-renderizado que coincide con el diseño de ResultsBlock.astro.
 *
 * Uso en Gutenberg → bloque "HTML personalizado":
 * <results-block
 *   stats='[{"number":"25+","label":"Pre-orders"},{"number":"0","label":"Manual entries"}]'
 *   note="Texto opcional de nota.">
 * </results-block>
 */
export function processWPContent(html: string): string {
    if (!html) return html;

    // Matches both self-closing and paired tags
    return html.replace(
        /<results-block([\s\S]*?)(?:\/>|>[\s\S]*?<\/results-block>)/gi,
        (_match, attrs: string) => {
            // Decode HTML entities that Gutenberg may have encoded
            const decoded = attrs
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">");

            // Extract stats (JSON array, wrapped in single or double quotes)
            const statsMatch = decoded.match(/stats\s*=\s*'([^']+)'/) ||
                               decoded.match(/stats\s*=\s*"([^"]+)"/);
            // Extract note (string)
            const noteMatch  = decoded.match(/note\s*=\s*'([^']+)'/) ||
                               decoded.match(/note\s*=\s*"([^"]+)"/);

            let stats: ResultStat[] = [];
            let note = "";

            if (statsMatch) {
                try { 
                    // Make JSON parsing forgiving for missing commas between objects
                    const fixedJson = statsMatch[1].replace(/}\s*{/g, '},{');
                    stats = JSON.parse(fixedJson); 
                } catch { /* skip */ }
            }
            if (noteMatch) note = noteMatch[1];

            if (stats.length === 0) return ""; // nothing to render

            const statsHtml = stats.map((s, index) => `
                <div class="stat-item flex flex-col gap-2 w-full" style="padding-top:${index === 0 ? '0' : '1.5rem'}; padding-bottom:${index === stats.length - 1 ? '0' : '1.5rem'}; ${index !== 0 ? 'border-top:1px solid rgba(231,229,228,0.8);' : ''}">
                    <span style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:clamp(2.25rem,5vw,3rem);line-height:1;letter-spacing:-0.02em;color:#45ccaa;white-space:nowrap;">${s.number}</span>
                    <span style="font-family:'Montserrat',sans-serif;font-weight:500;font-size:0.75rem;color:#78716c;line-height:1.5;text-transform:uppercase;letter-spacing:0.025em;margin-top:0.5rem;">${s.label}</span>
                </div>`).join("\n");

            const noteHtml = note ? `
                <div style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid rgba(231,229,228,0.8)">
                    <p style="font-family:'Montserrat',sans-serif;font-weight:300;font-size:0.75rem;color:#78716c;line-height:1.7;font-style:italic">${note}</p>
                </div>` : "";

            return `
<div class="results-block-wp" style="
    background:rgba(255,255,255,0.7);
    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);
    border:1px solid rgba(231,229,228,0.5);
    border-radius:10px;
    padding:clamp(2rem,5vw,2.5rem);
    margin:2.5rem 0;
    color:#1c1917;
    box-shadow:0 8px 30px rgba(0,0,0,0.04);
">
    <div style="display:flex;flex-direction:column;">
        ${statsHtml}
    </div>
    ${noteHtml}
</div>`;
        }
    );
}

