import React from "react";
import StyledDate from "../components/styled-date";
import {rhythm, scale} from "../utils/typography";

function PageHeading({title, date = null, datePrefix = ""}) {
	return (
		<div>
			{date ? 
				<StyledDate date={date} datePrefix={datePrefix}/>
			: null}
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
