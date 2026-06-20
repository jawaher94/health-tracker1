import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Plan() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const response = [
    
  {
    id: "lose-weight",
    title: "Weight Loss Plan",
    description: "Burn fat with cardio exercises"
  },
  {
    id: "fitness",
    title: "Fitness Plan",
    description: "Improve strength and activity"
  },
  {
    id: "blood-pressure",
    title: "Blood Pressure Plan",
    description: "Keep your heart healthy"
  },
  {
    id: "muscle",
    title: "Muscle Gain Plan",
    description: "Build muscles and strength"
  },
  {
    id: "health",
    title: "General Health Plan",
    description: "Stay healthy and active"
  }
];
    

    setPlans(response);
    setLoading(false);
  };

  if (loading) return <p>Loading plans...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Health Plans</h2>

      {/* 🟢 كل البطاقات تحت بعض */}
      <div>
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => navigate(`/plan/${plan.id}`)}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
              cursor: "pointer",
              background: "#f9f9f9",
              transition: "0.3s"
            }}
          >
            {/* 🟢 عنوان أخضر */}
            <h3 style={{ color: "green", marginBottom: "8px" }}>
              {plan.title}
            </h3>

            {/* 🟡 وصف الخطة */}
            <p style={{ color: "#555", margin: 0 }}>
              {plan.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}