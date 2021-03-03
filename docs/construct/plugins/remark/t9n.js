/* eslint import/no-extraneous-dependencies: off */

import {
	relative
} from "path";

import hast from "hastscript";
import toHtml from "hast-util-to-html";
import beautify from "js-beautify";
import unist from "unist-builder";

import {
	subFolderNames
} from "../../../utilities.js";

import {
	chunkArray
} from "./utilities.js";

const {
	html: beautifyHtml
} = beautify;

const localNameOfLanguage = (languageCode) => {
	const languageName = new Intl.DisplayNames([languageCode], {
		type: "language"
	}).of(languageCode);

	const [first, ...rest] = languageName;

	return `${first.toLocaleUpperCase(languageCode)}${rest.join("")}`;
};

const head = hast("th", {
	colspan: 5
}, [
	hast("a", {
		href: ""
	}, "🌐")
]);

const editColumn = hast("td", {
	rowspan: 0
}, [
	hast("a", {
		href: ""
	}, "✍️")
]);

const defaultLanguagesPerRow = 4;

/**
 * @param options
 * @param options.current
 * @param options.docsPath
 * @param options.languageCodes
 * @example
 */
const t9n = ({
	current,
	docsPath
}) => async(tree) => {
	const {
		children
	} = tree;

	const languageCodes = await subFolderNames(docsPath, ({
		name
	}) => !["construct", "utilities"].includes(name));

	const languagesPerRow = Math.min(languageCodes.length, defaultLanguagesPerRow);

	const t9nHastTree = hast("table", [
		hast("thead", [hast("tr", [head])]),
		hast("tbody", chunkArray(languageCodes, languagesPerRow)
			.map((row, rowIndex) => hast("tr", [
				...Array(languagesPerRow).fill(hast("td"))
					.map((emptyCell, columnIndex) => {
						const languageCode = row[columnIndex];

						return languageCode
							? hast("td", {
								dataCode: languageCode
							}, languageCode === current
								? [hast("strong", localNameOfLanguage(languageCode))]
								: [
									hast("a", {
										href: relative(`${docsPath}/${current}/readme`, `${docsPath}/${languageCode}/readme.md`)
									}, localNameOfLanguage(languageCode))
								])
							: emptyCell;
					}),
				...rowIndex === 0
					? [editColumn]
					: []
			])))
	]);

	const t9nHtml = beautifyHtml(toHtml(t9nHastTree), {
		indent_with_tabs: true,
		inline: []
	});

	const t9nTree = unist("html", t9nHtml);

	return {
		...tree,
		children: [t9nTree, ...children]
	};
};

export default t9n;
