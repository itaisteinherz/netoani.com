// The site used to register a service worker (gatsby-plugin-offline). Browsers
// that still have it installed fetch this file as its update, which clears its
// caches, unregisters it and reloads open pages so they come from the network.
addEventListener("install", () => {
	globalThis.skipWaiting();
});

addEventListener("activate", event => {
	event.waitUntil((async () => {
		const keys = await caches.keys();
		await Promise.all(keys.map(key => caches.delete(key)));
		await globalThis.registration.unregister();
		const clients = await globalThis.clients.matchAll({type: "window"});
		for (const client of clients) {
			client.navigate(client.url);
		}
	})());
});
