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
    const { messages } = req.body;
    console.log("Received messages:", messages); // Debugging input
    
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({ model: "gpt-4", messages: messages }),
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error("OpenAI API error:", errorDetails);
            return res.status(response.status).send(errorDetails);
        }

        const data = await response.json();
        console.log("OpenAI API response:", data); // Debugging output
        res.json(data);
    } catch (error) {
        console.error("Error communicating with OpenAI API:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
