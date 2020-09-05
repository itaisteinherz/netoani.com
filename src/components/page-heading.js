import React from "react";
import {rhythm, scale} from "../utils/typography";

function PageHeading({title, date, datePrefix = ""}) {
	return (
		<div>
			<h1
				style={{
					marginTop: rhythm(1.5)
				}}
			>
				{title}
			</h1>
			<p
				style={{
					...scale(-1 / 5),
					display: "block",
					marginBottom: rhythm(1),
					marginTop: rhythm(-0.3)
				}}
			>
				{datePrefix}{date}
			</p>
		</div>
	);
}

export default PageHeading;
