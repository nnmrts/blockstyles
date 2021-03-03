'use strict';

/**
 *
 * This function generates the string "hello".
 *
 * @returns {string}
 * "hello".
 * @example
 * console.log(hello()); // logs "hello"
 * @private
 */
var hello = () => "hello";

/**
 *
 * This function generates the string "world".
 *
 * @returns {string}
 * "world".
 * @example
 * console.log(world()); // logs "world"
 * @private
 */
var world = () => "world";

/**
 * This is a hello world function.
 *
 * @returns {string}
 * "Hello World!".
 * @example
 * console.log(helloWorld()); // logs "Hello World!"
 */

var helloWorld = () => {
  var firstWord = hello();
  var secondWord = world();
  var words = [firstWord, secondWord];
  var capitalizedWords = words.map(word => "".concat(word.charAt(0).toUpperCase()).concat(word.slice(1).toLowerCase()));
  return "".concat(capitalizedWords.join(" "), "!");
};

module.exports = helloWorld;
