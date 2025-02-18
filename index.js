const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/chatdb", { useNewUrlParser: true });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/api/chat", express.json(), (req, res) => {
  const userMessage = req.body.message; // Get the message from the request body

  console.log("User message received:", userMessage); // Log the user message

  // Simulate a response
  const responseMessage = `You said: "${userMessage}"`;

  // Send the response as JSON
  res.json({ response: responseMessage });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
