import React, {Component} from "react";
import {graphql} from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import {rhythm} from "../utils/typography";

class Homepage extends Component {
	render() {
		const {data} = this.props;
		const siteTitle = data.site.siteMetadata.title;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title={siteTitle} />
				<div
					style={{
						marginTop: rhythm(6)
					}}
				>
					<Bio isFullPage />
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
