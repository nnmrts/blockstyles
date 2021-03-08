module.exports = {
	extends: ["@pumpn", "plugin:react/recommended"],
	rules: {
		"max-lines-per-function": "off",
		"max-statements": "off"
	},
	settings: {
		react: {
			version: "detect"
		}
	}
};
