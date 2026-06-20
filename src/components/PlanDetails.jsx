import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generatePlan();
  }, []);

  const generatePlan = async () => {
    try {
      setLoading(true);

      const response = await fetch(" https://health-tracker-cbjq.onrender.com/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          goal: id
        })
      });

      const data = await response.json();

      setPlan(data.plan);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setPlan("Error loading plan");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading plan...</p>;

  return (
    <div style={{ padding: "20px" }}>
      
      {/* 🟢 عنوان واضح وأخضر */}
      <h2 style={{ color: "green" }}>
        AI Health Plan - {id}
      </h2>

      {/* 🧠 عرض الخطة بشكل مرتب */}
      <div
        style={{
          background: "#f9f9f9",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "10px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.6"
        }}
      >
        {plan}
      </div>

      {/* أزرار */}
      <div style={{ marginTop: "20px" }}>
        
        <button
          onClick={() => alert("Plan Accepted")}
          style={{
            marginRight: "10px",
            padding: "10px 15px",
            cursor: "pointer",
            backgroundColor:"#4CAF50"
          }}
        >
          Accept Plan
        </button>

        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 15px",
            cursor: "pointer",
            backgroundColor:"#888"
          }}
        >
          Back
        </button>

      </div>
    </div>
  );
}