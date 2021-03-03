/* eslint import/no-extraneous-dependencies: off */

import equality from "retext-equality";
import profanities from "retext-profanities";
import readability from "retext-readability";
import simplify from "retext-simplify";

const algorithms = 7;
const needToAgree = 5;

const awareness = {
	plugins: [
		equality,
		profanities,
		[
			readability,
			{
				age: 18,
				threshold: needToAgree / algorithms
			}
		],
		[
			simplify,
			{
				ignore: ["option", "function"]
			}
		]
	]
};

export default awareness;
