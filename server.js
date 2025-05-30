const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON requests
app.use(express.json());

// Sample route to verify transactions
app.get("/api/balances", async (req, res) => {
    try {
        const balances = {
            "65a6745f084e7af17e1715ae9302cc14820e331af610badd3d9805cb9cd3504e": 843973673468271827.00
        };
        res.json(balances);
    } catch (error) {
        console.error("Error retrieving balances:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Start the server and bind the port
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

