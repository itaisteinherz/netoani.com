import Typography from "typography";
import FairyGates from "typography-theme-fairy-gates";

FairyGates.overrideThemeStyles = () => {
	return {
		"a.gatsby-resp-image-link": {
			// Remove the weird line under linked images
			backgroundImage: "none"
		},
		"div.gatsby-highlight": {
			fontSize: "0.8em",
			marginBottom: typography.rhythm(1)
		},
		blockquote: {
			borderLeftWidth: "5px",
			fontSize: "1.05em"
		},
		"blockquote > ul": {
			marginLeft: typography.rhythm(4 / 5)
		},
		details: {
			marginBottom: typography.rhythm(1)
		},
		"details > summary": {
			fontWeight: "bold",
			marginBottom: typography.rhythm(1 / 4)
		},
		"details > *:last-child": {
			marginBottom: 0
		},
		// Make code links look like links
		"a > code[class*=language-]": {
			color: "inherit",
			textDecoration: "underline"
		},
		"a > code[class*=language-]:hover": {
			textDecoration: "none"
		}
	};
};

delete FairyGates.googleFonts;

const options = {
	...FairyGates,
	googleFonts: [
		{
			name: "Inter",
			styles: ["400", "400i", "600", "700"]
		}
	],
	headerFontFamily: ["Inter", "sans-serif"],
	bodyFontFamily: ["Inter", "sans-serif"],
	baseLineHeight: 1.8
};

const typography = new Typography(options);

// Hot reload typography in development
if (process.env.NODE_ENV !== "production") {
	typography.injectStyles();
}

export default typography;
export const {rhythm, scale} = typography;
