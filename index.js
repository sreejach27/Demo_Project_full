const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/chatdb", { useNewUrlParser: true });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  let reply = "I'm a simple bot, and I don't understand that yet.";

  if (userMessage.toLowerCase().includes("hello")) {
    reply = "Hello! How can I help you today?";
  }

  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
