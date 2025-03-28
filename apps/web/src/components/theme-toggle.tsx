"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle theme change - update both next-themes and daisyUI
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <div className="flex items-center justify-center">
      <label className="swap swap-rotate hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 rounded-full transition-colors">
        {/* Hidden checkbox controls the state */}
        <input
          type="checkbox"
          className="theme-controller"
          checked={theme === 'dark'}
          onChange={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
        />

        {/* Sun icon */}
        <Sun className="swap-off size-5 text-yellow-500 dark:text-yellow-400" />

        {/* Moon icon */}
        <Moon className="swap-on size-5 text-indigo-600 dark:text-indigo-400" />
      </label>
    </div>
  )
}