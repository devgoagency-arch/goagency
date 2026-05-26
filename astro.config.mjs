import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    // Bloqueo de puerto añadido aquí:
    server: {
        port: 3000,
        strictPort: true,
    },
    output: "server",
    vite: {
        server: {
            watch: {
                usePolling: true,
            },
        },
    },
    site: "https://goestrategiacreativa.com",
    i18n: {
        defaultLocale: "en",
        locales: ["en", "es"],
    },
    markdown: {
        drafts: true,
        shikiConfig: {
            theme: "css-variables",
        },
    },
    shikiConfig: {
        wrap: true,
        skipInline: false,
        drafts: true,
    },
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
        mdx(),
        icon(),
    ],
});