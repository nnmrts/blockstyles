import {
	promises as fs
} from "fs";

import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import progress from "rollup-plugin-progress";
import visualizer from "rollup-plugin-visualizer";
import del from "rollup-plugin-delete";
import filesize from "rollup-plugin-filesize";
import analyzer from "rollup-plugin-analyzer";
import {
	terser
} from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";

import packageJson from "./package.json";

const packageName = packageJson.name;

/**
 * @private
 */
const getLicense = async() => {
	const license = await fs.readFile("./license.md", "utf8");

	return `/**\n${`@license\n${license.replace(/^.*\n\n|\n$/g, "")}`.replace(/^/gm, " * ")}\n */`;
};

const outputs = Object.fromEntries(Object.entries({
	browser: "iife",
	node: "cjs"
}).map(([bundleName, format]) => [
	bundleName,
	[
		{
			banner: bundleName === "browser" ? getLicense : null,
			exports: "auto",
			file: `./build/index.${bundleName}.${format === "cjs" ? "cjs" : "js"}`,
			format,
			name: packageName.replace(/^@(.*?)\W/, ""),
			preferConst: true,
			sourcemap: bundleName === "browser",
			sourcemapExcludeSources: true
		}
	]
]));

outputs.browser.push({
	...outputs.browser[0],
	file: "./build/index.browser.min.js",
	plugins: [terser()]
});

const allBundles = Object.keys(outputs);

const bundlePlugins = {
	browser: [
		resolve({
			browser: true,
			preferBuiltins: false
		})
	],
	node: []
};

/**
 * @private
 */
export default (options) => {
	const bundles = Object.keys(options)
		.filter((option) => option.startsWith("config") && option !== "config")
		.map((option) => option.replace("config", "").toLocaleLowerCase())
		.filter((bundleName) => allBundles.includes(bundleName));

	const activeBundles = bundles.length
		? allBundles.filter((config) => bundles.includes(config))
		: allBundles;

	const {
		configVerbose: verbose
	} = options;

	return activeBundles.map((bundleName) => ({
		input: "./source/index.js",
		output: outputs[bundleName],
		plugins: [
			del({
				targets: `./build/index.${bundleName}.js`
			}),
			babel({
				babelHelpers: "bundled"
			}),
			commonjs(),
			json(),
			progress(),
			visualizer({
				filename: `./stats/${bundleName}/sun.html`,
				template: "sunburst"
			}),
			visualizer({
				filename: `./stats/${bundleName}/tree.html`,
				template: "treemap"
			}),
			visualizer({
				filename: `./stats/${bundleName}/net.html`,
				template: "network"
			}),
			filesize(),
			...verbose
				? [
					analyzer({
						summaryOnly: true
					})
				]
				: [],
			...bundlePlugins[bundleName]
		]
	}));
};
