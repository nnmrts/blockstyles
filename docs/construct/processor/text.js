/* eslint import/no-extraneous-dependencies: off */

import unified from "unified";
import english from "retext-english";

import symbols from "./text/symbols.js";
import phrases from "./text/phrases.js";
import syntax from "./text/syntax.js";
import createOrthography from "./text/orthography.js";
import morphology from "./text/morphology.js";

/**
 * @param options
 * @param options.language
 * @example
 */
const createProcessor = ({
	language
}) => unified()
	.use(english)
	.use(syntax)
	.use(symbols)
	.use(createOrthography({
		language
	}))
	.use(language === "en" ? phrases : {})
	.use(morphology);

export default createProcessor;
