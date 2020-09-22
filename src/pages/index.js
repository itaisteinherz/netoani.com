import React, {Component} from "react";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import AuthorImage from "../components/author-image";
import {rhythm} from "../utils/typography";

class Homepage extends Component {
	render() {
		const {data} = this.props;
		const {title, author, social} = data.site.siteMetadata;

		return (
			<Layout location={this.props.location} title={title}>
				<SEO title={title}/>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						textAlign: "center",
						marginTop: rhythm(6) // TODO: Find a way to properly center this.
					}}
				>
					<div
						style={{
							marginRight: rhythm(1 / 2)
						}}
					>
						<AuthorImage />
					</div>
					<p
						style={{
							marginTop: rhythm(1)
						}}
					>
						I&apos;m <strong>{author}</strong>, a software developer from Israel.
						You can follow me on
						{" "}
						<a href={`https://twitter.com/${social.twitter}`}>
							Twitter
						</a>
						{" "}
						and
						{" "}
						<a href={`https://github.com/${social.github}`}>
							GitHub
						</a>,
						or read more about me
						{" "}
						<Link
							to="/about"
						>
							here
						</Link>.
					</p>
				</div>
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
				author
				social {
					twitter
					github
				}
			}
		}
	}
`;
