import React from "react";
import {Link} from "gatsby";

import {rhythm} from "../utils/typography";

function NavItem({title, path, location}) {
	return (
		<div
			style={{
				marginLeft: rhythm(1)
			}}
		>
			{location.pathname === path ? (
				<span
					style={{
						opacity: 0.5
					}}
				>
					{title}
				</span>
			) : (
				<Link
					to={path}
				>
					{title}
				</Link>
			)}
		</div>
	);
}

function SiteNav({location}) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "flex-end",
				flexGrow: 1,
				marginBottom: rhythm(0.5)
			}}
		>
			<NavItem title="Blog" path="/blog" location={location} />
			<NavItem title="Projects" path="/projects" location={location} />
		</div>
	);
}

export default SiteNav;
