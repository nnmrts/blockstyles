/**
 * @license
 * Copyright © 2020 Pumpn Code
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const template = (function () {
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

	return helloWorld;

}());
//# sourceMappingURL=index.browser.js.map
