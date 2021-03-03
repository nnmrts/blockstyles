/**
 * @param string
 * @param start
 * @param start.line
 * @param start.column
 * @param end
 * @param end.line
 * @param end.column
 * @example
 */
const sliceLineColumn = (
	string,
	{
		line: startLine,
		column: startColumn
	},
	{
		line: endLine,
		column: endColumn
	}
) => {
	const lines = string.split("\n");

	lines[startLine - 1] = lines[startLine - 1].slice(startColumn);
	lines[endLine - 1] = lines[endLine - 1].slice(0, endColumn);

	return lines.slice(startLine - 1, endLine).join("\n");
};

export default sliceLineColumn;
