import React, {Component} from "react";
import {Link, graphql} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import {rhythm} from "../utils/typography";

const PAGE_TITLE = "Blog";

class Blog extends Component {
	render() {
		const {data} = this.props;
		const siteTitle = data.site.siteMetadata.title;
		const posts = data.allMarkdownRemark.edges;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title={PAGE_TITLE} />
				{posts.map(({node}) => {
					const title = node.frontmatter.title || node.fields.slug;
					return (
						<div key={node.fields.slug}>
							<h2
								style={{
									marginBottom: rhythm(1 / 2)
								}}
							>
								<Link
									style={{boxShadow: "none"}}
									to={`/blog${node.fields.slug}`}
								>
									{title}
								</Link>
							</h2>
							<small>{node.frontmatter.date}</small>
							<p
								dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
									__html: node.frontmatter.description || node.excerpt
								}}
							/>
						</div>
					);
				})}
			</Layout>
		);
	}
}

export default Blog;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
					}
				}
			}
		}
	}
`;
