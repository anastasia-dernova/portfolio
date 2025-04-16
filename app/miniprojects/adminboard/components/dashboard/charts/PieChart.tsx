// components/dashboard/charts/PieChart.tsx
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartProps {
  data: {
    name: string;
    value: number;
  }[];
  colors?: string[];
}

export default function PieChart({ data, colors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"] }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: "#fff", borderRadius: "4px", border: "none" }}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}