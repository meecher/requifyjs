const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve HTML and JS files

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: message,
            }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error communicating with OpenAI API");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
