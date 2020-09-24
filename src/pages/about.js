import React, {Component} from "react";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PageHeading from "../components/page-heading";
import AboutPageContent from "../../content/about-page/index.mdx";

const PAGE_TITLE = "About";
// TODO: Automatically format the date using the same format as the one used in `blog-post.js` (instead of manually
// doing it).
const LAST_UPDATED_ON = "September 05, 2020";

class AboutPage extends Component {
	render() {
		const {data} = this.props;
		const {title} = data.site.siteMetadata;

		return (
			<Layout location={this.props.location} title={title}>
				<SEO
					title={PAGE_TITLE}
					description="About page explaining who Itai Steinherz is."
				/>
				<PageHeading
					title={PAGE_TITLE}
					date={LAST_UPDATED_ON}
					datePrefix="Last updated: "
				/>
				<AboutPageContent/>
			</Layout>
		);
	}
}

export default AboutPage;

export const pageQuery = graphql`
    query {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
