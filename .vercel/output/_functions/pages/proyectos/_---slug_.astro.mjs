import { c as createAstro, a as createComponent, m as maybeRenderHead, r as renderTemplate, d as renderComponent, b as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_C5XeM8TS.mjs';
import 'kleur/colors';
import { g as getLangFromUrl, b as $$BaseLayout, u as useTranslations } from '../../chunks/BaseLayout_C6rmVxY9.mjs';
import { g as getCollection } from '../../chunks/_astro_content_CTfNvpeL.mjs';
import { p as getWPProyectoBySlug, d as decodeWPHtml, j as getImageUrl, q as getImageAlt, r as getProjectUrl, s as getClienteName, t as getProjectDate, u as getProjectRole, k as getProjectExcerpt, l as getProjectChallenge, v as getProjectSolution, m as getProjectResult, n as getProjectPillars, w as processWPContent } from '../../chunks/wordpress_B062fpnF.mjs';
import { $ as $$GrainyGradient } from '../../chunks/GrainyGradient_BYUg-Y7B.mjs';
import 'clsx';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://goestrategiacreativa.com");
const $$ResultsBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ResultsBlock;
  const { stats = [], note } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="results-block p-8 sm:p-10 my-10 bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-200/50" data-astro-cid-lfjpugrt> <div class="flex flex-col divide-y divide-stone-200/80" data-astro-cid-lfjpugrt> ${stats.map((stat) => renderTemplate`<div class="stat-item flex flex-col gap-2 py-6 first:pt-0 last:pb-0 w-full" data-astro-cid-lfjpugrt> <span class="stat-number font-display text-3xl sm:text-4xl font-light tracking-tight text-[#45ccaa] whitespace-nowrap" data-astro-cid-lfjpugrt> ${stat.number} </span> <span class="stat-label font-sans text-[10px] sm:text-xs font-normal text-stone-500 uppercase tracking-wide" data-astro-cid-lfjpugrt> ${stat.label} </span> </div>`)} </div> ${note && renderTemplate`<div class="note-container mt-6 pt-6 border-t border-stone-200/80" data-astro-cid-lfjpugrt> <p class="font-sans text-[11px] sm:text-xs font-light text-stone-500 leading-relaxed italic" data-astro-cid-lfjpugrt> ${note} </p> </div>`} </div> `;
}, "C:/Users/Edumedia/Documents/GitHub/mintaka/src/components/ResultsBlock.astro", void 0);

const $$Astro = createAstro("https://goestrategiacreativa.com");
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  let title = "";
  let content = "";
  let projectUrl = "";
  let clientName = "";
  let projectDate = "";
  let projectRole = "";
  let projectExcerpt = "";
  let projectChallenge = "";
  let projectSolution = "";
  let projectResult = "";
  let projectPillars = [];
  let RenderedContent = null;
  let wpProject = null;
  const localProjects = await getCollection("projects");
  const localProject = localProjects.find((prj) => {
    const parts = prj.slug.split("/");
    const prjSlug = parts.length > 1 ? parts.slice(1).join("/") : parts[0];
    return prjSlug === slug;
  }) ?? null;
  if (localProject) {
    const { Content } = await localProject.render();
    RenderedContent = Content;
    title = localProject.data.title;
    localProject.data.image?.source?.src ?? null;
    localProject.data.image?.alt ?? title;
    projectUrl = localProject.data.link ?? "";
    clientName = localProject.data.client ?? "";
    projectDate = localProject.data.date ?? "";
    projectRole = localProject.data.role ?? "";
    projectExcerpt = localProject.data.description ?? "";
    projectChallenge = localProject.data.challenge ?? "";
    projectSolution = localProject.data.solution ?? "";
    projectResult = localProject.data.result ?? "";
    projectPillars = (localProject.data.pillars ?? []).map((slug2) => ({ name: slug2, slug: slug2 }));
  } else {
    wpProject = await getWPProyectoBySlug(slug);
    if (!wpProject) return Astro2.redirect("/proyectos", 302);
    title = decodeWPHtml(wpProject.title);
    content = wpProject.content ?? "";
    getImageUrl(wpProject);
    getImageAlt(wpProject);
    projectUrl = getProjectUrl(wpProject);
    clientName = getClienteName(wpProject);
    projectDate = getProjectDate(wpProject);
    projectRole = getProjectRole(wpProject);
    projectExcerpt = getProjectExcerpt(wpProject);
    projectChallenge = getProjectChallenge(wpProject);
    projectSolution = getProjectSolution(wpProject);
    projectResult = getProjectResult(wpProject);
    projectPillars = getProjectPillars(wpProject);
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "wpPost": wpProject, "fallbackTitle": `${title} \u2013 Go Estrategia Creativa`, "fallbackDescription": projectExcerpt || wpProject?.excerpt || localProject?.data.description || "", "pageSlug": `work/${slug}`, "cursorColor": "#45ccaa" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "GrainyGradient", $$GrainyGradient, { "colorBg": "#f0fbf8", "colorA": "#45ccaa", "colorB": "#6FB18A", "colorC": "#EDB74D", "class": "proyecto-detalle" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<article class="section !pt-32 !pb-24 lg:!pt-40 lg:!pb-32"> <div class="col-span-12 mx-auto max-w-7xl w-full"> <div class="grid grid-cols-1 gap-12 lg:grid-cols-[30%_70%] lg:gap-16 w-full"> <!-- Column A: 30% - Sidebar Content (Simple, divided by lines) --> <aside class="w-full lg:sticky lg:top-32 lg:self-start lg:pr-3"> <!-- Project Title --> <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight leading-tight text-zinc-950 mb-4">${title}</h1> <!-- Pillar pills --> ${projectPillars.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-8"> ${projectPillars.map((p) => renderTemplate`<span class="inline-flex items-center px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest border border-[#45ccaa]/40 text-[#45ccaa] bg-[#45ccaa]/10"> ${p.name} </span>`)} </div>`} <!-- ACF Metadata fields with simple line divisions --> <div class="flex flex-col divide-y divide-stone-200/80"> ${clientName?.trim() && renderTemplate`<div class="py-4 first:pt-0"> <span class="text-[0.65rem] font-bold uppercase tracking-widest text-stone-400 block mb-1"> ${lang === "es" ? "Cliente" : "Client"} </span> <p class="text-base font-bold text-zinc-900 leading-snug">${clientName}</p> </div>`} ${projectChallenge?.trim() && renderTemplate`<div class="py-4 first:pt-0"> <span class="text-[0.65rem] font-bold uppercase tracking-widest text-[#45ccaa] block mb-1"> ${lang === "es" ? "El Desaf\xEDo" : "The Challenge"} </span> <p class="text-stone-600 text-sm leading-relaxed font-light">${projectChallenge}</p> </div>`} ${projectSolution?.trim() && renderTemplate`<div class="py-4 first:pt-0"> <span class="text-[0.65rem] font-bold uppercase tracking-widest text-[#EDB74D] block mb-1"> ${lang === "es" ? "La Soluci\xF3n" : "The Solution"} </span> <p class="text-stone-600 text-sm leading-relaxed font-light">${projectSolution}</p> </div>`} ${projectResult?.trim() && renderTemplate`<div class="py-4 first:pt-0"> <span class="text-[0.65rem] font-bold uppercase tracking-widest text-[#6FB18A] block mb-1"> ${lang === "es" ? "El Resultado" : "The Result"} </span> <p class="text-stone-600 text-sm leading-relaxed font-light">${projectResult}</p> </div>`} ${(projectDate?.trim() || projectRole?.trim()) && renderTemplate`<div class="py-4 first:pt-0 space-y-4"> ${projectDate?.trim() && renderTemplate`<div> <span class="text-[0.65rem] font-bold uppercase tracking-widest text-stone-400 block mb-1"> ${lang === "es" ? "Fecha" : "Date"} </span> <p class="text-sm font-medium text-stone-700">${projectDate}</p> </div>`} ${projectRole?.trim() && renderTemplate`<div${addAttribute(projectDate?.trim() ? "border-t border-stone-100 pt-3" : "", "class")}> <span class="text-[0.65rem] font-bold uppercase tracking-widest text-stone-400 block mb-1"> ${lang === "es" ? "Rol / Servicios" : "Role / Services"} </span> <p class="text-sm font-medium text-stone-700">${projectRole}</p> </div>`} </div>`} ${projectUrl?.trim() && renderTemplate`<div class="py-4 first:pt-0 flex justify-start"> <a${addAttribute(projectUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-[#45ccaa] hover:bg-[#3ab899] transition-all rounded-full group"> <span>${lang === "es" ? "Visitar Proyecto" : "Visit Project"}</span> <span class="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span> </a> </div>`} </div> </aside> <!-- Column B: 70% - Main content --> <div class="w-full space-y-12"> <!-- WordPress content or MDX content --> ${RenderedContent ? renderTemplate`<div class="prose-styles !max-w-none"> ${renderComponent($$result3, "RenderedContent", RenderedContent, { "components": { ResultsBlock: $$ResultsBlock } })} </div>` : content ? renderTemplate`<div class="wp-content prose-styles !max-w-none">${unescapeHTML(processWPContent(content))}</div>` : projectExcerpt ? renderTemplate`<div class="wp-content prose-styles !max-w-none">${unescapeHTML(processWPContent(projectExcerpt))}</div>` : null} <!-- Footer Navigation --> <div class="footer-nav mt-16 flex flex-col items-start gap-4 border-t border-stone-200 pt-8 sm:flex-row sm:items-center"> ${projectUrl && renderTemplate`<a${addAttribute(projectUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-colors" style="background-color: #45ccaa;"> ${t("blog.gotoproject")} ↗
</a>`} <a href="/proyectos" class="text-stone-400 transition-colors hover:text-stone-700">
← ${t("projects")} </a> </div> </div> </div> </div> </article> ` })} ` })} `;
}, "C:/Users/Edumedia/Documents/GitHub/mintaka/src/pages/proyectos/[...slug].astro", void 0);

const $$file = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/pages/proyectos/[...slug].astro";
const $$url = "/proyectos/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
