/* eslint import/no-extraneous-dependencies: off */

import {
	relative
} from "path";

import markdownlintSync from "markdownlint";
import {
	applyFixes
} from "markdownlint-rule-helpers";

const {
	promises: {
		markdownlint,
		readConfig
	}
} = markdownlintSync;

/**
 * @param options
 * @param options.configPath
 * @param options.fix
 * @param options.path
 * @param options.text
 * @example
 */
const lintMarkdown = async({
	configPath,
	fix = true,
	path,
	text
}) => {
	const config = await readConfig(configPath);

	const errors = (await markdownlint({
		config,
		resultVersion: 3,
		strings: {
			readme: text
		}
	})).readme;

	const unfixableErrors = errors.filter((error) => !error.fixInfo);

	const lintErrors = [];

	for (const {
		lineNumber,
		ruleDescription,
		ruleInformation,
		ruleNames
	} of fix ? unfixableErrors : errors) {
		lintErrors.push(`${relative(process.cwd(), path)}, line ${lineNumber} - ${ruleNames[0]}: ${ruleDescription} (${ruleInformation})`);

		return lintErrors;
	}

	if (fix) {
		const fixableErrors = errors.filter((error) => error.fixInfo);

		const fixedText = applyFixes(text, fixableErrors);

		return fixedText;
	}

	return undefined;
};

export default lintMarkdown;
