import React, {Component} from "react";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Bio from "../components/bio";
import AuthorImage from "../components/author-image";
import {rhythm} from "../utils/typography";

class Homepage extends Component {
	render() {
		const {data} = this.props;
		const {title} = data.site.siteMetadata;

		return (
			<Layout location={this.props.location} title={title}>
				<SEO title={title}/>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						textAlign: "center"
					}}
				>
					<Bio/>
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
