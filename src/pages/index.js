import React from "react";
import {Link, graphql} from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Bio from "../components/bio";
import StyledDate from "../components/styled-date";
import {rhythm} from "../utils/typography";

const Homepage = ({data, location}) => {
	const siteTitle = data.site.siteMetadata?.title;
	const posts = data.allMarkdownRemark.nodes;

	if (posts.length === 0) {
		return (
			<Layout location={location} title={siteTitle}>
				<Seo title="All posts"/>
				<Bio/>
				<p>
					No blog posts found. Add markdown posts to&nbsp;
					<pre
						style={{
							display: "inline-block"
						}}
					>
						content/blog
					</pre>
					.
				</p>
			</Layout>
		);
	}

	return (
		<Layout location={location} title={siteTitle}>
			<Seo title="All posts"/>
			<Bio/>
			<hr
				style={{
					marginBottom: 0
				}}
			/>

			{/* TODO: Create a component for a blogpost row */}
			<ol
				style={{
					listStyle: "none",
					margin: 0,
					padding: 0
				}}
			>
				{posts.map(post => {
					const title = post.frontmatter.title || post.fields.slug;

					return (
						<li
							key={post.fields.slug}
							style={{
								marginTop: rhythm(1)
							}}
						>
							<article
								itemScope
								itemType="http://schema.org/Article"
							>
								<header>
									<h2
										style={{
											marginBottom: rhythm(1 / 2)
										}}
									>
										<Link
											style={{
												boxShadow: "none"
											}}
											to={`/blog${post.fields.slug}`}
											itemProp="url"
										>
											<span itemProp="headline">{title}</span>
										</Link>
									</h2>
									<div
										style={{
											marginTop: rhythm(1)
										}}
									>
										<StyledDate date={post.frontmatter.date}/>
									</div>
								</header>
								<section>
									<p
										dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
											__html: post.frontmatter.description || post.excerpt
										}}
										itemProp="description"
									/>
								</section>
							</article>
						</li>
					);
				})}
			</ol>
		</Layout>
	);
};

export default Homepage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			nodes {
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
`;
