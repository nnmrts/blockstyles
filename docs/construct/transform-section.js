/* eslint import/no-extraneous-dependencies: off */

import reporter from "vfile-reporter-pretty";

import lintMarkdown from "./lint-markdown.js";
import {
	createSectionProcessor
} from "./processor.js";

/**
 * @param options
 * @param options.language
 * @param options.markdownlintConfigPath
 * @param options.path
 * @param options.text
 * @example
 */
const transform = async({
	language,
	markdownlintConfigPath,
	path,
	text
}) => {
	const lintErrors = await lintMarkdown({
		configPath: markdownlintConfigPath,
		fix: false,
		path,
		text
	});

	if (lintErrors && lintErrors.length > 0) {
		console.error(`There were lint errors.\n${lintErrors.join("\n")}`);

		process.exit();
	}

	const processor = createSectionProcessor({
		language
	});

	const sectionResult = await processor
		.process({
			contents: text,
			path
		});

	const report = reporter([sectionResult]);

	if (report.length > 0) {
		console.error(report);
	}

	const {
		contents: newText
	} = sectionResult;

	return newText;
};

export default transform;
