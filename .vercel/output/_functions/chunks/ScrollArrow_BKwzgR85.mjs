import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderTemplate, g as renderScript } from './astro/server_C5XeM8TS.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://goestrategiacreativa.com");
const $$ScrollArrow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ScrollArrow;
  const {
    targetId,
    color = "#e25432",
    id = "scroll-arrow-" + Math.random().toString(36).substring(7),
    upTargetId,
    upColor = "#18181b"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col items-center justify-center w-full mt-10 mb-10 gap-3"> ${upTargetId && renderTemplate`<div class="scroll-arrow-wrapper relative flex items-center justify-center w-12 h-12" data-cursor-hover> <button${addAttribute(`${id}-up`, "id")}${addAttribute(upTargetId, "data-target")} class="scroll-arrow-btn flex h-8 w-8 items-center justify-center rounded-full text-white focus:outline-none transition-transform duration-100 relative cursor-pointer"${addAttribute(`background-color: ${upColor}; box-shadow: 0 5px 10px -3px ${upColor}59;`, "style")}${addAttribute(`Scroll up to ${upTargetId}`, "aria-label")}> <svg class="h-4 w-4 stroke-white fill-none animate-pulse" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"> <path d="M12 19V5M5 12l7-7 7 7"></path> </svg> </button> </div>`} ${targetId && renderTemplate`<div class="scroll-arrow-wrapper relative flex items-center justify-center w-24 h-24" data-cursor-hover> <button${addAttribute(id, "id")}${addAttribute(targetId, "data-target")} class="scroll-arrow-btn flex h-16 w-16 items-center justify-center rounded-full text-white focus:outline-none transition-transform duration-100 relative cursor-pointer"${addAttribute(`background-color: ${color}; box-shadow: 0 10px 15px -3px ${color}59;`, "style")}${addAttribute(`Scroll down to ${targetId}`, "aria-label")}> <svg class="h-6 w-6 stroke-white fill-none animate-pulse" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"> <path d="M12 5v14M19 12l-7 7-7-7"></path> </svg> </button> </div>`} </div> ${renderScript($$result, "C:/Users/Edumedia/Documents/GitHub/mintaka/src/components/global/ScrollArrow.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Edumedia/Documents/GitHub/mintaka/src/components/global/ScrollArrow.astro", void 0);

export { $$ScrollArrow as $ };
