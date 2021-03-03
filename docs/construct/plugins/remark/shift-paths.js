/* eslint import/no-extraneous-dependencies: off */

import {
	relative,
	resolve,
	dirname
} from "path";

import rehype from "rehype";

import {
	urls
} from "../../plugins.js";

import {
	asyncMap
} from "./utilities.js";

const isPath = (url) => url.startsWith("./") || url.startsWith("../");

const shiftPath = (path, up, fromDirectory, toDirectory) => {
	const absolutePath = resolve(fromDirectory, path);

	const shiftedDirectory = resolve(toDirectory || fromDirectory, "../".repeat(up));

	return relative(shiftedDirectory, absolutePath);
};

const shiftHtml = async(node, {
	match,
	up,
	fromDirectory,
	toDirectory
}) => {
	const {
		value
	} = node;

	const newHtml = (
		await rehype()
			.use(urls, (htmlUrl) => {
				if (isPath(htmlUrl) && htmlUrl.match(match)) {
					return shiftPath(htmlUrl, up, fromDirectory, toDirectory);
				}

				return htmlUrl;
			})
			.use({
				settings: {
					fragment: true
				}
			})
			.process({
				contents: value
			})
	).contents;

	return {
		...node,
		value: newHtml
	};
};

/**
 * @param options
 * @param options.match
 * @param options.up
 * @param options.from
 * @param options.to
 * @example
 */
const shiftPaths = ({
	match,
	up = 0,
	from,
	to
} = {
	up: 0
}) => async(tree, file) => {
	const {
		history: [filePath]
	} = file;

	const fromDirectory = from || dirname(filePath);
	const toDirectory = to || from;

	const newTree = await asyncMap(tree, async(node) => {
		const {
			type,
			url
		} = node;

		let newNode = {
			...node
		};

		switch (type) {
			case "html":
				newNode = await shiftHtml(node, {
					fromDirectory,
					match,
					toDirectory,
					up
				});

				break;
			case "link":
			case "image":
			case "definition":
				if (isPath(url) && url.match(match)) {
					newNode.url = shiftPath(url, up, fromDirectory, toDirectory);
				}

				break;
			default:
				break;
		}

		return newNode;
	});

	return newTree;
};

export default shiftPaths;
