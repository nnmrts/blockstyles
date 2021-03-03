/* eslint import/no-extraneous-dependencies: off */

import {
	fileURLToPath
} from "url";
import {
	dirname,
	relative,
	resolve
} from "path";

import remark from "remark";
import contributors from "remark-contributors";
import referenceLinks from "remark-reference-links";
import license from "remark-license";
import validateLinks from "remark-validate-links";

import {
	badges,
	listIndent,
	logo,
	obsolescence,
	shiftHeadings,
	shiftPaths,
	t9n
} from "../plugins.js";

import createPreset from "./preset.js";
import badgeGroups from "./main/badge-groups.js";

const modulePath = fileURLToPath(import.meta.url);

const moduleFolder = dirname(modulePath);

const projectRootPath = resolve(moduleFolder, "../../../");

const docsPath = resolve(projectRootPath, "docs");

/**
 * @param options
 * @param options.language
 * @param options.headings
 * @example
 */
const createProcessor = ({
	language,
	headings
}) => {
	const reversedHeadings = [...headings].reverse();

	const contributorsHeading = reversedHeadings[1];
	const licenseHeading = reversedHeadings[0];

	const processor = remark()
		.use(createPreset({
			language
		}))
		.use(shiftHeadings)
		.use(obsolescence, {
			current: language,
			docsPath,
			source: "en"
		})
		.use(badges, badgeGroups)
		.use(t9n, {
			current: language,
			docsPath
		})
		.use(logo, {
			alt: "The logo of Pumpn Code's template project.",
			link: "https://github.com/pumpncode/template",
			src: relative(moduleFolder, resolve(projectRootPath, "media/images/logocolored.svg"))
		})
		.use(contributors, {
			heading: contributorsHeading
		})
		.use(license, {
			file: relative(moduleFolder, resolve(projectRootPath, "license.md")),
			heading: licenseHeading,
			name: "Pumpn Code"
		})
		.use(referenceLinks)
		.use(shiftPaths, {
			from: moduleFolder,
			match: /(license|[^\.]\/readme)\.md|logocolored\.svg/,
			to: resolve(docsPath, language)
		})
		.use(validateLinks)
		.use(listIndent);

	return processor;
};

export default createProcessor;
