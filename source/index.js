import hello from "./hello.js";
import world from "./world.js";

/**
 * This is a hello world function.
 *
 * @returns {string}
 * "Hello World!".
 * @example
 * console.log(helloWorld()); // logs "Hello World!"
 */
const helloWorld = () => {
	const firstWord = hello();
	const secondWord = world();

	const words = [firstWord, secondWord];

	const capitalizedWords = words.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`);

	return `${capitalizedWords.join(" ")}!`;
};

export default helloWorld;
