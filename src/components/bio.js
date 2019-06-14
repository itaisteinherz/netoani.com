/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import {StaticQuery, graphql} from "gatsby";
import Image from "gatsby-image";

import {rhythm} from "../utils/typography";

function Bio() {
	return (
		<StaticQuery
			query={bioQuery}
			render={data => {
				const {author, social} = data.site.siteMetadata;
				return (
					<div
						style={{
							display: "flex",
							marginBottom: rhythm(1)
						}}
					>
						<Image
							fixed={data.avatar.childImageSharp.fixed}
							alt={author}
							style={{
								marginRight: rhythm(1 / 2),
								marginBottom: 0,
								maxWidth: 50,
								maxHeight: 50,
								borderRadius: "100%"
							}}
							imgStyle={{
								borderRadius: "50%"
							}}
						/>
						<p>
                            Written by <strong>{author}</strong>, a 16 y/o student and software developer from Israel.
                            You should follow him on
							{" "}
							<a href={`https://twitter.com/${social.twitter}`}>
                                 Twitter
							</a>
							{" "}
                            and on
							{" "}
							<a href={`https://github.com/${social.github}`}>
                                GitHub
							</a>.
						</p>
					</div>
				);
			}}
		/>
	);
}

const bioQuery = graphql`
    query BioQuery {
        avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
            childImageSharp {
                fixed(width: 100, height: 100) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        site {
            siteMetadata {
                author
                social {
                    twitter
                }
            }
        }
    }
`;

export default Bio;