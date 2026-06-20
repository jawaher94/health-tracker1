import "./HealthCard.css";

function HealthCard({ title, value, unit, icon }) {

  const data = {
    Steps: [1500, 5000, 2000, 6000, 3000, 8000],
    Calories: [2200, 2000, 1800, 1900, 1700, 1600],
    Heart: [72, 75, 70, 78, 74, 76],
    Sleep: [6, 6.5, 7, 5.5, 7.5, 8],
    Weight: [70, 69.8, 69.6, 69.5, 69.3, 69.2],
  };

  const green = "#4CAF50";

  // ===== Smooth Line Path =====
  const getSmoothPath = (arr) => {
    const max = Math.max(...arr);
    let path = "";

    arr.forEach((v, i) => {
      const x = 5 + (i / (arr.length - 1)) * 90;
      const y = 35 - (v / max) * 30;

      if (i === 0) path += `M ${x} ${y}`;
      else {
        const px = 5 + ((i - 1) / (arr.length - 1)) * 90;
        const py = 35 - (arr[i - 1] / max) * 30;
        path += ` Q ${(px + x) / 2} ${py}, ${x} ${y}`;
      }
    });

    return path;
  };

  // ===== Line Chart =====
  const LineChart = ({ arr }) => (
    <svg width="100%" height="50" viewBox="0 0 100 40">
      {/* Y Axis */}
      <line x1="5" y1="5" x2="5" y2="35" stroke="#a5d6a7" strokeWidth="2" />
      {/* X Axis */}
      <line x1="5" y1="35" x2="95" y2="35" stroke="#a5d6a7" strokeWidth="2" />

      <path
        d={getSmoothPath(arr)}
        fill="none"
        stroke={green}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  // ===== Bar Chart =====
  const BarChart = ({ arr }) => (
    <div className="mini-bars">
      {arr.map((v, i) => (
        <div
          key={i}
          className="bar"
          style={{ height: `${(v / Math.max(...arr)) * 100}%` }}
        ></div>
      ))}
    </div>
  );

  return (
    <div className="health-card">
      <div className="card-header">
        <span className="material-icons">{icon}</span>
        <span>{title}</span>
      </div>

      <div className="card-value">
        {value} {unit}
      </div>

      {title === "Steps" && <LineChart arr={data.Steps} />}
      {title === "Calories" && <BarChart arr={data.Calories} />}
      {title === "Heart Rate" && <LineChart arr={data.Heart} />}
      {title === "Sleep" && <BarChart arr={data.Sleep} />}
      {title === "Weight" && <LineChart arr={data.Weight} />}
      {title === "Blood Pressure" && (
        <div className="bp-note">Stable</div>
      )}
    </div>
  );
}


export default HealthCard;
