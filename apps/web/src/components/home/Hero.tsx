"use client"

import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { ChevronRight, Star } from "lucide-react"
import { Button } from "@/src/components/daisy-button"

export const Hero = () => {
  const [animatedElements, setAnimatedElements] = useState({
    startButton: false,
    syllabusButton: false
  })
  const startButtonRef = useRef<HTMLButtonElement>(null)
  const syllabusButtonRef = useRef<HTMLButtonElement>(null)

  // Setup animation on scroll for buttons
  useEffect(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }

      const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === startButtonRef.current) {
              setAnimatedElements(prev => ({ ...prev, startButton: true }))
            } else if (entry.target === syllabusButtonRef.current) {
              setAnimatedElements(prev => ({ ...prev, syllabusButton: true }))
            }
            observer.unobserve(entry.target)
          }
        })
      }

      const observer = new IntersectionObserver(handleIntersection, observerOptions)

      if (startButtonRef.current) {
        observer.observe(startButtonRef.current)
      }
      if (syllabusButtonRef.current) {
        observer.observe(syllabusButtonRef.current)
      }

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <section className="container px-4 pl-[26px] py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Column: Course Information */}
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="inline-flex gap-2 items-center bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium w-fit">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-primary" />
            <span>Trusted by over 10,000+ students</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Master Modern Web Development with Our Expert-Led Course
          </h1>

          <p className="text-base md:text-lg text-muted-foreground">
            Learn everything you need to build stunning, performant web applications from industry experts. Fully online and guided by senior practitioners.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button
              ref={startButtonRef}
              size="lg"
              className={`font-medium text-sm sm:text-base transition-all duration-700 ${
                animatedElements.startButton
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              Start Learning Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              ref={syllabusButtonRef}
              variant="outline"
              size="lg"
              className={`font-medium text-sm sm:text-base transition-all duration-700 delay-150 ${
                animatedElements.syllabusButton
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              Get Syllabus
            </Button>
          </div>

          <div className="mt-4 md:mt-6 p-3 sm:p-4 border border-primary/20 bg-primary/5 rounded-lg">
            <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Income Share Agreement (ISA)</h3>
            <p className="text-sm md:text-base text-muted-foreground">Focus on learning now, pay after you get hired. Our ISA allows you to start your journey with minimal upfront costs.</p>
            <Link href="#isa" className="text-primary font-medium inline-flex items-center gap-1 mt-2 text-sm hover:underline">
              Learn more about ISA
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Image & Video */}
        <div className="relative mt-4 md:mt-0">
          <div className="rounded-xl overflow-hidden border shadow-lg">
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              {/* Placeholder for actual image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Stats overlay */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
            <div className="bg-background border rounded-lg p-2 sm:p-4 shadow-sm">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">4.9</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Rating on Course Report</div>
            </div>
            <div className="bg-background border rounded-lg p-2 sm:p-4 shadow-sm">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">2000+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Graduates</div>
            </div>
            <div className="bg-background border rounded-lg p-2 sm:p-4 shadow-sm">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">92%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Hiring Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}