import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => router.pathname === path;
  
  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 md:hidden z-30 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar for desktop */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 z-20 transition duration-200 ease-in-out flex flex-col bg-gray-900 text-white w-64 p-4`}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link href="/admin/dashboard">
            <Button 
              variant={isActive('/admin/dashboard') ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button 
              variant={isActive('/admin/users') ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button 
              variant={isActive('/admin/settings') ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
        
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}