import {rhythm, scale} from "../utils/typography";
import StyledDate from "./styled-date";

const PageHeading = ({title, date = null, datePrefix = ""}) => (
	<header>
		{date
			? <StyledDate date={date} datePrefix={datePrefix}/>
			: null}
		<h1
			style={{
				fontSize: scale(6 / 5).fontSize,
				marginTop: 0,
				marginBottom: rhythm(1),
			}}
		>
			{title}
		</h1>
	</header>
);

export default PageHeading;
