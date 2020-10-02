import React, {Component} from "react";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PageHeading from "../components/page-heading";
import ProjectsPageContent from "../../content/projects-page/index.mdx";

class ProjectsPage extends Component {
	render() {
		const {data} = this.props;
		const siteTitle = data.site.siteMetadata.title;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO
					title={siteTitle}
					description="A page listing some of Itai Steinherz's projects."
				/>
				<PageHeading title="Projects"/>
				<ProjectsPageContent/>
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
