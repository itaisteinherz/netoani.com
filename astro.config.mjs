import {defineConfig} from "astro/config";
import {transformerMetaHighlight} from "@shikijs/transformers";

export default defineConfig({
	site: "https://netoani.com",
	markdown: {
		shikiConfig: {
			themes: {
				light: "vitesse-light",
				dark: "vitesse-dark",
			},
			// Highlights the lines listed in a code fence's meta, e.g. ```python {1,3-4}
			transformers: [transformerMetaHighlight()],
		},
	},
});
