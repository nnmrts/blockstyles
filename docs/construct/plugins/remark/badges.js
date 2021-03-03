/* eslint import/no-extraneous-dependencies: off */

import unist from "unist-builder";

import {
	join
} from "./utilities.js";

const buildBadgeUrl = (endpoint, parameters) => {
	const parametersString = Object.entries({
		color: "00f",
		labelColor: "d07",
		...parameters
	})
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join("&");

	const query = `${endpoint.includes("?") ? "&" : "?"}${parametersString}`;

	const protocol = "https://";
	const badgesDomain = "badgen.net";

	return `${protocol + badgesDomain}/${endpoint}${query}`;
};

/**
 * @param options
 * @param entries
 * @param groups
 * @example
 */
const badges = (groups) => (tree) => {
	const {
		children
	} = tree;

	const badgeParagraphs = groups.map(
		(group) => unist("paragraph", join(
			group.map(
				(entry) => {
					const {
						endpoint,
						icon,
						label,
						link,
						name
					} = entry;

					return unist("link", {
						url: link
					}, [
						unist("image", {
							alt: name,
							url: buildBadgeUrl(endpoint, {
								icon,
								label
							})
						})
					]);
				}
			), unist("text", "\n")
		))
	);

	return {
		...tree,
		children: [...badgeParagraphs, ...children]
	};
};

export default badges;
