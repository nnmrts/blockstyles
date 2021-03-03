import {
	resolve
} from "path";
import {
	promises as fs
} from "fs";

const {
	readdir,
	stat
} = fs;

const newerThanSource = async(sourceFolderPath, testFolderPath, filter = () => true) => {
	const [sourcePaths, testPaths] = await Promise.all(
		[sourceFolderPath, testFolderPath]
			.map(
				async(folderPath) => (await readdir(folderPath, {
					withFileTypes: true
				}))
					.filter(filter)
					.map(({
						name
					}) => resolve(folderPath, name))
			)
	);

	for (const [index, sourcePath] of sourcePaths.entries()) {
		const testPath = testPaths[index];

		const {
			mtimeMs: sourceLastModified
		} = await stat(sourcePath);

		const {
			mtimeMs: testLastModified
		} = await stat(testPath);

		if (sourceLastModified > testLastModified) {
			console.warn(`The translation at\n"${testPath}"\nis older than its source at\n"${sourcePath}".`);
			console.warn("The obsolescence notice won't be removed.");

			return false;
		}
	}

	return true;
};

const removeNotice = (children) => children.slice(1);

/**
 * @param options
 * @param options.current
 * @param options.docsPath
 * @param options.source
 * @example
 */
const obsolescence = ({
	current,
	docsPath,
	source
}) => async(tree) => {
	const {
		children
	} = tree;

	let newChildren = [...children];

	const sourceFolderPath = resolve(docsPath, `${source}/readme`);
	const t9nFolderPath = resolve(docsPath, `${current}/readme`);

	if (
		current === "en" ||
		await newerThanSource(
			sourceFolderPath,
			t9nFolderPath,
			(entry) => {
				const {
					name
				} = entry;

				return entry.isFile() && name.endsWith(".md");
			}
		)
	) {
		newChildren = removeNotice(newChildren);
	}

	return {
		...tree,
		children: newChildren
	};
};

export default obsolescence;
