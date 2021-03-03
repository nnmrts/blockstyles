/* eslint import/no-extraneous-dependencies: off */

import hast from "hastscript";
import toHtml from "hast-util-to-html";
import beautify from "js-beautify";
import unist from "unist-builder";

const {
	html: beautifyHtml
} = beautify;

/**
 * @param options
 * @param options.alt
 * @param options.link
 * @param options.src
 * @example
 */
const logo = ({
	alt,
	link,
	src
}) => (tree) => {
	const {
		children
	} = tree;

	const logoHastTree = hast("h1", {
		align: "center"
	}, [
		hast("a", {
			href: link
		}, [
			hast("img", {
				...{
					alt: "The logo of the project.",
					decoding: "async",
					height: 200,
					loading: "lazy"
				},
				...{
					alt,
					src
				}
			})
		])
	]);

	const logoHtml = beautifyHtml(toHtml(logoHastTree), {
		indent_with_tabs: true,
		inline: []
	});

	const logoTree = unist("html", logoHtml);

	return {
		...tree,
		children: [logoTree, ...children]
	};
};

export default logo;
