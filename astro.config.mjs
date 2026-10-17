import {defineConfig} from "astro/config";
import {transformerMetaHighlight} from "@shikijs/transformers";

export default defineConfig({
	site: "https://netoani.com",
	markdown: {
		shikiConfig: {
			theme: "github-light",
			// Highlights the lines listed in a code fence's meta, e.g. ```python {1,3-4}
			transformers: [transformerMetaHighlight()],
		},
	},
});
