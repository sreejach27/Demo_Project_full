const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

let faqData = [];

// Load FAQ data
fs.readFile("data\\faq.json", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading or parsing faq.json:", err);
    return;
  }

  try {
    faqData = JSON.parse(data);
    console.log("FAQ Data loaded:", faqData);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});

app.post("/api/chat", (req, res) => {
  if (!faqData) {
    return res.json({ response: "I'm sorry, Can you rephrase your question?" });
  }

  const userMessage = req.body.message.toLowerCase();
  const userKeywords = userMessage.split(/\s+/); // Split by spaces

  let bestMatch = null;
  let highestMatchCount = 0;

  // Find the FAQ with the most keyword matches
  for (const faq of faqData) {
    const faqKeywords = faq.question.toLowerCase().split(/\s+/); // Split FAQ question into keywords
    let matchCount = 0;

    // Check how many keywords from the user question are in the FAQ question
    for (const keyword of userKeywords) {
      if (faqKeywords.includes(keyword)) {
        matchCount++;
      }
    }

    // Update the best match if the current FAQ has more matches
    if (matchCount > highestMatchCount) {
      highestMatchCount = matchCount;
      bestMatch = faq;
    }
  }

  // If a match is found, return the corresponding answer
  const response = bestMatch
    ? bestMatch.answer
    : "I'm sorry, I don't have an answer for that yet.";

  res.json({ response });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
