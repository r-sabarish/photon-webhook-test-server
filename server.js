import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Health check (optional)
app.get("/", (req, res) => {
    res.send("Photon Webhook Server Running");
});

// -------------------------
//   LEAVE GAME WEBHOOK
// -------------------------
app.post("/game/leave", (req, res) => {
    const body = req.body;

    console.log("📤 LeaveGame Webhook Received:");
    console.log(body);

    if (!body || typeof body !== "object") {
        console.error("❌ Invalid or empty JSON payload");
        return res.status(400).send("Invalid JSON");
    }

    const { AppId, GameId, UserId, Reason } = body;

    console.log("Parsed values:", { AppId, GameId, UserId, Reason });

    res.status(200).send();
});

app.post("/game/join", (req, res) => {
    const body = req.body;

    console.log("📤 JoinGame Webhook Received:");
    console.log(body);

    if (!body || typeof body !== "object") {
        console.error("❌ Invalid or empty JSON payload");
        return res.status(400).send("Invalid JSON");
    }

    res.status(200).send();
});

// -------------------------
//   CLOSE GAME WEBHOOK
// -------------------------
app.post("/game/close", (req, res) => {
    const body = req.body;

    console.log("🏁 CloseGame Webhook Received:");
    console.log(JSON.stringify(body, null, 2));

    // Extract data
    const appId = body.AppId;
    const gameId = body.GameId;
    const closeReason = body.CloseReason;

    // Your logic here:
    // - Finalize match
    // - Compute results
    // - Grant XP, coins, rewards
    // - Cleanup DB
    // - Send analytics

    // Photon requires a clean 200 OK
    res.status(200).send();
});

// -------------------------
//   START SERVER
// -------------------------
app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
