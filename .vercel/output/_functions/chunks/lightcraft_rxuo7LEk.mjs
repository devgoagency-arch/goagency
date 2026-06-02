import { h as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_C5XeM8TS.mjs';
import 'clsx';

const frontmatter = {
  "pubDate": "2024-01-15T00:00:00.000Z",
  "author": {
    "name": "Michael Zhang",
    "link": "/author/michael-zhang"
  },
  "title": "LightCraft Studios",
  "description": "Creative portfolio showcase for a modern photography and multimedia production house",
  "link": "https://lightcraft-studios.net",
  "image": {
    "source": "@assets/images/projects/lightcraft.jpg",
    "alt": "Screenshot of LightCraft Studios homepage"
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
      children: "LightCraft Studios specializes in contemporary visual storytelling through photography and mixed media production. This project required developing a sophisticated digital platform to highlight their creative work while maintaining an elegant, minimalist design approach."
    }), "\n", createVNode(_components.p, {
      children: "Built with Astro and GSAP animations, the website delivers smooth transitions and engaging visual experiences. The design prioritizes a distraction-free environment that allows the studio’s artistic portfolio to take center stage."
    }), "\n", createVNode(_components.p, {
      children: "Key project features:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Responsive masonry gallery with smart layout optimization"
      }), "\n", createVNode(_components.li, {
        children: "Touch-enabled slideshow with advanced transition effects"
      }), "\n", createVNode(_components.li, {
        children: "Automated scheduling portal for client consultations"
      }), "\n", createVNode(_components.li, {
        children: "Lazy loading with blur placeholder implementation"
      }), "\n", createVNode(_components.li, {
        children: "Content management in multiple languages"
      }), "\n", createVNode(_components.li, {
        children: "Customizable color schemes with system preference detection"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "The result is a polished web presence that effectively represents the studio’s creative capabilities while offering an intuitive and engaging experience for prospective clients."
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

const url = "src/content/projects/en/lightcraft.mdx";
const file = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/content/projects/en/lightcraft.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/content/projects/en/lightcraft.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
