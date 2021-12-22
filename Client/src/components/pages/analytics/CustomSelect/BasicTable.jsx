import React from "react";
import "./style.css";

// hàm pie chart
export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Table

const BasicTable = (props) => {
  const { headers, rows } = props;

  return (
    <div className="container-table">
      <table>
        <thead>
          <tr>
            {headers &&
              headers.map((header, key) => <th key={key}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows &&
            rows.map((row, key) => {
              return (
                <tr key={key}>
                  {row.map((cell, key) => (
                    <td key={`${key} ${cell}`}>{cell}</td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
