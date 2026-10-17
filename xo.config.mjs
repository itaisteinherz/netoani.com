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
	{
		files: "package.json",
		rules: {
			"package-json/prefer-type-module": "off",
		},
	},
];

export default xoConfig;
