"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// interface ThemeProviderProps {
//   children: React.ReactNode;
//   attribute?: string;
//   defaultTheme?: string;
//   enableSystem?: boolean;
//   [key: string]: any;
// }

// export function ThemeProvider({ 
//   children,
//   ...props
// }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }

export function ThemeProvider({ children, ...props }: React.PropsWithChildren<any>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}