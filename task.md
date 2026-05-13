# WordPress Headless CMS – Task List

## Fase 1: Infraestructura Base
- [x] .env.example con WP URL
- [/] src/lib/wordpress.ts – cliente REST API
- [/] src/lib/seo.ts – mapper RankMath → AstroSeo
- [ ] src/components/seo/RankMathSeo.astro

## Fase 2: i18n ES/EN
- [ ] src/i18n/ui.ts – cambiar IT → ES, traducciones
- [ ] src/i18n/utils.ts – hreflang y rutas ES/EN

## Fase 3: Layout y SEO
- [ ] src/components/BaseHead.astro – hreflang tags
- [ ] src/layouts/BaseLayout.astro – SEO dinámico WP

## Fase 4: Páginas Dinámicas
- [ ] src/pages/index.astro (EN Home)
- [ ] src/pages/es/index.astro (ES Home)
- [ ] src/pages/about.astro + es/about.astro
- [ ] src/pages/services.astro + es/servicios.astro
- [ ] src/pages/work/index.astro (masonry CPT)
- [ ] src/pages/es/work/index.astro
- [ ] src/pages/blog/[...slug].astro – desde WP
- [ ] src/pages/es/blog/[...slug].astro

## Fase 5: Componentes
- [ ] src/components/landing/About.astro
- [ ] src/components/work/ProjectsGrid.astro (masonry)
- [ ] global.css – estilos para contenido WP (.wp-content)
