import React, {Component} from "react";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
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
