import React, {Component} from "react";
import {Link, graphql} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import IndexPageContent from "../../content/index-page/index.mdx";

import {rhythm} from "../utils/typography";

class Homepage extends Component {
	render() {
		const {data} = this.props;
		const {title} = data.site.siteMetadata;

		return (
			<Layout location={this.props.location} title={title}>
				<SEO title={title} />

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginTop: rhythm(3), // TODO: Find a way to properly center this.
						marginRight: "auto",
						marginLeft: "auto",
						maxWidth: rhythm(20)
					}}
				>
				<IndexPageContent />
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
			}
		}
	}
`;
