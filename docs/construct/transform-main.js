/* eslint import/no-extraneous-dependencies: off */

import reporter from "vfile-reporter-pretty";

import lintMarkdown from "./lint-markdown.js";

/**
 * @param options
 * @param options.markdownlintConfigPath
 * @param options.path
 * @param options.processor
 * @param options.text
 * @example
 */
const transform = async({
	markdownlintConfigPath,
	path,
	processor,
	text
}) => {
	const readmeResult = await processor
		.process({
			contents: text,
			path
		});

	const report = reporter([readmeResult]);

	if (report.length > 0) {
		console.error(report);
	}

	let {
		contents: newText
	} = readmeResult;

	newText = await lintMarkdown({
		configPath: markdownlintConfigPath,
		path,
		text: newText
	});

	return newText;
};

export default transform;
