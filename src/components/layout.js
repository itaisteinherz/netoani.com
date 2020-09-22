import React, {Component} from "react";
import {Link} from "gatsby";

import SiteNav from "./site-nav";
import {rhythm, scale} from "../utils/typography";

class Layout extends Component {
	render() {
		const {title, children} = this.props;

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
					<h1
						style={{
							...scale(5 / 6),
							marginTop: 0,
							marginRight: rhythm(1),
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
					<SiteNav/>
				</header>
				<main>{children}</main>
			</div>
		);
	}
}

export default Layout;
