const axios = require("axios");
const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

const BALANCE_FILE = "./balances.json";
let balances = {};

if (fs.existsSync(BALANCE_FILE)) {
    balances = JSON.parse(fs.readFileSync(BALANCE_FILE, "utf-8"));
}

// Save balance updates
function saveBalances() {
    fs.writeFileSync(BALANCE_FILE, JSON.stringify(balances, null, 2));
}

app.post("/api/transfer", async (req, res) => {
    const { hash, amount, currency, routing_number, account_number } = req.body;

    if (!hash || !amount || !currency || !routing_number || !account_number) {
        return res.status(400).json({ error: "Missing required fields for Crane transfer." });
    }

    if (!balances[hash]) {
        return res.status(400).json({ error: "Hash not registered in balance system." });
    }

    if (balances[hash] >= amount) {
        balances[hash] -= amount;
        saveBalances();
        res.json({ success: true, message: `Transfer of ${amount} USD to Crane completed.` });
    } else {
        res.status(400).json({ error: "Insufficient balance for transfer." });
    }
});

module.exports = app;

