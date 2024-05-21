'use client'
import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#EEF7FF','#C5FF95'];

// interfacing props
interface DemoPieChartProps {
  totalRecordAmount: number;
  budgetRemaining: number
}

const BudgetDetailsPieChart: React.FC<DemoPieChartProps> = ({ totalRecordAmount, budgetRemaining }) => {
  const data = [
    { name: 'Spent', value: totalRecordAmount },
    { name: 'Remaining', value: budgetRemaining }, // Adjust the remaining value as needed
  ];

  return (
    
      <PieChart width={400} height={350}>
        <Pie
          data={data}
          cy={150}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          stroke="#000000"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

  );
}

export default BudgetDetailsPieChart;
