/* eslint import/no-extraneous-dependencies: off */

import spell from "retext-spell";
import de from "dictionary-de";
import en from "dictionary-en";

import personalDictionary from "./orthography/personal-dictionary.js";

const dictionaries = {
	de,
	en
};

const buggedLanguages = ["de"];

/**
 * @param root0
 * @param root0.language
 * @example
 */
const createPlugins = ({
	language
}) => ({
	plugins: buggedLanguages.includes("de")
		? []
		: [
			[
				spell,
				{
					dictionary: dictionaries[language],
					personal: personalDictionary
				}
			]

		]

});

export default createPlugins;
