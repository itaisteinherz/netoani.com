/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import {useStaticQuery, graphql} from "gatsby";

import AuthorImage from "./author-image";
import SocialLink from "../../src/components/social-link";
import {rhythm} from "../utils/typography";

const Bio = () => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			site {
				siteMetadata {
					author
				}
			}
		}
	`);

	const author = data.site.siteMetadata?.author;

	return (
		<div
			style={{
				display: "flex",
				marginBottom: rhythm(1)
			}}
		>
			<div
				style={{
					marginRight: rhythm(1 / 2)
				}}
			>
				<AuthorImage/>
			</div>
			<p
				style={{
					// Center text verticallly (relative to the image) - http://jsfiddle.net/Mori/Qtng7
					marginTop: "auto",
					marginBottom: "auto"
				}}
			>
				I&apos;m <strong>{author}</strong>, a software developer from Israel.
				You can follow me on
				{" "}
				<SocialLink service="twitter">
					Twitter
				</SocialLink>
				{" "}
				and
				{" "}
				<SocialLink service="github">
					GitHub
				</SocialLink>.
			</p>
		</div>
	);
};

export default Bio;
