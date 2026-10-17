/**
 Bio component that queries for data
 with Gatsby's StaticQuery component

 See: https://www.gatsbyjs.org/docs/static-query/
 */

import {useStaticQuery, graphql} from "gatsby";
import {rhythm} from "../utils/typography";
import SocialLink from "./social-link";

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
				marginBottom: rhythm(1),
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
