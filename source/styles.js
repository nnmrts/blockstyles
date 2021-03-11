import Billiard, {
	styleMetadata as billiardOptions
} from "./styles/billiard.js";
import Eth, {
	styleMetadata as ethOptions
} from "./styles/eth.js";
import Langton, {
	styleMetadata as langtonOptions
} from "./styles/langton.js";

export default [
	[Billiard, billiardOptions],
	[Langton, langtonOptions],
	[Eth, ethOptions]
];
