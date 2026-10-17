/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import {useStaticQuery, graphql} from "gatsby";

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
		<p
			style={{
				marginBottom: rhythm(1)
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
	);
};

export default Bio;
