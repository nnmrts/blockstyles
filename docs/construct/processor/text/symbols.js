/* eslint import/no-extraneous-dependencies: off */

import contractions from "retext-contractions";
import diacritics from "retext-diacritics";
import emoji from "retext-emoji";
import sentenceSpacing from "retext-sentence-spacing";
import quotes from "retext-quotes";

const symbols = {
	plugins: [
		[
			contractions,
			{
				straight: true
			}
		],
		diacritics,
		[
			emoji,
			{
				convert: "encode"
			}
		],
		sentenceSpacing,
		[
			quotes,
			{
				preferred: "straight"
			}
		]
	]
};

export default symbols;
