'use client';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-6 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-900">Admin Dashboard</h1>
        <p className="text-center text-gray-700 mb-8">A responsive admin panel with user management, statistics, and dark mode</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Features</CardTitle>
              <CardDescription>What's included in this admin dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                  User authentication system
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                  Responsive dashboard with statistics
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                  User management & detailed profiles
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                  Interactive charts & data visualization
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                  Dark/light theme toggle
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Technologies Used</CardTitle>
              <CardDescription>Built with modern web technologies</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-blue-500"></div>
                  Next.js & TypeScript
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-blue-500"></div>
                  Tailwind CSS
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-blue-500"></div>
                  Shadcn UI components
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-blue-500"></div>
                  Recharts for data visualization
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-blue-500"></div>
                  React Context API for state management
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img 
            src="/assets/admin-dashboard-preview.png" 
            alt="Admin Dashboard Preview"
            className="w-full h-auto"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/1200x600?text=Admin+Dashboard+Preview";
            }}
          />
        </div> */}
        
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Try It Out</CardTitle>
              <CardDescription>Login with these demo credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 items-center">
                  <span className="font-medium">Email:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded col-span-2">admin@example.com</code>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <span className="font-medium">Password:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded col-span-2">password123</code>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/miniprojects/adminboard/login" className="w-full">
                <Button className="w-full">
                  Open Admin Dashboard
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}