/* eslint import/no-extraneous-dependencies: off */
/* eslint import/no-unused-modules: off*/

import {
	promises as fs
} from "fs";
import {
	dirname,
	resolve
} from "path";
import {
	fileURLToPath
} from "url";

import fromMarkdown from "mdast-util-from-markdown";

import {
	createMainProcessor,
	rootProcessor
} from "./construct/processor.js";
import {
	subFolderNames
} from "./utilities.js";
import transformSection from "./construct/transform-section.js";
import transformMain from "./construct/transform-main.js";

const {
	readdir,
	readFile,
	writeFile
} = fs;

const modulePath = fileURLToPath(import.meta.url);

const moduleFolder = dirname(modulePath);

const markdownlintConfigPath = resolve(moduleFolder, "../.markdownlint.json");

const t9nFolderNames = [
	"en",
	...(
		await subFolderNames(moduleFolder, ({
			name
		}) => !["construct", "utilities"].includes(name))
	)
		.filter((name) => name !== "en")
];

for (const t9nFolderName of t9nFolderNames) {
	const docsPath = `${moduleFolder}/${t9nFolderName}/readme`;

	const filenames = await readdir(docsPath);

	const filenamePattern = /^\d{2}-.*\.md$/;

	const filteredFilenames = filenames.filter((filename) => filenamePattern.test(filename));

	const paths = filteredFilenames.map((filename) => `${docsPath}/${filename}`);

	const sectionTexts = await Promise.all(paths.map(async(path) => readFile(path, "utf8")));

	const headings = sectionTexts.map((sectionText) => {
		const {
			children: [
				{
					children: [
						{
							value
						}
					]
				}
			]
		} = fromMarkdown(sectionText);

		return value;
	});

	let readmeText = (await Promise.all(
		sectionTexts
			.map(async(sectionText, index) => transformSection({
				language: t9nFolderName,
				markdownlintConfigPath,
				path: paths[index],
				text: sectionText
			}))
	))
		.join("\n");

	const readmePath = `${docsPath}.md`;

	const mainProcessor = createMainProcessor({
		headings,
		language: t9nFolderName
	});

	readmeText = await transformMain({
		markdownlintConfigPath,
		path: readmePath,
		processor: mainProcessor,
		text: readmeText
	});

	await writeFile(readmePath, readmeText);

	if (t9nFolderName === "en") {
		const rootPath = resolve(moduleFolder, "../readme.md");

		const rootText = await transformMain({
			markdownlintConfigPath,
			path: rootPath,
			processor: rootProcessor,
			text: readmeText
		});

		await writeFile(rootPath, rootText);
	}
}
