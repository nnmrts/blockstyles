import PropTypes from "prop-types";

export default {
	block: PropTypes.shape({
		difficulty: PropTypes.number.isRequired,
		extraData: PropTypes.string.isRequired,
		gasLimit: PropTypes.shape({
			hex: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired
		}).isRequired,
		gasUsed: PropTypes.shape({
			hex: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired
		}).isRequired,
		hash: PropTypes.string.isRequired,
		miner: PropTypes.string.isRequired,
		nonce: PropTypes.string.isRequired,
		number: PropTypes.number.isRequired,
		parentHash: PropTypes.string.isRequired,
		timestamp: PropTypes.number.isRequired,
		transactions: PropTypes.arrayOf(PropTypes.shape({
			blockHash: PropTypes.string.isRequired,
			blockNumber: PropTypes.number.isRequired,
			chainId: PropTypes.number.isRequired,
			confirmations: PropTypes.number.isRequired,
			creates: null,
			data: PropTypes.string.isRequired,
			from: PropTypes.string.isRequired,
			gasLimit: PropTypes.shape({
				hex: PropTypes.string.isRequired,
				type: PropTypes.string.isRequired
			}).isRequired,
			gasPrice: PropTypes.shape({
				hex: PropTypes.string.isRequired,
				type: PropTypes.string.isRequired
			}).isRequired,
			hash: PropTypes.string.isRequired,
			nonce: PropTypes.number.isRequired,
			r: PropTypes.string.isRequired,
			s: PropTypes.string.isRequired,
			to: PropTypes.string.isRequired,
			transactionIndex: PropTypes.number.isRequired,
			v: PropTypes.number.isRequired,
			value: PropTypes.shape({
				hex: PropTypes.string.isRequired,
				type: PropTypes.string.isRequired
			}).isRequired
		})).isRequired
	}).isRequired
};
