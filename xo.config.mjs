import globals from "globals";
import astroPlugin from "eslint-plugin-astro";

/**
@type {import('xo').FlatXoConfig}
*/
const xoConfig = [
	...astroPlugin.configs.recommended,
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
		},
	},
];

export default xoConfig;
