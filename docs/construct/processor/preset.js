/* eslint import/no-extraneous-dependencies: off */

import footnotes from "remark-footnotes";
import gfm from "remark-gfm";
import github from "remark-github";
import retext from "remark-retext";

import {
	formattingOptions
} from "../plugins.js";

import createTextProcessor from "./text.js";

/**
 * @param options
 * @param options.language
 * @example
 */
const createPreset = ({
	language
}) => ({
	plugins: [
		gfm,
		github,
		[
			footnotes,
			{
				inlineNotes: true
			}
		],
		[
			retext,
			createTextProcessor({
				language
			})
		],
		formattingOptions
	]
});

export default createPreset;
