import React from "react";
import gray from "gray-percentage";
import {rhythm, scale} from "../utils/typography";

function PageHeading({title, date, datePrefix = ""}) {
	return (
		<div>
			<h3
				style={{
					display: "block",
					...scale(-2 / 5),
					lineHeight: 1,
					fontWeight: 500,
					color: gray(45),
					marginTop: rhythm(1),
					marginBottom: rhythm(1 / 5)
				}}
			>
				{datePrefix}{date}
			</h3>
			<h1
				style={{
					fontSize: scale(6 / 5).fontSize,
					marginTop: 0,
					marginBottom: rhythm(1)
				}}
			>
				{title}
			</h1>
		</div>
	);
}

export default PageHeading;
