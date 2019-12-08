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
		"blockquote": {
			borderLeftWidth: "5px",
			fontSize: "1.05em"
		},
		"blockquote > ul": {
			marginLeft: "1.2em"
		}
	};
};

delete FairyGates.googleFonts;

const options = {...FairyGates, baseLineHeight: 1.5};

const typography = new Typography(options);

// Hot reload typography in development
if (process.env.NODE_ENV !== "production") {
	typography.injectStyles();
}

export default typography;
export const {rhythm} = typography;
export const {scale} = typography;
