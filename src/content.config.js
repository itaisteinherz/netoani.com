import {defineCollection} from "astro:content";
import {glob} from "astro/loaders";
import {z} from "astro/zod";

const blog = defineCollection({
	loader: glob({pattern: "*/index.md", base: "./content/blog"}),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string(),
	}),
});

export const collections = {blog};
