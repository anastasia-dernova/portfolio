"use client";

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';

export default function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}