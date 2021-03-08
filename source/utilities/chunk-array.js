const chunkArray = (array, chunkSize) => array.reduce((all, one, index) => {
	const ch = Math.floor(index / chunkSize);
	const newAll = [...all];
	newAll[ch] = [].concat(all[ch] || [], one);

	return newAll;
}, []);

export default chunkArray;
