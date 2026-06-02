import { c as createAstro, a as createComponent, e as defineStyleVars, m as maybeRenderHead, b as addAttribute, s as spreadAttributes, f as renderSlot, r as renderTemplate } from './astro/server_C5XeM8TS.mjs';
/* empty css                         */
import 'clsx';

const $$Astro = createAstro("https://goestrategiacreativa.com");
const $$GrainyGradient = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GrainyGradient;
  const randomId = Math.random().toString(36).substring(2, 15);
  const filterUrlId = `url(#${randomId})`;
  const { colorBg = "#6cf901", colorA = "#EDB74D", colorB = "#EB6666", colorC = "#6FB18A", class: className, ...rest } = Astro2.props;
  const $$definedVars = defineStyleVars([{ filterUrlId, colorBg, colorA, colorB, colorC }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([className, "grainy-gradient"], "class:list")}${spreadAttributes(rest)} data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}> <svg class="hidden" data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}> <filter${addAttribute(randomId, "id")} data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}> <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}></feTurbulence> <feColorMatrix in="colorNoise" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}></feColorMatrix> <feComposite operator="in" in2="SourceGraphic" result="monoNoise" data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}></feComposite> <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}></feBlend> </filter> </svg> <div class="blob-cont" data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}> <div class="color-a blob" data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}></div> <div class="color-c blob" data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}></div> <div class="color-b blob" data-astro-cid-x5z57i5t${addAttribute($$definedVars, "style")}></div> </div> ${renderSlot($$result, $$slots["default"])} </div> `;
}, "C:/Users/Edumedia/Documents/GitHub/mintaka/src/components/global/GrainyGradient.astro", void 0);

export { $$GrainyGradient as $ };
