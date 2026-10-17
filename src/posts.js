import {getCollection} from "astro:content";

// Oldest first
export const getPosts = async () => {
	const posts = await getCollection("blog");
	return posts.toSorted((a, b) => a.data.date - b.data.date);
};

export const postUrl = post => `/blog/${post.id}/`;

const dateFormat = new Intl.DateTimeFormat("en-US", {
	month: "long",
	day: "2-digit",
	year: "numeric",
	timeZone: "UTC",
});

export const formatDate = date => dateFormat.format(date);
