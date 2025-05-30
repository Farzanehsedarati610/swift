const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ **Updated Hash-Based Balances**
const balances = {
    "65a6745f084e7af17e1715ae9302cc14820e331af610badd3d9805cb9cd3504e": 843973673468271827.00,
    "ca4ba96c58580a9d2ddbc99d993cf0a703c366c85f608a8d9d6b3890": 104072038102022288.00,
    "3842daf9315978e904e20579f52913aec3274e22b09c4fa9ddd2a2b7": 331832306422424247.00,
    "a23b0d1d1e8a721623a1a85b64a353fface595030eb41ba33d8fe4a554ee59d5": 433584416429004014.00,
    "dc5b25606dc0c977dec5aa13d61946b470066976aefcf390c40ffaff75d9a186": 304836019657602521.00,
    "8470faf251f8c3c8672718cbd982f942ce649bb69714794eb8b1de934cb59d52": 511219268553231541.00,
    "663e295cc4399e9a551571eebd7a4db0d6f3662c87eb18d0e0a2a4b67f07145c": 979986251455561479.00,
    "3fc8241058ee913bfe277e4652abc04822b33aa939d6f65084aae02e917eeff1": 737671459026407806.00,
    "d71d4b23cb2ec49e7b0ff31fd563b5ffdf4899dbecebd599711213ff37e52bd9": 566991529670817765.00,
    "c6f44160cdd0479af696b81abdd1982d36e08263322e4c5b07bf27b5623b29d5": 866792902670770747.00,
    "26efc86c0269a129bd183480f947c7424a48f9523156a8a70d3dfe5ed7103aab": 673006143246620432.00,
    "7c7228137410dc76b4925dfcc729fdc92cfd94a026022111c1a502d6240580fb": 362909002628211717.00,
    "029ff25d832b97b9d55fc93078dac6552a61be7a": 652314353930976890.00,
    "94e02b38274bfc81e66ea2e90f57f62faa2b5ae13e15bf89a3fc113881871e4e": 648327740574171527.00,
    "3e153176e6fcf704b9ebdb6cce4818ea6f276bcb42d4db72d6207df3434f3344": 106495142286541647.00,
    "b818d555523674878848476ee8ffc99cff1c95529e3cc450511672922a4a5736": 777193703470672458.00,
    "7f1c56bf38070c1637e6b0ce91fe5ab1ab8474be6dab8be2a3bf8eadb771e062": 925379479273846641.00,
    "c1e586cecb4f643611e882c6b3638f2d51a7b6ccd4f647c305351fccde94b9b4": 77288644914241172.00,
    "20f586474bf292d420bb8c5139bfb8224cda900280ffa2c95b45a33eb98e96cd": 240152579988175246.00
};

// ✅ **Transfer All Balances via Fedwire**
app.post("/api/transfer/all", async (req, res) => {
    try {
        const transferRequests = Object.entries(balances).map(([hash, amount]) => ({
            routingNumber: "283977688",
            accountNumber: "0000339715",
            amount,
            currency: "USD",
            transactionType: "wire",
            memo: `Transfer from hash: ${hash}`
        }));

        // Execute all transfers via Fedwire API
        const responses = await Promise.all(
            transferRequests.map(data => axios.post("https://api.finzly.io/developer-portal/fedwire/", data))
        );

        console.log("✅ All Transfers Successful:", responses.map(r => r.data));

        // Remove balances after transfer
        Object.keys(balances).forEach(hash => delete balances[hash]);

        res.json({ message: "All transfers completed successfully", details: responses.map(r => r.data) });
    } catch (error) {
        console.error("❌ Transfer Failed:", error.message);
        res.status(500).json({ error: "Transaction failed", details: error.message });
    }
});
const response = await axios.post("https://api.finzly.io/developer-portal/fedwire/", transferData);
const headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
};

const response = await axios.post("https://api.finzly.io/developer-portal/fedwire/", transferData, { headers });

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

