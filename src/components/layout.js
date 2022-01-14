import React from "react";
import {Link} from "gatsby";

import SiteNav from "./site-nav";
import {rhythm, scale} from "../utils/typography";

const Layout = ({title, children}) => {
	return (
		<div
			style={{
				marginLeft: "auto",
				marginRight: "auto",
				maxWidth: rhythm(24),
				padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
			}}
		>
			<header
				style={{
					display: "flex",
					alignItems: "baseline",
					justifyContent: "space-between",
					flexWrap: "wrap",
					marginBottom: rhythm(2)
				}}
			>
				<h1
					style={{
						...scale(1 / 4),
						marginTop: 0,
						marginRight: rhythm(1),
						marginBottom: 0
					}}
				>
					<Link
						style={{
							color: "inherit"
						}}
						to="/"
					>
						{title}
					</Link>
				</h1>
				<SiteNav/>
			</header>
			<main>{children}</main>
		</div>
	);
};

export default Layout;
