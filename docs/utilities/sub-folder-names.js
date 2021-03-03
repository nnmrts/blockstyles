import {
	promises as fs
} from "fs";

const {
	readdir
} = fs;

/**
 * @param folder
 * @param filter
 * @example
 */
const subFolderNames = async(folder, filter = () => true) => (await readdir(folder, {
	withFileTypes: true
}))
	.filter((entry) => entry.isDirectory())
	.filter(filter)
	.map(({
		name
	}) => name);

export default subFolderNames;
