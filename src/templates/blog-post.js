import React from "react";
import {Link, graphql} from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import PageHeading from "../components/page-heading";
import {rhythm} from "../utils/typography";

const BlogPostTemplate = ({data, location}) => {
	const post = data.markdownRemark;
	const siteTitle = data.site.siteMetadata?.title;

	const {title, date, description} = post.frontmatter;

	const {previous, next} = data;

	return (
		<Layout location={location} title={siteTitle}>
			<Seo
				title={title}
				description={description || post.excerpt}
			/>
			<article
				itemScope
				itemType="http://schema.org/Article"
			>
				<PageHeading
					title={title}
					date={date}
				/>
				<section
					dangerouslySetInnerHTML={{__html: post.html}} // eslint-disable-line react/no-danger
					itemProp="articleBody"
				/>
				<hr
					style={{
						marginBottom: rhythm(1)
					}}
				/>
				<footer>
					<Bio/>
				</footer>
			</article>
			<nav>
				<ul
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-between",
						listStyle: "none",
						margin: `0 0 ${rhythm(1)}`,
						padding: 0
					}}
				>
					<li
						style={{
							marginRight: rhythm(1.5)
						}}
					>
						{previous ? (
							<Link to={`/blog${previous.fields.slug}`} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						) : null}
					</li>
					<li
						style={{
							marginLeft: "auto"
						}}
					>
						{next ? (
							<Link to={`/blog${next.fields.slug}`} rel="next">
								{next.frontmatter.title} →
							</Link>
						) : null}
					</li>
				</ul>
			</nav>
		</Layout>
	);
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug(
		$id: String!
		$previousPostId: String
		$nextPostId: String
	) {
		site {
			siteMetadata {
				title
				author
			}
		}

		markdownRemark(id: { eq: $id }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
			}
		}

		previous: markdownRemark(id: { eq: $previousPostId }) {
			fields {
				slug
			}
			frontmatter {
				title
			}
		}

		next: markdownRemark(id: { eq: $nextPostId }) {
			fields {
				slug
			}
			frontmatter {
				title
			}
		}
	}
`;
