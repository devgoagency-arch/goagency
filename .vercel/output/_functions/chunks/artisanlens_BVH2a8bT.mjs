import { h as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_C5XeM8TS.mjs';
import 'clsx';

const frontmatter = {
  "pubDate": "2023-09-28T00:00:00.000Z",
  "author": {
    "name": "Sarah Chen",
    "link": "/author/sarah-chen"
  },
  "title": "ArtisanLens Studio",
  "description": "Portfolio website for a boutique photography and digital media agency",
  "link": "https://artisanlens-studio.com",
  "image": {
    "source": "@assets/images/projects/artisanlens.jpg",
    "alt": "Screenshot of ArtisanLens Studio homepage"
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
      children: "ArtisanLens Studio is a dynamic digital media agency focused on commercial photography and multimedia storytelling. The project involved creating an immersive online platform that would showcase their diverse portfolio while maintaining a clean, professional aesthetic."
    }), "\n", createVNode(_components.p, {
      children: "The website was developed using Next.js and Framer Motion, emphasizing fluid interactions and captivating visual narratives. The design philosophy centered on creating an intuitive browsing experience that puts the photography work at the forefront."
    }), "\n", createVNode(_components.p, {
      children: "Key project features:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Adaptive grid layout with dynamic resizing"
      }), "\n", createVNode(_components.li, {
        children: "Custom-built image carousel with gesture controls"
      }), "\n", createVNode(_components.li, {
        children: "Integrated booking system for client sessions"
      }), "\n", createVNode(_components.li, {
        children: "Progressive image loading for optimal performance"
      }), "\n", createVNode(_components.li, {
        children: "Multi-language support with localized content"
      }), "\n", createVNode(_components.li, {
        children: "Dark/light mode theming"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "The final product delivers a sophisticated digital presence that effectively communicates the studio’s artistic vision while providing a seamless user experience for potential clients."
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

const url = "src/content/projects/en/artisanlens.mdx";
const file = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/content/projects/en/artisanlens.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/content/projects/en/artisanlens.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
