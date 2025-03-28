"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/src/lib/utils"

export function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / scrollHeight, 1)

      setScrollProgress(progress)
      setIsVisible(scrollTop > 300) // Show button after scrolling 300px
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  // Calculate the circle dasharray and dashoffset based on progress
  const circumference = 2 * Math.PI * 18 // 18 is the radius of the circle
  const dashoffset = circumference * (1 - scrollProgress)

  return (
    <div
      className={cn(
        "fixed bottom-8 right-8 z-50 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <button
        onClick={scrollToTop}
        className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-all relative flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" className="relative z-10">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            transform="rotate(-90 20 20)"
            className="transition-all duration-200 ease-in-out"
          />
          {/* TODO: Fix icon center */}
          <ArrowUp className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </svg>
      </button>
    </div>
  )
}

export default ScrollToTop