import { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboard/Layout';
import { DashboardSkeleton } from '../components/dashboard/Skeleton';
import StatCard from '../components/dashboard/StatCard';
import BarChart from '../components/dashboard/charts/BarChart';
import LineChart from '../components/dashboard/charts/LineChart';
import PieChart from '../components/dashboard/charts/PieChart';
import { Users, UserCheck, Clock, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import userData from '../data/users.json';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    averageActivity: 0
  });
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState<{ name: string; value: number }[]>([]);
  const [userRoleData, setUserRoleData] = useState<{ name: string; value: number }[]>([]);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userData) {
        const totalUsers = userData.length;
        const activeUsers = userData.filter(user => user.status === 'online').length;
        const avgActivity = Math.floor(userData.reduce((sum, user) => sum + user.stats.completion, 0) / totalUsers);
        
        const activityDataPoints = [
          { name: 'Mon', value: 25 },
          { name: 'Tue', value: 38 },
          { name: 'Wed', value: 52 },
          { name: 'Thu', value: 43 },
          { name: 'Fri', value: 63 },
          { name: 'Sat', value: 28 },
          { name: 'Sun', value: 17 },
        ];
        
        const roles: { [key: string]: number } = {};
        userData.forEach(user => {
          roles[user.role] = (roles[user.role] || 0) + 1;
        });
        
        const roleDataPoints = Object.keys(roles).map(role => ({
          name: role,
          value: roles[role]
        }));
        
        setStats({
          totalUsers,
          activeUsers,
          averageActivity: avgActivity
        });
        
        setActivityData(activityDataPoints);
        setUserRoleData(roleDataPoints);
        setLoading(false);
      }
    }, 1000); 
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<Users className="h-5 w-5 text-purple-600" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard 
          title="Active Users" 
          value={stats.activeUsers} 
          icon={<UserCheck className="h-5 w-5 text-green-600" />}
          trend={{ value: 8, positive: true }}
        />
        <StatCard 
          title="Avg. Session Time" 
          value="24m" 
          icon={<Clock className="h-5 w-5 text-blue-600" />}
          trend={{ value: 3, positive: false }}
        />
        <StatCard 
          title="Activity Rate" 
          value={`${stats.averageActivity}%`} 
          icon={<Activity className="h-5 w-5 text-orange-600" />}
          trend={{ value: 5, positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>User Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={activityData} color="#8884d8" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Roles Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={userRoleData} />
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="completion">User Completion</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {user.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        {user.activity[0].action} - {new Date(user.activity[0].timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completion">
          <Card>
            <CardHeader>
              <CardTitle>User Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <BarChart 
                  data={userData.slice(0, 5).map(user => ({
                    name: user.name.split(' ')[0],
                    value: user.stats.completion
                  }))} 
                  color="#82ca9d"
                />
              </div>
              <div className="space-y-4">
                {userData.slice(0, 5).map((user) => (
                  <div key={user.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{user.name}</span>
                      <span>{user.stats.completion}%</span>
                    </div>
                    <Progress value={user.stats.completion} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}