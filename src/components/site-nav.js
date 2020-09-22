import React from "react";
import {Link} from "gatsby";

import {rhythm} from "../utils/typography";

function NavItem({title, path}) {
	return (
		<div
			style={{
				marginLeft: rhythm(1)
			}}
		>
			<Link
				to={path}
			>
				{title}
			</Link>
		</div>
	);
}

function SiteNav({}) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "flex-end",
				flexGrow: 1,
				marginBottom: rhythm(0.5)
			}}
		>
			{/* <NavItem title="Blog" path="/blog"/> */}
			<NavItem title="Projects" path="/projects"/>
		</div>
	);
}

export default SiteNav;
