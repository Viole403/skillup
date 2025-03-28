"use client"

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const Newsletter = () => {
  return (
<div className="container mx-auto px-4 mb-16">
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
      </div>
  );
};