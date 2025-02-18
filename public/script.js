document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");
  
    sendButton.addEventListener("click", function () {
      const userInput = document.getElementById("userInput").value;
  
      fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      })
        .then((response) => {
          // Ensure the response is properly parsed as JSON
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Log the response to debug
          console.log("Response from server: ", data);
  
          // Ensure the response has the "response" field
          if (data && data.response) {
            document.getElementById("chatResponse").innerText = data.response;
          } else {
            document.getElementById("chatResponse").innerText =
              "Error: Invalid response from server";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById("chatResponse").innerText =
            "Error: Could not connect to the server.";
        });
    });
  });
  