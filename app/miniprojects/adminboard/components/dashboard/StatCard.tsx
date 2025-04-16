type StatCardProps = {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
      value: number;
      positive: boolean;
    };
  };
  
  export default function StatCard({ title, value, icon, trend }: StatCardProps) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            
            {trend && (
              <div className="flex items-center mt-1">
                <span className={trend.positive ? "text-green-500" : "text-red-500"}>
                  {trend.positive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            )}
          </div>
          
          <div className="p-2 bg-purple-100 rounded-lg">
            {icon}
          </div>
        </div>
      </div>
    );
}