import React, {Component} from "react";
import {Link, graphql} from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PageHeading from "../components/page-heading";
import {rhythm} from "../utils/typography";

class BlogPostTemplate extends Component {
	render() {
		const post = this.props.data.markdownRemark;
		const {title, date, description} = post.frontmatter;
		const siteTitle = this.props.data.site.siteMetadata.title;
		const {previous, next} = this.props.pageContext;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO
					title={title}
					description={description || post.excerpt}
				/>
				<PageHeading
					title={title}
					date={date}
				/>
				<div dangerouslySetInnerHTML={{__html: post.html}}/> {/* eslint-disable-line react/no-danger */}
				<hr
					style={{
						marginBottom: rhythm(1)
					}}
				/>
				<Bio />
				{ previous || next ?
					<ul
						style={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "space-between",
							listStyle: "none",
							padding: 0
						}}
					>
						<li>
							{previous ? (
								<Link to={`/blog${previous.fields.slug}`} rel="prev">
									← {previous.frontmatter.title}
								</Link>
							) : null}
						</li>
						<li>
							{next ? (
								<Link to={`/blog${next.fields.slug}`} rel="next">
									{next.frontmatter.title} →
								</Link>
							) : null}
						</li>
					</ul> :
					null}
			</Layout>
		);
	}
}

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
			}
		}
	}
`;
