import React, {Component} from "react";
import {Link, graphql} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import {rhythm} from "../utils/typography";

class Homepage extends Component {
	render() {
		const {data} = this.props;
		const siteTitle = data.site.siteMetadata.title;
 		const posts = data.allMarkdownRemark.edges;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title={siteTitle}/>
				<div
					style={{
						marginTop: rhythm(1)
					}}
				>
					<Bio/>
				</div>

				{/* TODO: Place these in a container div, and create a component for a blogpost row */}
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

export default Homepage;

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
