"use client"

import { CheckCircle, X, Trophy, Award, GraduationCap, Globe, BadgeCheck } from "lucide-react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@/src/components/daisy-button"
import { useState, useEffect } from "react"
import Image from "next/image"

export const WhyChooseUs = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVideoModalOpen]);

  return (
    <section className="container px-4 pl-[26px] py-12 sm:py-16 md:py-20 border-t">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-primary text-sm font-semibold flex items-center gap-2">
          <span className="h-1 w-6 bg-primary rounded-full"></span>
          Why Choose Us
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-12">
        {/* Left Column: Text Content - Now 7 columns wide */}
        <div className="flex flex-col gap-5 md:col-span-7">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Our Commitment to Excellence, Learn, Grow & Success.
          </h3>

          <p className="text-muted-foreground text-sm md:text-base">
            We are passionate about transforming lives through education, ranking as the <span className="font-semibold text-foreground">#1 Coding Bootcamp</span> in the country for three consecutive years, reaching students across all 50 states.
          </p>

          {/* Achievement Badges Row 1 */}
          <div className="grid grid-cols-2 gap-3 mb-1">
            <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg">
              <Trophy className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Top Rated</p>
                <p className="text-xs text-muted-foreground">Education Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg">
              <Award className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">98% Placement</p>
                <p className="text-xs text-muted-foreground">Industry Success</p>
              </div>
            </div>
          </div>

          {/* Achievement Badges Row 2 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg">
              <Globe className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">National Reach</p>
                <p className="text-xs text-muted-foreground">50 States & 25+ Countries</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg">
              <GraduationCap className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">CPD Approved</p>
                <p className="text-xs text-muted-foreground">Professional Development</p>
              </div>
            </div>
          </div>

          {/* Official Verification Badges */}
          <div className="grid grid-cols-1 gap-3 mt-1">
            <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-lg">
              <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm">Verified by Komdigi</p>
                <p className="text-xs text-muted-foreground">Official PSE Registered Platform</p>
              </div>
              <div className="h-10 w-16 relative">
                <Image
                  src="https://satelitweb.com/wp-content/uploads/2020/11/pse-terdaftar.png"
                  alt="PSE Registered Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <ul className="space-y-2 mt-1">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm md:text-base">9/10 Average Satisfaction Rate</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm md:text-base">96% Completion Rate</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm md:text-base">Friendly Environment & Expert Teacher</span>
            </li>
          </ul>

          <Button variant="outline" className="w-fit flex items-center gap-2 mt-1">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* Right Column: Image with Overlay Elements - Now 5 columns wide */}
        <div className="relative md:col-span-5">
          <div className="rounded-xl overflow-hidden border shadow-lg h-full">
            <div className="aspect-[3/2] md:aspect-auto md:h-full relative">
              {/* Actual image from Unsplash */}
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Students learning together in a collaborative environment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />

              {/* Overlay to darken the image slightly */}
              <div className="absolute inset-0 bg-black/10"></div>

              {/* Rating badge */}
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-2 py-1.5 rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">4.6 (2.4k)</span>
                  <span className="text-[10px] text-muted-foreground">AVG Reviews</span>
                </div>
              </div>

              {/* Students badge */}
              <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-muted-foreground">36k+ Students</span>
                  <div className="flex -space-x-2 mt-1">
                    {[1, 2, 3, 4].map((_, index) => (
                      <div key={index} className="h-5 w-5 rounded-full bg-primary/20 border border-background"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Play button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  onClick={() => setIsVideoModalOpen(true)}
                  className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border bg-background">
          <CardContent className="pt-5 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">9K</div>
              <p className="text-muted-foreground text-sm">Successfully Trained</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-background">
          <CardContent className="pt-5 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">9.9K</div>
              <p className="text-muted-foreground text-sm">Courses Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-background">
          <CardContent className="pt-5 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">26.3K</div>
              <p className="text-muted-foreground text-sm">Satisfaction Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-background">
          <CardContent className="pt-5 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">30.6K</div>
              <p className="text-muted-foreground text-sm">Students Community</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="relative w-full max-w-4xl bg-background rounded-xl overflow-hidden">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Video presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}