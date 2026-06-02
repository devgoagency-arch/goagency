import { h as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_C5XeM8TS.mjs';
import 'clsx';

const frontmatter = {
  "pubDate": "2024-02-15T00:00:00.000Z",
  "author": {
    "name": "Marco Rossi",
    "link": "/author/marco-rossi"
  },
  "title": "StudioVision Creative",
  "description": "Sito web aziendale per uno studio di design creativo e branding",
  "link": "https://studiovision-creative.it",
  "image": {
    "source": "@assets/images/projects/studiovision.jpg",
    "alt": "Screenshot della homepage di StudioVision Creative"
  }
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "StudioVision Creative è uno studio di design contemporaneo specializzato nella creazione di identità visive e soluzioni di branding innovative. Il progetto ha richiesto lo sviluppo di un sito web moderno e reattivo che riflettesse l’estetica sofisticata dello studio."
    }), "\n", createVNode(_components.p, {
      children: "Il sito è stato realizzato utilizzando tecnologie all’avanguardia come React e TailwindCSS, con particolare attenzione alle animazioni fluide e alle transizioni eleganti. L’interfaccia utente minimalista mette in risalto il portfolio dei lavori attraverso una galleria interattiva e dinamica."
    }), "\n", createVNode(_components.p, {
      children: "Caratteristiche principali del progetto:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Design responsivo ottimizzato per tutti i dispositivi"
      }), "\n", createVNode(_components.li, {
        children: "Animazioni personalizzate per migliorare l’esperienza utente"
      }), "\n", createVNode(_components.li, {
        children: "Sistema CMS headless per la gestione semplificata dei contenuti"
      }), "\n", createVNode(_components.li, {
        children: "Ottimizzazione SEO avanzata"
      }), "\n", createVNode(_components.li, {
        children: "Tempi di caricamento rapidi grazie all’implementazione di tecniche di lazy loading"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Il risultato finale è un sito web elegante e performante che rappresenta perfettamente l’identità professionale del cliente."
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/projects/it/studiovision.mdx";
const file = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/content/projects/it/studiovision.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/content/projects/it/studiovision.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
