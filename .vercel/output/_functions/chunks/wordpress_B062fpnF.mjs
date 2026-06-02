import dns from 'node:dns';
import https from 'node:https';

dns.setDefaultResultOrder("ipv4first");
const GQL = "https://goestrategiacreativa.goestrategiacreativa.com/graphql";
const WP_PAGE_IDS = {
  home: Number("5"),
  proyectos: Number("7")};
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
async function httpsPost(body, timeoutMs = 1e4) {
  {
    const parsedUrl = new URL(GQL);
    return new Promise((resolve, reject) => {
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || 443,
        path: parsedUrl.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      };
      const req = https.request(options, (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        res.on("error", reject);
      });
      req.setTimeout(timeoutMs, () => {
        req.destroy();
        reject(new Error(`Timeout after ${timeoutMs}ms`));
      });
      req.on("error", reject);
      req.write(body);
      req.end();
    });
  }
}
async function gqlFetch(query, variables = {}, retries = 3, delay = 500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const body = JSON.stringify({ query, variables });
      const raw = await httpsPost(body);
      const json = JSON.parse(raw);
      if (json.errors?.length) {
        console.warn("[WPGraphQL]", json.errors.map((e) => e.message).join(" | "));
      }
      return json.data;
    } catch (err) {
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
async function getWPPageById(id) {
  const data = await gqlFetch(`
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
const getWPHomePage = () => getWPPageById(WP_PAGE_IDS.home);
const getWPProyectosPage = () => getWPPageById(WP_PAGE_IDS.proyectos);
async function getWPPage(slug, lang = "en") {
  const data = await gqlFetch(`
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
async function getWPTeam(lang = "en") {
  const data = await gqlFetch(`
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
async function getWPPostBySlug(slug) {
  const data = await gqlFetch(`
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
async function getAllWPPostSlugs() {
  const data = await gqlFetch(`
		query { posts(first: 200, where: { status: PUBLISH }) { nodes { slug } } }
	`);
  return data?.posts?.nodes?.map((n) => n.slug) ?? [];
}
const PROYECTO_FIELDS = `
	id databaseId slug title content status
	${FEATURED_IMAGE}
	${SEO}
	${ACF_PROYECTO}
	terms { nodes { name slug taxonomyName } }
`;
async function getWPProyectos(first = 50) {
  const data = await gqlFetch(`
		query GetProyectos($first: Int!) {
			proyectos(first: $first) {
				nodes { ${PROYECTO_FIELDS} }
			}
		}
	`, { first });
  return data?.proyectos?.nodes ?? [];
}
async function getWPProyectoBySlug(slug) {
  const data = await gqlFetch(`
		query GetProyecto($slug: ID!) {
			proyecto(id: $slug, idType: SLUG) {
				${PROYECTO_FIELDS}
			}
		}
	`, { slug });
  return data?.proyecto ?? null;
}
function getClienteName(p) {
  return p.acfProyecto?.cliente ?? "";
}
function getProjectUrl(p) {
  return p.acfProyecto?.urlDelProyecto ?? "";
}
function getProjectDate(p) {
  return p.acfProyecto?.fecha ?? "";
}
function getProjectRole(p) {
  return p.acfProyecto?.rol ?? "";
}
function getProjectExcerpt(p) {
  return p.acfProyecto?.descripcionCorta ?? "";
}
function getProjectChallenge(p) {
  return p.acfProyecto?.theChallenge ?? "";
}
function getProjectSolution(p) {
  return p.acfProyecto?.theSolution ?? "";
}
function getProjectResult(p) {
  return p.acfProyecto?.theResult ?? "";
}
function getProjectPillars(p) {
  return p.terms?.nodes?.filter((t) => t.taxonomyName === "pilar") ?? [];
}
function getImageUrl(p) {
  return p.featuredImage?.node?.sourceUrl ?? null;
}
function getImageAlt(p) {
  return p.featuredImage?.node?.altText ?? p.title ?? "";
}
function decodeWPHtml(html = "") {
  if (typeof html !== "string") return "";
  return html.replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8211;/g, "–").replace(/&#8212;/g, "—").replace(/&amp;/g, "&");
}
function extractTextSection(html, sectionTitle, nextSectionTitle) {
  if (!html) return null;
  let textWithNewlines = html.replace(/<\/p>/gi, "\n\n").replace(/<br\s*\/?>/gi, "\n");
  let plainText = decodeWPHtml(textWithNewlines.replace(/<[^>]+>/g, " "));
  plainText = plainText.replace(/[ \t]+/g, " ").trim();
  const safeTitle = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let regexStr = `${safeTitle}\\s*[:\\-]*\\s*([\\s\\S]*?)(?:\\n\\n|$)`;
  if (nextSectionTitle) {
    const safeNext = nextSectionTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    regexStr = `${safeTitle}\\s*[:\\-]*\\s*([\\s\\S]*?)(?:\\n\\n|${safeNext}|$)`;
  }
  const regex = new RegExp(regexStr, "i");
  const match = plainText.match(regex);
  if (match && match[1]) {
    return match[1].replace(/\n/g, " ").trim();
  }
  return null;
}
function getFeaturedImage(p) {
  if (p.featuredImage?.node) return p.featuredImage.node;
  if (p.featuredImage) return p.featuredImage;
  return null;
}
function processWPContent(html) {
  if (!html) return html;
  return html.replace(
    /<results-block([\s\S]*?)(?:\/>|>[\s\S]*?<\/results-block>)/gi,
    (_match, attrs) => {
      const decoded = attrs.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      const statsMatch = decoded.match(/stats\s*=\s*'([^']+)'/) || decoded.match(/stats\s*=\s*"([^"]+)"/);
      const noteMatch = decoded.match(/note\s*=\s*'([^']+)'/) || decoded.match(/note\s*=\s*"([^"]+)"/);
      let stats = [];
      let note = "";
      if (statsMatch) {
        try {
          const fixedJson = statsMatch[1].replace(/}\s*{/g, "},{");
          stats = JSON.parse(fixedJson);
        } catch {
        }
      }
      if (noteMatch) note = noteMatch[1];
      if (stats.length === 0) return "";
      const statsHtml = stats.map((s, index) => `
                <div class="stat-item flex flex-col gap-2 w-full" style="padding-top:${index === 0 ? "0" : "1.5rem"}; padding-bottom:${index === stats.length - 1 ? "0" : "1.5rem"}; ${index !== 0 ? "border-top:1px solid rgba(231,229,228,0.8);" : ""}">
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

export { getWPPage as a, getWPTeam as b, getAllWPPostSlugs as c, decodeWPHtml as d, extractTextSection as e, getWPPostBySlug as f, getFeaturedImage as g, getWPProyectosPage as h, getWPProyectos as i, getImageUrl as j, getProjectExcerpt as k, getProjectChallenge as l, getProjectResult as m, getProjectPillars as n, getWPHomePage as o, getWPProyectoBySlug as p, getImageAlt as q, getProjectUrl as r, getClienteName as s, getProjectDate as t, getProjectRole as u, getProjectSolution as v, processWPContent as w };
