import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderTemplate, d as renderComponent, f as renderSlot } from './astro/server_C5XeM8TS.mjs';
import 'kleur/colors';
import './index_DfOMS8cV.mjs';
import { $ as $$Image } from './_astro_assets_ja603sZb.mjs';
import 'clsx';
import { g as getLangFromUrl, u as useTranslations, b as $$BaseLayout, $ as $$Icon } from './BaseLayout_C6rmVxY9.mjs';
/* empty css                          */
import { $ as $$Title } from './Title_BomFZ2AO.mjs';

const $$Astro$1 = createAstro("https://goestrategiacreativa.com");
const $$Newsletter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Newsletter;
  const { class: className } = Astro2.props;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["relative mt-8 h-20 max-w-[30rem] leading-6 lg:max-w-[35rem]", className], "class:list")} data-astro-cid-x26uyuqm> <div class="origin-left-center squircle-bg-light absolute h-full w-full scale-100 transform rounded-xl bg-slate-200" data-astro-cid-x26uyuqm></div> <form class="h-full" data-astro-cid-x26uyuqm> <input type="email" name="EMAIL" autocomplete="email"${addAttribute(t("footer.yourmail"), "placeholder")} class="pointer-events-auto relative m-0 h-full w-full cursor-text border-0 bg-transparent px-5 py-2 text-xl font-normal not-italic outline-none placeholder:text-gray-400 focus:ring-transparent" data-astro-cid-x26uyuqm> <button type="submit" aria-label="Send newsletter form button" class="pointer-events-auto absolute right-5 top-1/2 m-0 inline-block h-8 w-8 -translate-y-1/2 scale-100 transform cursor-pointer bg-transparent p-0 text-center font-normal normal-case not-italic" data-astro-cid-x26uyuqm> <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-x26uyuqm> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.9999 11.9998C1.9999 12.552 2.44762 12.9997 2.9999 12.9997H18.9757C18.8901 13.148 18.7838 13.2876 18.657 13.4144L12.2931 19.7784C11.9025 20.1689 11.9025 20.8021 12.2931 21.1926C12.6836 21.5831 13.3168 21.5831 13.7073 21.1926L22.1926 12.7073C22.5831 12.3168 22.5831 11.6836 22.1926 11.2931L22.1924 11.293L13.7071 2.80767C13.3166 2.41715 12.6834 2.41715 12.2929 2.80767C11.9024 3.1982 11.9024 3.83136 12.2929 4.22189L18.657 10.586C18.7836 10.7126 18.8896 10.8518 18.9752 10.9998H2.9999C2.44762 10.9997 1.9999 11.4475 1.9999 11.9998Z" fill="black" data-astro-cid-x26uyuqm></path> </svg> </button> </form> <div class="mx-4 mb-0 mt-2 text-black" data-astro-cid-x26uyuqm></div> </div> `;
}, "C:/Users/Edumedia/Documents/GitHub/mintaka/src/components/blog/Newsletter.astro", void 0);

const $$Cta = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-black"> <div class="mx-auto max-w-7xl px-8 py-12 md:px-12 lg:px-32 lg:py-24"> <div class="flex flex-col items-center justify-center gap-10 p-8 text-center lg:p-20"> <p class="mt-8 font-display text-4xl font-semibold text-white md:text-6xl lg:text-8xl">Subscribe to our newsletter!</p> ${renderComponent($$result, "Newsletter", $$Newsletter, { "class": "w-full" })} </div> </div> </section>`;
}, "C:/Users/Edumedia/Documents/GitHub/mintaka/src/components/blog/Cta.astro", void 0);

const $$Comments = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="prose prose-lg mx-auto pt-20 dark:prose-invert"${addAttribute(`{
				initGiscus: function() {
					let script = document.createElement('script');
					script.src = 'https://giscus.app/client.js';
					script.dataset.repo = 'majesticooss/mintaka';
					script.dataset.repoId = 'R_kgDOK_K6WQ';
					script.dataset.category = 'Blog';
					script.dataset.categoryId = 'DIC_kwDOK_K6Wc4CcGH6';
					script.dataset.mapping = 'og:title';
					script.dataset.strict = '0';
					script.dataset.reactionsEnabled = '1';
					script.dataset.emitMetadata = '0';
					script.dataset.inputPosition = 'top';
					script.dataset.theme = localStorage.theme == 'dark' ? 'dark' : 'light';
					script.dataset.lang = 'en';
					script.dataset.loading = 'lazy';
					script.crossOrigin = 'anonymous';
					script.async = true;
					this.$el.appendChild(script);
				}
			}`, "data-xdata")} x-init="initGiscus()"></div>`;
}, "C:/Users/Edumedia/Documents/GitHub/mintaka/src/components/blog/Comments.astro", void 0);

const $$Astro = createAstro("https://goestrategiacreativa.com");
const $$MarkdownPostLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MarkdownPostLayout;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const { frontmatter, body, seo } = Astro2.props;
  function getArticleReadingTime(body2) {
    if (!body2) return 0;
    const wordsPerMinute = 183;
    const numberOfWords = body2.split(/\s/g).length;
    const minutes = numberOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return readTime;
  }
  const readingTime = getArticleReadingTime(body);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "seo": seo }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section> <div class="mx-auto max-w-7xl px-8 py-12 md:px-12 lg:px-32 lg:py-32"> <div class="flex flex-col gap-6 pt-20"> ${renderComponent($$result2, "Title", $$Title, { "title": frontmatter.title, "subtitle": `Written by: <a href="${frontmatter.author.link}" rel="author">${frontmatter.author.name}</a> on ${frontmatter.pubDate.toString().slice(0, 10)}` })} <p class="max-w-2xl text-base text-slate-500"> <em>${frontmatter.description}</em> </p> ${frontmatter?.link && renderTemplate`<a class="font-mono text-xl font-bold"${addAttribute(frontmatter?.link, "href")} target="_blank"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "iconamoon:link-external-thin", "class": "inline" })} ${t("blog.gotoproject")} </a>`} </div> <div class="mt-12 w-full justify-center"> ${renderComponent($$result2, "Image", $$Image, { "class": "mt-12 w-full rounded-lg object-cover", "src": frontmatter.image.source, "alt": frontmatter.image.alt })} <div class="flex justify-between px-2 pt-4 font-mono text-sm"> <div class="flex flex-wrap gap-1"> ${frontmatter?.tags?.length > 0 && renderTemplate`<span class="py-3">TAGS:</span>`} <ul class="flex flex-wrap justify-center"> ${frontmatter?.tags?.map((tag) => renderTemplate`<li class="inline-flex items-center rounded-full px-1 py-3 font-medium uppercase tracking-widest"> <a${addAttribute(`/tags/${tag}`, "href")}>${tag}</a> </li>`)} </ul> </div> <span class="py-3">~${readingTime} MIN</span> </div> <div class="prose-styles mt-12">${renderSlot($$result2, $$slots["default"])}</div> </div> ${renderComponent($$result2, "Comments", $$Comments, {})} </div> </section> ${renderComponent($$result2, "Cta", $$Cta, {})} ` })}`;
}, "C:/Users/Edumedia/Documents/GitHub/mintaka/src/layouts/MarkdownPostLayout.astro", void 0);

export { $$MarkdownPostLayout as $ };
