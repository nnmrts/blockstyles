/* eslint import/no-extraneous-dependencies: off */

import indefiniteArticle from "retext-indefinite-article";
import passive from "retext-passive";
import redundantAcronyms from "retext-redundant-acronyms";
import repeatedWords from "retext-repeated-words";
import usage from "retext-usage";

const grammar = {
	plugins: [
		indefiniteArticle,
		passive,
		redundantAcronyms,
		repeatedWords,
		usage
	]
};

export default grammar;
