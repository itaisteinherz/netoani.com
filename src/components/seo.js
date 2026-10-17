/**
 SEO component for Gatsby's Head API that queries for data with
 Gatsby's useStaticQuery React hook

 See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

import {useStaticQuery, graphql} from "gatsby";

const Seo = ({description = "", title}) => {
	const {site} = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						social {
							twitter
						}
					}
				}
			}
		`,
	);

	const metaDescription = description || site.siteMetadata.description;
	const defaultTitle = site.siteMetadata?.title;

	return (
		<>
			<title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
			<meta name="description" content={metaDescription}/>
			<meta property="og:title" content={title}/>
			<meta property="og:description" content={metaDescription}/>
			<meta property="og:type" content="website"/>
			<meta name="twitter:card" content="summary"/>
			<meta name="twitter:creator" content={site.siteMetadata?.social?.twitter || ""}/>
			<meta name="twitter:title" content={title}/>
			<meta name="twitter:description" content={metaDescription}/>
		</>
	);
};

export default Seo;
