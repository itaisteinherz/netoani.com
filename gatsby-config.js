const path = require("path");

/* eslint-disable camelcase */
module.exports = {
	siteMetadata: {
		title: "netoani.com",
		author: "Itai Steinherz",
		description: "Itai Steinherz's personal website",
		siteUrl: "https://netoani.com",
		social: {
			twitter: "https://twitter.com/itaisteinherz",
			github: "https://github.com/itaisteinherz",
			email: "mailto:itai.steinherz@gmail.com"
		}
	},
	plugins: [
		"gatsby-plugin-image",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: path.join(__dirname, "content", "blog"),
				name: "blog"
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: path.join(__dirname, "content", "assets"),
				name: "assets"
			}
		},
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					"gatsby-remark-images",
					{
						resolve: "gatsby-remark-responsive-iframe",
						options: {
							wrapperStyle: "margin-bottom: 1.0725rem"
						}
					},
					"gatsby-remark-prismjs",
					"gatsby-remark-copy-linked-files",
					"gatsby-remark-smartypants"
				]
			}
		},
		"gatsby-plugin-mdx",
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",
		{
			resolve: "gatsby-plugin-google-analytics",
			options: {
				trackingId: "UA-142187776-1",
				respectDNT: true
			}
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
					{
						site {
							siteMetadata {
								title
								description
								siteUrl
								site_url: siteUrl
							}
						}
					}
				`,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.nodes.map(node => {
								return Object.assign({}, node.frontmatter, {
									description: node.excerpt,
									date: node.frontmatter.date,
									url: site.siteMetadata.siteUrl + node.fields.slug,
									guid: site.siteMetadata.siteUrl + node.fields.slug,
									custom_elements: [{
										"content:encoded": node.html
									}]
								});
							});
						},
						query: `
							{
								allMarkdownRemark(
									sort: { order: DESC, fields: [frontmatter___date] },
								) {
									nodes {
										excerpt
										html
										fields {
											slug
										}
										frontmatter {
											title
											date
										}
									}
								}
							}
						`,
						output: "/rss.xml",
						title: "netoani.com",
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Itai Steinherz's personal blog",
				short_name: "netoani.com",
				start_url: "/",
				background_color: "#ffffff",
				theme_color: "#4b9d87",
				display: "minimal-ui",
				// TODO: Create a normal favicon for the website
				icon: "content/assets/profile-pic.jpg"
			}
		},
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-offline",
		{
			resolve: "gatsby-plugin-typography",
			options: {
				pathToConfigModule: "src/utils/typography"
			}
		}
	]
};
/* eslint-enable camelcase */
