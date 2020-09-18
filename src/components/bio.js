/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import {StaticQuery, graphql, Link} from "gatsby";

import AuthorImage from "./author-image";
import {rhythm} from "../utils/typography";

function Bio({isFullPage = false}) {
	return (
		<StaticQuery
			query={bioQuery}
			render={data => {
				const {author, social} = data.site.siteMetadata;

				return (
					<div
						style={{
							display: "flex",
							...(isFullPage ? { // TODO: Create a separate component for the full page bio instead of doing this.
								flexDirection: "column",
								alignItems: "center",
								textAlign: "center"
							} : {}),
							marginBottom: rhythm(1)
						}}
					>
						<div
							style={{
								marginRight: rhythm(1 / 2)
							}}
						>
							<AuthorImage />
						</div>
						<p
							style={{
								// Center text verticallly (relative to the image) - http://jsfiddle.net/Mori/Qtng7
								marginTop: "auto",
								marginBottom: "auto",
								...(isFullPage ? {
									marginTop: rhythm(1)
								} : {})
							}}
						>
							I&apos;m <strong>{author}</strong>, a software developer from Israel.
							You can follow me on
							{" "}
							<a href={`https://twitter.com/${social.twitter}`}>
								Twitter
							</a>
							{" "}
							and
							{" "}
							<a href={`https://github.com/${social.github}`}>
								GitHub
							</a>,
							or read more about me
							{" "}
							<Link
								to="/about"
							>
								here
							</Link>.
						</p>
					</div>
				);
			}}
		/>
	);
}

const bioQuery = graphql`
	query BioQuery {
		site {
			siteMetadata {
				author
				social {
					twitter
					github
				}
			}
		}
	}
`;

export default Bio;
