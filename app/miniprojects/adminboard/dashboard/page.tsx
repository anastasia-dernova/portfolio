// app/miniprojects/adminboard/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Clock, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon, trend }) => (
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

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/miniprojects/adminboard/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="p-8">Loading dashboard...</div>;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value="1,234" 
          icon={<Users className="h-5 w-5 text-purple-600" />}
          trend={{ value: 12, positive: true }}
        />
        <StatCard 
          title="Active Users" 
          value="789" 
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
          value="67%" 
          icon={<Activity className="h-5 w-5 text-orange-600" />}
          trend={{ value: 5, positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    U{i}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">User {i}</p>
                    <p className="text-sm text-gray-500">
                      Last activity: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 justify-center items-center h-64">
              <p className="text-xl">Chart Placeholder</p>
              <p className="text-gray-500 text-sm">User activity data visualization would go here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}