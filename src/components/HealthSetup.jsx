import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./formStyles.css";

function HealthSetup({ user, onComplete }) {

  const [steps, setSteps] = useState("");
  const [calories, setCalories] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [sleep, setSleep] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");

  const handleSave = async () => {
  try {
    await setDoc(
      doc(db, "users", user.uid),
      {
        health: {
          steps: Number(steps),
          calories: Number(calories),
          heartRate: Number(heartRate),
          sleep: Number(sleep),
          weight: Number(weight),
          bloodPressure
        }
      },
      { merge: true }
    );

    onComplete();

  } catch (error) {
    console.error("Error saving health data:", error);
  }
};

  return (
    <div className="health-card">

      <h2 className="card-header">Enter your health data</h2>

      <input className="input-field" placeholder="Steps" onChange={(e)=>setSteps(e.target.value)} />
      <input className="input-field" placeholder="Calories" onChange={(e)=>setCalories(e.target.value)} />
      <input className="input-field" placeholder="Heart Rate" onChange={(e)=>setHeartRate(e.target.value)} />
      <input className="input-field" placeholder="Sleep Hours" onChange={(e)=>setSleep(e.target.value)} />
      <input className="input-field" placeholder="Weight" onChange={(e)=>setWeight(e.target.value)} />
      <input className="input-field" placeholder="Blood Pressure" onChange={(e)=>setBloodPressure(e.target.value)} />

      <button className="submit-button" onClick={handleSave}>
        Save
      </button>

    </div>
  );
}

export default HealthSetup;