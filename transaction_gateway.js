const balances = require("./balances.json");

const getMaxBalanceForHash = (hash) => balances[hash] || "Hash not found";

module.exports = getMaxBalanceForHash;

