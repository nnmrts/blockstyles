/* eslint import/no-extraneous-dependencies: off */

import {
	dirname,
	resolve
} from "path";
import {
	fileURLToPath
} from "url";

import remark from "remark";
import referenceLinks from "remark-reference-links";
import validateLinks from "remark-validate-links";

import {
	listIndent,
	shiftPaths
} from "../plugins.js";
import {
	formattingOptions
} from "../plugins/remark.js";

const modulePath = fileURLToPath(import.meta.url);

const moduleFolder = dirname(modulePath);

const sourcePath = resolve(moduleFolder, "../../en/");
const rootPath = resolve(moduleFolder, "../../../");

const root = remark()
	.use(formattingOptions)
	.use(referenceLinks)
	.use(shiftPaths, {
		from: sourcePath,
		to: rootPath
	})
	.use(validateLinks)
	.use(listIndent);

export default root;
