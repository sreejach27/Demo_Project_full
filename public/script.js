document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("sendButton");
  const chatOutput = document.getElementById("chat-output");

  sendButton.addEventListener("click", function () {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    // Display the user's message
    const userMessageElement = document.createElement("div");
    userMessageElement.textContent = `You: ${userInput}`;
    chatOutput.appendChild(userMessageElement);

    // Send the user's message to the server
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the chatbot's response
        const botMessageElement = document.createElement("div");
        botMessageElement.textContent = `Chatbot: ${data.response}`;
        chatOutput.appendChild(botMessageElement);
      })
      .catch((error) => {
        console.error("Error:", error);
        const errorMessageElement = document.createElement("div");
        errorMessageElement.textContent = "Error: Could not connect to the server.";
        chatOutput.appendChild(errorMessageElement);
      });

    // Clear the input field
    document.getElementById("userInput").value = "";
  });
});
