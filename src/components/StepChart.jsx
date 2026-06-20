import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", steps: 4000 },
  { day: "Tue", steps: 5500 },
  { day: "Wed", steps: 6000 },
  { day: "Thu", steps: 7000 },
  { day: "Fri", steps: 6500 },
  { day: "Sat", steps: 8000 },
  { day: "Sun", steps: 7500 },
];

function StepsChart() {
  return (
      <LineChart width={250} height={120} data={data}>
        <XAxis dataKey="day" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="steps"
          stroke="#2f855a"
          strokeWidth={2}
        />
      </LineChart>
   
  );
}

export default StepsChart;
