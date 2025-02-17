document.getElementById("send-btn").addEventListener("click", async () => {
    const userMessage = document.getElementById("chat-input").value;
  
    // Show user message
    const chatOutput = document.getElementById("chat-output");
    const userMessageDiv = document.createElement("div");
    userMessageDiv.textContent = "You: " + userMessage;
    chatOutput.appendChild(userMessageDiv);
  
    // Send message to backend
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
  
    // Show bot response
    const botMessageDiv = document.createElement("div");
    botMessageDiv.textContent = "Bot: " + data.reply;
    chatOutput.appendChild(botMessageDiv);
  });
  