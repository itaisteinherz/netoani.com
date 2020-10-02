import React from "react";
import {StaticQuery, graphql} from "gatsby";

function SocialLink({service, urlPath = "", children}) {
	return (
		<StaticQuery
			query={socialLinkQuery}
			render={data => {
				const {social} = data.site.siteMetadata;
				const url = social[service] + urlPath;

				return (
					<a href={url}>
						{children}
					</a>
				);
			}}
		/>
	);
}

const socialLinkQuery = graphql`
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
`;

export default SocialLink;
