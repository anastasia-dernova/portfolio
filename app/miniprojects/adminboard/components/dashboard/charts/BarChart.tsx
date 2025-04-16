// components/dashboard/charts/BarChart.tsx
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface BarChartProps {
  data: {
    name: string;
    value: number;
  }[];
  color?: string;
}

export default function BarChart({ data, color = "#8884d8" }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: "#fff", borderRadius: "4px", border: "none" }}
          cursor={{ fill: "rgba(136, 132, 216, 0.1)" }}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}