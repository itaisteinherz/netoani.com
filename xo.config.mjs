import globals from "globals";
import xoReact from "eslint-config-xo-react";

/**
@type {import('xo').FlatXoConfig}
*/
const xoConfig = [
	...xoReact(),
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			"@stylistic/quotes": [
				"error",
				"double",
			],
			"@stylistic/jsx-quotes": [
				"error",
				"prefer-double",
			],
			"unicorn/filename-case": "off",
			// Gatsby's config files are CommonJS, and webpack resolves imports without extensions
			"unicorn/prefer-module": "off",
			"n/file-extension-in-import": "off",
			// Keep the existing code style
			"unicorn/default-export-style": "off",
			"n/prefer-process-get-builtin-module": "off",
		},
	},
	// Gatsby's development server lints src/ with its own ESLint setup, which
	// fails on disable comments for rules it doesn't know, so per-file
	// exceptions live here instead
	{
		files: "gatsby-browser.js",
		rules: {
			// Fonts and styles are imported for their side effects
			"import-x/no-unassigned-import": "off",
		},
	},
	{
		files: ["src/pages/index.js", "src/templates/blog-post.js"],
		rules: {
			// Post HTML is rendered from Markdown at build time
			"@eslint-react/dom-no-dangerously-set-innerhtml": "off",
		},
	},
	{
		files: "src/utils/typography.js",
		rules: {
			// Webpack replaces process.env.NODE_ENV at build time
			"n/prefer-global/process": "off",
		},
	},
	{
		files: "package.json",
		rules: {
			"package-json/prefer-type-module": "off",
		},
	},
];

export default xoConfig;
