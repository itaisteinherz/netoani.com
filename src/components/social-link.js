import React from "react";
import {useStaticQuery, graphql} from "gatsby";

const SocialLink = ({service, urlPath = "", children}) => {
	const data = useStaticQuery(graphql`
		query SocialLinkQuery {
			site {
				siteMetadata {
					social {
						twitter
						github
						email
					}
				}
			}
		}
	`);

	const social = data.site.siteMetadata?.social;
	const url = social[service] + urlPath;

	return (
		<a href={url}>
			{children}
		</a>
	);
};

export default SocialLink;
