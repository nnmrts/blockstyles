/* eslint import/no-extraneous-dependencies: off */

import remark from "remark";
import behead from "remark-behead";
import inlineLinks from "remark-inline-links";

import {
	shiftPaths
} from "../plugins.js";

import createPreset from "./preset.js";

/**
 * @param options
 * @param options.language
 * @example
 */
const createProcessor = ({
	language
}) => remark()
	.use({
		language
	})
	.use(createPreset({
		language
	}))
	.use(behead, {
		depth: 1
	})
	.use(shiftPaths, {
		up: 1
	})
	.use(inlineLinks);

export default createProcessor;
