import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/dashboard/Header';
import Sidebar from '../../components/dashboard/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Mail, Phone, User, MapPin, Edit } from 'lucide-react';
import userData from '../../data/users.json';

export default function UserDetail() {
  const { user: authUser, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/admin/login');
    }
    
    if (id && userData) {
      const foundUser = userData.find(u => u.id === Number(id));
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, [authUser, loading, router, id]);
  
  if (loading || !authUser) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <div>User not found</div>;
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/admin/users">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">User Profile</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                    {user.name[0]}
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
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
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>New York, USA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span>Joined {new Date(user.lastLogin).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-2">User Statistics</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{user.stats.projects}</p>
                      <p className="text-xs text-gray-500">Projects</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.stats.tasks}</p>
                      <p className="text-xs text-gray-500">Tasks</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.stats.completion}%</p>
                      <p className="text-xs text-gray-500">Completion</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="activity">
                <TabsList className="mb-4">
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="activity" className="space-y-4">
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
                              <p className="mt-2 text-sm text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed euismod, diam sit amet dictum aliquam.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="projects">
                  <Card>
                    <CardHeader>
                      <CardTitle>Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Project data would go here...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Settings form would go here...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}