import React from "react";
import {StaticImage} from "gatsby-plugin-image";

const AuthorImage = () => {
	return (
		<StaticImage
			layout="fixed"
			formats={["auto", "webp", "avif"]}
			src="../../content/assets/profile-pic.jpg"
			width={100}
			height={100}
			quality={95}
			alt="Profile picture"
			style={{
				borderRadius: "50%"
			}}
		/>
	);
};

export default AuthorImage;
