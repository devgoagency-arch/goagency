import { h as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_C5XeM8TS.mjs';
import 'clsx';

const frontmatter = {
  "pubDate": "2024-02-15T00:00:00.000Z",
  "author": {
    "name": "Marco Rossi",
    "link": "/author/marco-rossi"
  },
  "title": "StudioVision Creative",
  "description": "Corporate website for a creative design and branding studio",
  "link": "https://studiovision-creative.it",
  "image": {
    "source": "@assets/images/projects/studiovision.jpg",
    "alt": "Screenshot of StudioVision Creative homepage"
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
      children: "StudioVision Creative is a contemporary design studio specializing in creating visual identities and innovative branding solutions. The project required developing a modern and responsive website that would reflect the studio’s sophisticated aesthetic."
    }), "\n", createVNode(_components.p, {
      children: "The site was built using cutting-edge technologies like React and TailwindCSS, with special attention to smooth animations and elegant transitions. The minimalist user interface highlights the work portfolio through an interactive and dynamic gallery."
    }), "\n", createVNode(_components.p, {
      children: "Key project features:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Responsive design optimized for all devices"
      }), "\n", createVNode(_components.li, {
        children: "Custom animations to enhance user experience"
      }), "\n", createVNode(_components.li, {
        children: "Headless CMS for simplified content management"
      }), "\n", createVNode(_components.li, {
        children: "Advanced SEO optimization"
      }), "\n", createVNode(_components.li, {
        children: "Fast loading times through lazy loading implementation"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "The end result is an elegant and high-performing website that perfectly represents the client’s professional identity."
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

const url = "src/content/projects/en/studiovision.mdx";
const file = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/content/projects/en/studiovision.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Edumedia/Documents/GitHub/mintaka/src/content/projects/en/studiovision.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
