/* eslint import/no-extraneous-dependencies: off */

import syntaxMentions from "retext-syntax-mentions";
import syntaxUrls from "retext-syntax-urls";

const syntax = {
	plugins: [syntaxMentions, syntaxUrls]
};

export default syntax;
