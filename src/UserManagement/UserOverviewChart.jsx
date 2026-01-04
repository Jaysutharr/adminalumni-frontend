import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Students", value: 70 },
  { name: "Mentors", value: 20 },
  { name: "Others", value: 10 }
];

const COLORS = ["#6CC7D1", "#4F9DA6", "#1F3C40"];

const UserOverviewChart = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <PieChart width={260} height={260}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>

      <div className="chart-center">
        <h3>Total</h3>
        <h2>5,340</h2>
      </div>

      <div className="chart-legend">
        <span><i style={{ background: COLORS[0] }} /> Students</span>
        <span><i style={{ background: COLORS[1] }} /> Mentors</span>
        <span><i style={{ background: COLORS[2] }} /> Others</span>
      </div>
    </div>
  );
};

export default UserOverviewChart;
