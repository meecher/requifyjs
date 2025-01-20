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
