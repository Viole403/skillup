"use client"

import Link from "next/link"
import { LayoutDashboard, ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { internationalPayments, localPayments } from './data'; // Import payment images
import { Newsletter } from "./Newsletter"


export const Footer = () => {
  const [icons, setIcons] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const loadIcons = async () => {
      const feather = await import('feather-icons')
      const socialIcons = {
        facebook: feather.icons.facebook.toSvg({ class: 'size-5' }),
        twitter: feather.icons.twitter.toSvg({ class: 'size-5' }),
        instagram: feather.icons.instagram.toSvg({ class: 'size-5' }),
        github: feather.icons.github.toSvg({ class: 'size-5' }),
        linkedin: feather.icons.linkedin.toSvg({ class: 'size-5' })
      }
      setIcons(socialIcons)
    }

    loadIcons()
  }, [])

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-16 pb-8">
      {/* Newsletter Subscription Banner */}
      <Newsletter /> {/* Use the new Newsletter component */}
      {/* <div className="container mx-auto px-4 mb-16">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
          <div className="absolute inset-0 opacity-20%">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Students collaborating"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 sm:p-8 md:p-10 relative z-10">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Subscribe for newsletters</h3>
              <p className="text-sm sm:text-base text-white/90">Get the latest updates, courses and learning resources</p>

              <div className="relative max-w-md group">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full py-3 pl-4 pr-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-50 group-hover:scale-105 transition-all duration-300">
                  <ArrowRight className="size-5" />
                </button>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="rounded border-white/30 bg-white/10 text-indigo-600 focus:ring-indigo-500/50 size-4 transition-colors" />
                <span className="text-sm text-white/90 group-hover:text-white transition-colors">I agree to receive newsletters and accept the data privacy statement</span>
              </label>
            </div>

            <div className="hidden md:flex justify-end">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg border border-white/10 max-w-xs">
                <h4 className="text-lg font-semibold text-white mb-3">Join Us Today</h4>
                <div className="space-y-3">
                  <Link
                    href="/join-community"
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-md transition-all duration-300 group"
                  >
                    <div>
                      <h5 className="font-medium text-white">Join our community</h5>
                      <p className="text-xs text-white/80">Connect with fellow learners</p>
                    </div>
                    <ArrowRight className="size-4 text-white opacity-70% group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/join-to-be-instructor"
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-md transition-all duration-300 group"
                  >
                    <div>
                      <h5 className="font-medium text-white">Become an instructor</h5>
                      <p className="text-xs text-white/80">Share your knowledge with others</p>
                    </div>
                    <ArrowRight className="size-4 text-white opacity-70% group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="size-6 text-primary" />
              <span className="text-xl font-bold text-primary">SkillUp</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
              SkillUp exceeded all my expectations! The instructors were not only experts but also great mentors.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                <span dangerouslySetInnerHTML={{ __html: icons.facebook || '' }} />
              </Link>
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                <span dangerouslySetInnerHTML={{ __html: icons.twitter || '' }} />
              </Link>
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                <span dangerouslySetInnerHTML={{ __html: icons.instagram || '' }} />
              </Link>
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                <span dangerouslySetInnerHTML={{ __html: icons.github || '' }} />
              </Link>
              <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                <span dangerouslySetInnerHTML={{ __html: icons.linkedin || '' }} />
              </Link>
            </div>

            {/* Download Apps Section */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Download Apps:</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="#" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" className="text-gray-700 dark:text-gray-300">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <span className="text-xs">Google Play</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" className="text-gray-700 dark:text-gray-300">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                      <path d="M12 8l-4 4h3v4h2v-4h3l-4-4z"></path>
                    </svg>
                  </div>
                  <span className="text-xs">App Store</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" className="text-gray-700 dark:text-gray-300">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4M12 8h.01"></path>
                    </svg>
                  </div>
                  <span className="text-xs">AppGallery</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" className="text-gray-700 dark:text-gray-300">
                      <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <span className="text-xs">Galaxy Store</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" className="text-gray-700 dark:text-gray-300">
                      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
                    </svg>
                  </div>
                  <span className="text-xs">GetApps</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">About us</Link></li>
              <li><Link href="/courses" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Courses</Link></li>
              <li><Link href="/instructor" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Instructor</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Blogs</Link></li>
              <li><Link href="/join-community" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Join Community</Link></li>
            </ul>
          </div>

          {/* Category Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Category</h3>
            <ul className="space-y-2">
              <li><Link href="/category/ui-ux" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">UI/UX Design</Link></li>
              <li><Link href="/category/web-dev" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="/category/python" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Python Development</Link></li>
              <li><Link href="/category/marketing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Digital Marketing</Link></li>
              <li><Link href="/category/graphic" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Graphic Design</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="size-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">(207) 555-0119</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">(704) 555-0127</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="size-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">dwello@gmail.com</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">eduall@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">5488 Irker Rd.</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">8745 Ilker Dr.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Subscribe Here</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Enter your email address to register to our newsletter subscription
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email..."
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 size-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-focus transform group-hover:scale-110 transition-all duration-300">
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} SkillUp All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Terms & Conditions</Link>
            </div>
          </div>

          {/* Payment Images */}
          <div className="flex justify-center md:justify-end items-center mt-4 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">We accept:</span>

              {/* Container for all payment images */}
              <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 px-3 py-2 rounded-lg flex-wrap">
                {/* Display all international payment images */}
                {internationalPayments.map((payment, index) => (
                  <Image
                    key={index}
                    src={payment.src}
                    alt={payment.alt}
                    width={45}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                ))}

                {/* Display all local payment images */}
                {localPayments.map((payment, index) => (
                  <Image
                    key={index}
                    src={payment.src}
                    alt={payment.alt}
                    width={45}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}