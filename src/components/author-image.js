import React from "react";
import {StaticQuery, graphql} from "gatsby";
import Image from "gatsby-image";

function AuthorImage() {
	return (
		<StaticQuery
			query={authorImageQuery}
			render={data => {
				const {author} = data.site.siteMetadata;

				return (
					<Image
						fixed={data.avatar.childImageSharp.fixed}
						alt={author}
						style={{
							margin: 0,
							maxHeight: 100,
							minWidth: 100,
							maxWidth: 100,
							borderRadius: "100%"
						}}
						imgStyle={{
							borderRadius: "50%"
						}}
					/>
				);
			}}
		/>
	);
}

const authorImageQuery = graphql`
	query AuthorImageQuery {
		avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
			childImageSharp {
				fixed(width: 400, height: 400) {
					...GatsbyImageSharpFixed
				}
			}
		}
		site {
			siteMetadata {
				author
			}
		}
	}
`;

export default AuthorImage;
