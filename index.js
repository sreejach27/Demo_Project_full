const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Load FAQ data from faq.json
let faqData = [];
try {
  const faqFile = fs.readFileSync(path.join(__dirname, "data\\faq.json"), "utf-8");
  faqData = JSON.parse(faqFile);
} catch (err) {
  console.error("Error reading or parsing faq.json:", err);
}

// Endpoint to handle chatbot requests
app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ response: "Invalid input" });
  }

  // Simple keyword-based search in the FAQ data
  let matchedResponse = "I'm sorry, I don't have an answer for that yet.";
  for (const faq of faqData) {
    const questionKeywords = faq.question.toLowerCase().split(" ");
    const userMessageKeywords = userMessage.toLowerCase().split(" ");

    if (questionKeywords.some((keyword) => userMessageKeywords.includes(keyword))) {
      matchedResponse = faq.answer;
      break;
    }
  }

  res.json({ response: matchedResponse });
});

// Serve the assistance form page
app.get("/form.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});

// Handle form submissions
app.post("/submit-form", (req, res) => {
  const { name, email, issue } = req.body;

  if (!name || !email || !issue) {
    return res.status(400).send("<h1>Error: Missing form fields</h1>");
  }

  console.log(`Form submitted by ${name} (${email}): ${issue}`);

  // You can extend this to store data in a database or send an email

  res.send("<h1>Thank you for your submission!</h1><p>We will get back to you soon.</p>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
