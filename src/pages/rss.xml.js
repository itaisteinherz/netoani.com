import rss from "@astrojs/rss";
import {site} from "../site.js";
import {getPosts, postUrl} from "../posts.js";

export const GET = async context => {
	const posts = await getPosts();

	return rss({
		title: site.title,
		description: site.description,
		site: context.site,
		items: posts.toReversed().map(post => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: postUrl(post),
			content: post.rendered?.html,
		})),
	});
};
