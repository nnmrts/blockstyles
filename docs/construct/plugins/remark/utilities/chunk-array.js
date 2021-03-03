/**
 * @param array
 * @param chunkSize
 * @example
 */
const chunkArray = (array, chunkSize) => array.reduce((all, one, index) => {
	const ch = Math.floor(index / chunkSize);

	const newAll = [...all];

	newAll[ch] = [].concat(newAll[ch] || [], one);

	return newAll;
}, []);

export default chunkArray;
