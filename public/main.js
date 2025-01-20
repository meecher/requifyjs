// JavaScript implementation of the Pyscript functionality

const apiKey = "";
const apiUrl = "/api/chat";

let messages = [];
let dataCollect = [];
let startTime = new Date();

// Function to send a message and get a response
const apiUrl = "/api/chat";

async function sendMessage() {
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
            const errorText = await response.text();
            console.error("Error:", errorText);
            return;
        }

        const responseData = await response.json();
        const reply = responseData.choices[0].message.content;
        dataCollect.push({ role: "user", content: userInput, time: new Date() - startTime });
        dataCollect.push({ role: "assistant", content: reply, time: new Date() - startTime });

        updateChatLog(userInput, reply);
    } catch (error) {
        console.error("Error:", error);
    }
}


// Update the chat log in the UI
function updateChatLog(userInput, reply) {
    const chatLog = document.getElementById("chatLog");
    chatLog.value += `Benutzer: ${userInput}\nAssistent: ${reply}\n\n`;
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Create and download a CSV file from dataCollect
function downloadFile() {
    const csvContent = dataCollect.map(e => `${e.role};${e.content};${e.time}`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Attach event listeners to buttons
document.getElementById("submit-guess-btn").addEventListener("click", sendMessage);
document.getElementById("download").addEventListener("click", downloadFile);
