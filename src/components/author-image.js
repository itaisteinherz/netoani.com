import React from "react";
import {StaticImage} from "gatsby-plugin-image";

const AuthorImage = () => {
	return (
		<StaticImage
			layout="fixed"
			formats={["auto", "webp", "avif"]}
			src="../../content/assets/profile-pic.jpg"
			width={400}
			height={400}
			quality={100}
			alt="Profile picture"
			imgStyle={{
				borderRadius: "100%",
				width: "100px",
				height: "100px"
			}}
			style={{
				borderRadius: "100%",
				width: "100px",
				height: "100px"
			}}
		/>
	);
};

export default AuthorImage;
