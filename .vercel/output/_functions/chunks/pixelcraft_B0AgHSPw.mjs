import { h as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_C5XeM8TS.mjs';
import 'clsx';

const frontmatter = {
  "pubDate": "2024-01-15T00:00:00.000Z",
  "author": {
    "name": "Michael Zhang",
    "link": "/author/michael-zhang"
  },
  "title": "PixelCraft Studios",
  "description": "Creative platform for a modern digital art and photography collective",
  "link": "https://pixelcraft-studios.net",
  "image": {
    "source": "@assets/images/projects/pixelcraft.jpg",
    "alt": "Screenshot of PixelCraft Studios homepage"
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
      children: "PixelCraft Studios represents a collective of digital artists specializing in contemporary photography and mixed-media productions. This project required developing a sophisticated web presence that would highlight their experimental artwork while maintaining professional appeal."
    }), "\n", createVNode(_components.p, {
      children: "Built with Astro and GSAP animations, the site delivers smooth transitions and engaging visual experiences. The design approach focused on creating a minimalist interface that allows the artistic work to take center stage."
    }), "\n", createVNode(_components.p, {
      children: "Key project features:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Masonry layout with intelligent image clustering"
      }), "\n", createVNode(_components.li, {
        children: "Touch-enabled gallery viewer with 3D transitions"
      }), "\n", createVNode(_components.li, {
        children: "Automated scheduling platform for consultations"
      }), "\n", createVNode(_components.li, {
        children: "Lazy-loading image system with blur placeholders"
      }), "\n", createVNode(_components.li, {
        children: "Region-specific content delivery"
      }), "\n", createVNode(_components.li, {
        children: "Customizable color schemes with system preference detection"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "The result is an elegant digital showcase that effectively represents the collective’s creative identity while offering an intuitive platform for client engagement and portfolio discovery."
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

const url = "src/content/projects/en/pixelcraft.mdx";
const file = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/content/projects/en/pixelcraft.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/content/projects/en/pixelcraft.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
