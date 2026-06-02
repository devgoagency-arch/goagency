import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, u as unescapeHTML, r as renderTemplate } from './astro/server_C5XeM8TS.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://goestrategiacreativa.com");
const $$Title = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Title;
  const { title, subtitle, class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["flex md:justify-center", className], "class:list")}> <div class="inline-flex flex-col gap-4"> <div class="inline-flex items-center gap-4"> <div class="hidden h-1 w-20 bg-black md:block"></div> <span class="font-mono text-xs font-semibold uppercase tracking-wide">${unescapeHTML(subtitle)}</span> </div> <h1 class="font-display text-5xl font-extrabold sm:text-6xl md:text-7xl lg:text-9xl">${title}</h1> </div> </div>`;
}, "C:/Users/Edumedia/Documents/GitHub/mintaka/src/components/global/Title.astro", void 0);

export { $$Title as $ };
