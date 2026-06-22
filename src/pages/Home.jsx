import { useEffect, useState } from "react";
import HealthCard from "../components/HealthCard";
import WeeklyProgress from "../components/WeeklyProgress";
import HealthSetup from "../components/HealthSetup"; 
import { getHealthData } from "../services/healthService";

function Home({ user }) {

  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false); 

  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getHealthData(user.uid);

      console.log("FIREBASE DATA:", data);

    
      if (!data) {
        setShowSetup(true);
      }
      else if (!data.health) {
        setShowSetup(true);
      }
      else {
        setHealthData(data.health);
      }

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  fetchData();
}, [user.uid]);

  if (loading) {
    return <p>Loading your dashboard...</p>;
  }

  if (showSetup) {
    return (
      <HealthSetup
        user={user}
        onComplete={async () => {
          const data = await getHealthData(user.uid);
          setHealthData(data.health);
          setShowSetup(false);
        }}
      />
    );
  }

  const getAIRecommendations = (data) => {
    const tips = [];

    if (data.sleep < 7) tips.push("😴 Try to get at least 7 hours of sleep tonight.");
    if (data.steps < 8000) tips.push("🚶‍♂️ A short walk can help you reach your daily steps goal.");
    if (data.calories < 1400) tips.push("🔥 Your calorie intake is low today.");
    if (data.heartRate > 90) tips.push("❤️ Your heart rate is high, take a short rest.");

    if (tips.length === 0) {
      tips.push("✅ Great job! You're doing very well today.");
    }

    return tips;
  };

  const aiTips = getAIRecommendations(healthData);

  return (
    <div className="page">

      <h2>{getGreeting()} 👋</h2>
      <p className="subtitle">Here is your health summary today</p>

      <div className="cards-grid">
        <HealthCard title="Steps" value={healthData.steps} unit="steps" icon="directions_walk" />
        <HealthCard title="Calories" value={healthData.calories} unit="kcal" icon="local_fire_department" />
        <HealthCard title="Heart Rate" value={healthData.heartRate} unit="bpm" icon="favorite" />
        <HealthCard title="Sleep" value={healthData.sleep} unit="hours" icon="bedtime" />
        <HealthCard title="Weight" value={healthData.weight} unit="kg" icon="monitor_weight" />
        <HealthCard title="Blood Pressure" value={healthData.bloodPressure} unit="" icon="bloodtype" />
      </div>

      <div className="ai-box">
        <h3>AI Insights</h3>
        <ul>
          {aiTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      <WeeklyProgress stepsData={healthData.weeklySteps || []} />

    </div>
  );
}

export default Home;