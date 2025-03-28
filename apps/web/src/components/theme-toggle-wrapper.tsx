"use client"

import dynamic from "next/dynamic"

// Import the theme toggle with dynamic import to prevent SSR
const DaisyThemeToggle = dynamic(
  () => import('./daisy-theme-toggle').then(mod => mod.DaisyThemeToggle),
  { ssr: false } // This ensures the component only renders on client side
)

export function ThemeToggleWrapper() {
  return <DaisyThemeToggle />
}