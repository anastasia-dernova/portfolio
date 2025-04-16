import { useAuth } from "../../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '../ThemeToggle';

export default function Header() {
  const { user } = useAuth();
  
  return (
    <header className="bg-background border-b px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="md:flex-1 md:ml-16">
        <h1 className="text-xl font-semibold md:hidden">Admin Panel</h1>
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <button className="relative p-2 rounded-full hover:bg-muted">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/avatars/admin.png" />
            <AvatarFallback>{user?.name?.[0] || 'A'}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-muted-foreground">{user?.role || 'Administrator'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}