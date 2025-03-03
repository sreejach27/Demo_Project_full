document.addEventListener("DOMContentLoaded", () => {
  const userMessageInput = document.getElementById("userMessage");
  const sendButton = document.getElementById("sendBtn");
  const chatResponseDiv = document.getElementById("chatResponse");

  // Handle the send button click
  sendButton.addEventListener("click", async () => {
    const userMessage = userMessageInput.value.trim();
    if (!userMessage) {
      chatResponseDiv.textContent = "Please enter a question.";
      return;
    }

    try {
      // Send a POST request to the server with the user's message
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      chatResponseDiv.textContent = `Chatbot: ${data.response}`;

      // Follow-up assistance prompt
      setTimeout(() => {
        const followUpPrompt = document.createElement("div");
        followUpPrompt.innerHTML = `
          <p>Do you need more assistance?</p>
          <button id="yesBtn">Yes</button>
          <button id="noBtn">No</button>
        `;
        chatResponseDiv.appendChild(followUpPrompt);

        document.getElementById("yesBtn").addEventListener("click", () => {
          window.location.href = "/form.html"; // Redirect to form page
        });

        document.getElementById("noBtn").addEventListener("click", () => {
          followUpPrompt.remove();
        });
      }, 2000); // Show the prompt after 2 seconds
    } catch (error) {
      chatResponseDiv.textContent = "An error occurred. Please try again.";
      console.error("Error:", error);
    }

    // Clear the input field
    userMessageInput.value = "";
  });
});
