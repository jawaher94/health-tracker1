import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.post("/generate-plan", async (req, res) => {
  try {
    const { goal } = req.body;

    let url = "";

    // 🔥 اختيار نوع التمارين حسب الهدف
    if (goal === "lose-weight") {
      url = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/cardio";
    } else if (goal === "muscle") {
      url = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest";
    } else if (goal === "fitness") {
      url = "https://exercisedb.p.rapidapi.com/exercises";
    } else {
      url = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/cardio";
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b6121c4937mshb43b78e68f7239ep118d68jsn49cc469bd92b",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
      }
    });

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("No data");
    }

    // 🔥 نختار تمارين عشوائية
    const shuffled = data.sort(() => 0.5 - Math.random());
    const exercises = shuffled.slice(0, 6);

    // 🔥 نبني برنامج
    let plan = `🔥 ${goal.toUpperCase()} PLAN\n\n`;

    plan += `📅 Day 1:\n`;
    plan += `- ${exercises[0].name}\n`;
    plan += `- ${exercises[1].name}\n\n`;

    plan += `📅 Day 2:\n`;
    plan += `- ${exercises[2].name}\n`;
    plan += `- ${exercises[3].name}\n\n`;

    plan += `📅 Day 3:\n`;
    plan += `- ${exercises[4].name}\n`;
    plan += `- ${exercises[5].name}\n\n`;

    plan += `💡 Stay consistent and hydrated`;

    res.json({ plan });

  } catch (error) {
    console.log(error);

    res.json({
      plan: "Error loading plan from API"
    });
  }
});
  

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

// b6121c4937mshb43b78e68f7239ep118d68jsn49cc469bd92b