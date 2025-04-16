// app/miniprojects/adminboard/contexts/AuthContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Use navigation instead of router

type User = {
  email: string;
  name: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  loading: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // This uses the new App Router navigation
  const pathname = usePathname(); // For checking current path

  useEffect(() => {
    // Check if user is logged in on mount
    if (typeof window !== 'undefined') { // Check for browser environment
      const storedUser = localStorage.getItem('admin-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Mock authentication - in a real app this would call an API
    if (email === "admin@example.com" && password === "password123") {
      const userData = {
        email,
        name: "Admin User",
        role: "Administrator"
      };
      localStorage.setItem('admin-user', JSON.stringify(userData));
      setUser(userData);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin-user');
    setUser(null);
    router.push('/miniprojects/adminboard/login'); // Update the path to match your structure
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);