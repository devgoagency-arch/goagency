import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			pubDate: z.date(),
			description: z.string(),
			author: z.object({
				name: z.string(),
				link: z.string(),
			}),
			image: z.object({
				source: image(),
				alt: z.string(),
			}),

			tags: z.array(z.string()),
		}),
});

const projectsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			pubDate: z.date(),
			description: z.string(),
			link: z.string().optional(),
			client: z.string().optional(),
			date: z.string().optional(),
			role: z.string().optional(),
			challenge: z.string().optional(),
			solution: z.string().optional(),
			result: z.string().optional(),
			// Pillar slugs: digital-products-commerce | brand-visual-strategy |
			// corporate-communications | community-social-impact
			pillars: z.array(z.string()).optional(),
			author: z.object({
				name: z.string(),
				link: z.string(),
			}),
			image: z.object({
				source: image(),
				alt: z.string(),
			}),
		}),
});


const authorsCollection = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/authors" }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			description: z.string(),
			image: z.object({
				source: image(),
				alt: z.string(),
			}),
		}),
});

export const collections = {
	posts: postsCollection,
	projects: projectsCollection,
	authors: authorsCollection,
};
