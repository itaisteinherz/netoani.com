import {graphql} from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import PageHeading from "../components/page-heading";

const NotFoundPage = ({data, location}) => {
	const siteTitle = data.site.siteMetadata.title;

	return (
		<Layout location={location} title={siteTitle}>
			<PageHeading title="Not Found"/>
			<p>
				You just hit a route that doesn&#39;t exist <span role="img" aria-label="sad">😕</span>
			</p>
		</Layout>
	);
};

export default NotFoundPage;

export const Head = () => <Seo title="404: Not Found"/>;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
