const path = require("path");
const {createFilePath} = require("gatsby-source-filesystem");

exports.createPages = async ({graphql, actions}) => {
	const {createPage} = actions;

	// Define a template for blog post
	const blogPost = path.resolve("./src/templates/blog-post.js");

	// Get all markdown blog posts sorted by date
	const result = await graphql(
		`
			{
				allMarkdownRemark(
					sort: { fields: [frontmatter___date], order: DESC }
					limit: 1000
				) {
					nodes {
						id
						fields {
							slug
						}
					}
				}
			}
		`
	);

	if (result.errors) {
		reporter.panicOnBuild( // eslint-disable-line no-undef
			"Failed to load blogposts",
			result.errors
		);

		return;
	}

	const posts = result.data.allMarkdownRemark.nodes;

	// Create blog posts pages
	// But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
	// `context` is available in the template as a prop and as a variable in GraphQL

	if (posts.length > 0) {
		posts.forEach((post, index) => {
			// Note: these have been logically reversed because the posts are ordered from latest to oldest, but we
			// want the previous post to be the older post and the next post to be the newer one.
			const previousPostId = index === posts.length - 1 ? null : posts[index + 1].id;
			const nextPostId = index === 0 ? null : posts[index - 1].id;

			createPage({
				path: path.join("/blog", post.fields.slug),
				component: blogPost,
				context: {
					id: post.id,
					previousPostId,
					nextPostId
				}
			});
		});
	}
};

exports.onCreateNode = ({node, actions, getNode}) => {
	const {createNodeField} = actions;

	if (node.internal.type === "MarkdownRemark") {
		const value = createFilePath({node, getNode});

		createNodeField({
			name: "slug",
			node,
			value
		});
	}
};

exports.createSchemaCustomization = ({actions}) => {
	const {createTypes} = actions;

	// Explicitly define the siteMetadata {} object
	// This way those will always be defined even if removed from gatsby-config.js

	// Also explicitly define the Markdown frontmatter
	// This way the "MarkdownRemark" queries will return `null` even when no
	// blog posts are stored inside "content/blog" instead of returning an error
	createTypes(`
		type SiteMetadata {
			title: String
			description: String
			author: Author
			siteUrl: String
			social: Social
		}

		type Author {
			name: String
			summary: String
		}

		type Social {
			twitter: String
			github: String
			email: String
		}

		type MarkdownRemark implements Node {
			excerpt: String
			frontmatter: Frontmatter
			fields: Fields
		}

		type Frontmatter {
			title: String
			description: String
			date: Date @dateformat
		}

		type Fields {
			slug: String
		}
	`);
};
