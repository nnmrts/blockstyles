/* eslint import/no-unused-modules: off*/

import React from "react";
import {
	render
} from "react-dom";

import App from "./app.js";

render(
	<App width={500} height={500} />,
	document.getElementById("root")
);
