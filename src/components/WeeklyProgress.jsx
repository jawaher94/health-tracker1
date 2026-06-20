import React from "react";
import "./WeeklyProgress.css";

function WeeklyProgress() {
  const goal = 8000;
  const stepsData = [7000, 8500, 9000, 6000, 8200, 10000, 7500]; // بيانات تجريبية

  const today = new Date();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalDays = 35; // عدد الأيام الكلي للعرض (5 أسابيع كمثال)

  // بدء العد من أول يوم أحد في الأسبوع الحالي
  const firstSunday = new Date(today);
  firstSunday.setDate(today.getDate() - today.getDay());

  // إنشاء مصفوفة كل يوم مع رقم اليوم والشهر
  let allDays = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(firstSunday);
    date.setDate(firstSunday.getDate() + i);
    allDays.push({
      dayNumber: date.getDate(),
      monthName: date.toLocaleString("en-US", { month: "short" }), // Jan, Feb...
      isToday: date.toDateString() === today.toDateString(),
      steps: stepsData[i % 7] || 0,
      dayOfWeek: date.getDay(), // 0=Sun
    });
  }

  // تحويل كل يوم إلى عمود حسب يوم الأسبوع
  const columns = daysOfWeek.map((_, dayIndex) =>
    allDays.filter((d) => d.dayOfWeek === dayIndex)
  );

  return (
    <div className="weekly-box">
      <h3>Weekly Program - {today.toLocaleDateString("en-US" ,{month:"long"})}</h3>
      <div className="calendar-row">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="calendar-column">
            <span className="day-name">{daysOfWeek[colIndex]}</span>
            {col.map((d, i) => {
              // تحقق إذا تغير الشهر، أضف سطر فارغ مع اسم الشهر الجديد
              const prevMonth = i > 0 ? col[i - 1].monthName : d.monthName;
              const showMonthDivider = prevMonth !== d.monthName;
              return (
                <React.Fragment key={i}>
                  {showMonthDivider && (
                    <div className="month-divider">{d.monthName}</div>
                  )}
                  <div
                    className={`calendar-day ${d.isToday ? "today" : ""}`}
                  >
                    <span className="date">{d.dayNumber}</span>
                    <span className={d.steps >= goal ? "ok" : "no"}>
                      {d.steps >= goal ? "✓" : "✕"}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}



export default WeeklyProgress;










