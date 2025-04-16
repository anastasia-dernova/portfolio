// components/dashboard/charts/LineChart.tsx
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface LineChartProps {
  data: {
    name: string;
    value: number;
  }[];
  color?: string;
}

export default function LineChart({ data, color = "#8884d8" }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: "#fff", borderRadius: "4px", border: "none" }}
        />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ strokeWidth: 4 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}