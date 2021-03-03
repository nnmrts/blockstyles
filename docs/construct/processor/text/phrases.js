/* eslint import/no-extraneous-dependencies: off */

import awareness from "./phrases/awareness.js";
import grammar from "./phrases/grammar.js";

const {
	plugins: awarenessPlugins
} = awareness;

const {
	plugins: grammarPlugins
} = grammar;

const phrases = {
	plugins: [...awarenessPlugins, ...grammarPlugins]
};

export default phrases;
