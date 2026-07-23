import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import vercel from '@astrojs/vercel';
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    adapter: vercel(),
    // Bloqueo de puerto añadido aquí:
    server: {
        port: 3000,
        strictPort: true,
    },
    output: "server",
    vite: {
        plugins: [tailwindcss()],
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

        sitemap(),
        mdx(),
        icon(),
    ],
});