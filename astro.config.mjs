import {defineConfig} from "astro/config";
import {transformerMetaHighlight} from "@shikijs/transformers";

export default defineConfig({
	site: "https://netoani.com",
	markdown: {
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark-dimmed",
			},
			// Follows the page's color-scheme, which the theme toggle sets
			defaultColor: "light-dark()",
			// Highlights the lines listed in a code fence's meta, e.g. ```python {1,3-4}
			transformers: [transformerMetaHighlight()],
		},
	},
});
