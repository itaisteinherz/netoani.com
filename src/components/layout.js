import React, {Component} from "react";
import {Link} from "gatsby";

import SiteNav from "./site-nav";
import {rhythm, scale} from "../utils/typography";

class Layout extends Component {
	render() {
		const {location, title, children} = this.props;
		const rootPath = `${__PATH_PREFIX__}/`; // eslint-disable-line no-undef
		let siteHeader;

		if (location.pathname === rootPath) {
			siteHeader = (
				<h1
					style={{
						...scale(1.5),
						marginTop: 0,
						marginRight: rhythm(3),
						marginBottom: rhythm(1)
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
			);
		} else {
			siteHeader = (
				<h3
					style={{
						...scale(1 / 2),
						marginTop: 0,
						marginRight: rhythm(2),
						marginBottom: rhythm(0.5)
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
				</h3>
			);
		}

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
						flexWrap: "wrap"
					}}
				>
					{siteHeader}
					<SiteNav location={location}/>
				</header>
				<main>{children}</main>
			</div>
		);
	}
}

export default Layout;
