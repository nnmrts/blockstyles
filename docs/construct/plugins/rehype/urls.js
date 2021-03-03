/* eslint import/no-extraneous-dependencies: off */

import map from "unist-util-map";
import has from "hast-util-has-property";

/**
 * @param callback
 * @example
 */
const urls = (callback) => (tree) => map(tree, (node) => {
	const newNode = {
		...node
	};

	for (const property of ["href", "src"]) {
		if (has(newNode, property)) {
			const {
				properties: {
					[property]: url
				}
			} = newNode;

			newNode.properties[property] = callback(url);
		}
	}

	return newNode;
});

export default urls;
