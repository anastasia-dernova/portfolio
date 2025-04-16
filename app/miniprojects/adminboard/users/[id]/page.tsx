"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, Mail, User } from 'lucide-react';

const mockUsers = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    role: "Admin", 
    status: "online",
    lastLogin: "2023-05-15",
    activity: [
      { action: "Logged in", timestamp: "2023-05-15T10:30:00" },
      { action: "Updated profile", timestamp: "2023-05-15T11:45:00" },
      { action: "Created project", timestamp: "2023-05-15T14:20:00" }
    ]
  },
  // Add more mock users
];

export default function UserDetail() {
  const { user: authUser, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/miniprojects/adminboard/login');
    }
    
    if (params.id) {
      const foundUser = mockUsers.find(u => u.id === Number(params.id));
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, [authUser, loading, router, params]);
  
  if (loading || !authUser) {
    return <div className="p-8">Loading user data...</div>;
  }
  
  if (!user) {
    return (
      <div className="p-8">
        <Link href="/miniprojects/adminboard/users">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
          </Button>
        </Link>
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">User Not Found</h2>
          <p className="text-gray-500">The requested user could not be found.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/miniprojects/adminboard/users">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">User Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-0">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl text-purple-600 font-medium">
                {user.name[0]}
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold mt-4">{user.name}</h2>
            <p className="text-gray-500">{user.role}</p>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>Joined {new Date(user.lastLogin).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-2">Status</h3>
              <div className="flex items-center">
                <div className={`h-2.5 w-2.5 rounded-full mr-2 ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="capitalize">{user.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="mb-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {user.activity.map((item, i) => (
                      <div key={i} className="flex">
                        <div className="mr-4 relative">
                          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-purple-600" />
                          </div>
                          {i < user.activity.length - 1 && (
                            <div className="absolute top-9 left-4 w-0.5 h-16 bg-gray-200"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>User Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">User settings would go here...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}