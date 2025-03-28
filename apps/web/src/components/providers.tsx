"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize daisyUI theme based on system preference - client side only
  React.useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.setAttribute(
        "data-theme",
        isDarkMode ? "dark" : "light"
      )
    }
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      themes={['light', 'dark']} /* Limit available themes to prevent unexpected values */
    >
      {children}
    </NextThemesProvider>
  )
}
