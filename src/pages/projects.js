import React, {Component} from "react";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

class ProjectsPage extends Component {
	render() {
		const {data} = this.props;
		const siteTitle = data.site.siteMetadata.title;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title={siteTitle} />

				TODO: Add some stuff here...
			</Layout>
		);
	}
}

export default ProjectsPage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
