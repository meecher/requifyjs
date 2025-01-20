const apiUrl = "/api/chat";

async function sendMessage() {
    console.log("Button clicked!");
    const userInput = document.getElementById("userInput").value;
    document.getElementById("userInput").value = "";

    if (!userInput) return;

    const messagePayload = [
        { role: "user", content: userInput }
    ];

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: messagePayload }),
        });

        if (!response.ok) {
            console.error("API Error:", await response.text());
            return;
        }

        const responseData = await response.json();
        const reply = responseData.choices[0].message.content; // Extracting the assistant's reply

        updateChatLog(userInput, reply); // Update the chat log with the user's input and assistant's response
    console.log(responseData)
    } catch (error) {
        console.error("Error:", error);
    }
}

function startMessage() {
    const messagePayload = [
        { role: "system", content:"Requirements Engineer welcher bei der Erstellung von Anforderungen unterstützt. Der Kontext ist ein Experiment. In diesem Experiment wird ein Bild von einem Haus gezeigt, welches mit den Anforderungen sehr präzise beschrieben werden soll. Anhand dieser Anforderungen soll es später möglich sein das Haus möglichst genau erneuet zu zeichnen. Es ist wichtig dass ein Mensch nur mit diesen Anforderungen das Bild 1:1 nachzeichnen kann. Gebe dafür die Anforderungen in Deutsch im folgenden Format in jedem Schritt an: Anforderungen [1., 2., ...]"}
    ];

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: messagePayload }),
        });

        if (!response.ok) {
            console.error("API Error:", await response.text());
            return;
        }

        const responseData = await response.json();
        const reply = responseData.choices[0].message.content; // Extracting the assistant's reply

        updateChatLog(userInput, reply); // Update the chat log with the user's input and assistant's response
    console.log(responseData)
    } catch (error) {
        console.error("Error:", error);
    }
}

function imageMessage() {
    const messagePayload = [
        {
        "role": "user", "content": [
        {"type": "text", "text": "Erstelle möglichst genaue Anforderungen anhand des Bildes."},
        {
        "type": "image_url",
        "image_url": {
          "url": "https://i.ibb.co/rk0GB3G/requifyexperimentgrafik.png",
        },
        },
        ],
        };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: messagePayload }),
        });

        if (!response.ok) {
            console.error("API Error:", await response.text());
            return;
        }

        const responseData = await response.json();
        const reply = responseData.choices[0].message.content; // Extracting the assistant's reply

        updateChatLog(userInput, reply); // Update the chat log with the user's input and assistant's response
    console.log(responseData)
    } catch (error) {
        console.error("Error:", error);
    }
}

// Function to update the chat log in the UI
function updateChatLog(userInput, reply) {
    const chatLog = document.getElementById("chatLog");
    chatLog.value += `User: ${userInput}\nAssistant: ${reply}\n\n`;
    chatLog.scrollTop = chatLog.scrollHeight;
}

startMessage();
imageMessage();
document.getElementById("submit-guess-btn").addEventListener("click", sendMessage);
