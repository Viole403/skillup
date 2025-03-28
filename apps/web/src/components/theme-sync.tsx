"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

/**
 * This component ensures that the daisyUI data-theme attribute
 * stays in sync with the next-themes theme in all situations
 */
export function ThemeSync() {
  const { resolvedTheme } = useTheme()

  // Sync the theme whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!resolvedTheme) return;

    // Update data-theme based on the resolved theme
    document.documentElement.setAttribute(
      'data-theme',
      resolvedTheme === 'dark' ? 'dark' : 'light'
    )
  }, [resolvedTheme])

  // This component doesn't render anything - it just syncs the theme
  return null
}