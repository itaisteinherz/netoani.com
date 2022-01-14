import React from "react";
import gray from "gray-percentage";
import {rhythm, scale} from "../utils/typography";

const StyledDate = ({date, datePrefix = ""}) => {
	return (
		<h3
			style={{
				...scale(-2 / 5),
				display: "block",
				lineHeight: 1,
				fontWeight: 500,
				color: gray(45),
				marginTop: 0,
				marginBottom: rhythm(1 / 5)
			}}
		>
			{datePrefix}{date}
		</h3>
	);
};

export default StyledDate;
