import Typography from "typography";
import FairyGates from "typography-theme-fairy-gates";

FairyGates.overrideThemeStyles = () => {
	return {
		"a.gatsby-resp-image-link": {
			backgroundImage: "none" // Removes the weird line under linked images
		},
		"div.gatsby-highlight": {
			fontSize: "0.8em",
			marginBottom: typography.rhythm(1)
		},
		blockquote: {
			lineHeight: 1.5
		}
	};
};

delete FairyGates.googleFonts;

const typography = new Typography(FairyGates);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
	typography.injectStyles();
}

export default typography;
export const {rhythm} = typography;
export const {scale} = typography;
