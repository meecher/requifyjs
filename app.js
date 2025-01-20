const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Proxy endpoint for OpenAI API
app.post("/api/chat", async (req, res) => {
    const { messages } = req.body; // Extract messages from the request body

    if (!messages) {
        console.error("Missing 'messages' in request body");
        return res.status(400).json({
            error: {
                message: "Missing required parameter: 'messages'.",
            },
        });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: messages,
            }),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("OpenAI API Error:", errorDetails);
            return res.status(response.status).json(errorDetails);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
