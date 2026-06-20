import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-plan", async (req, res) => {
  try {
    const { goal } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Create a detailed health plan for: ${goal}. Keep it simple and actionable.`,
        },
      ],
    });

    res.json({
      plan: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating plan");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});