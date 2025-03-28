"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Search,
  X
} from "lucide-react"
import { Button } from "@/src/components/daisy-button"
import { ThemeToggleWrapper } from "@/src/components/theme-toggle-wrapper"

import { categories } from "./data"

export const Header = () => {
  const [categorySearch, setCategorySearch] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showStickyNav, setShowStickyNav] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)
  const categoryInputRef = useRef<HTMLInputElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const filteredCategories = categorySearch.trim() === ""
    ? categories
    : categories.filter(category =>
        category.toLowerCase().includes(categorySearch.toLowerCase())
      )

  useEffect(() => {
    if (!isCategoryOpen) {
      setCategorySearch("")
    } else if (categoryInputRef.current) {
      setTimeout(() => {
        categoryInputRef.current?.focus()
      }, 100)
    }
  }, [isCategoryOpen])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setActiveSubmenu(null)
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Clean up any pending timeouts when the component unmounts
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownMouseEnter = (dropdown: string) => {
    // Clear any pending timeout to close the dropdown
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }

    // Set active dropdown
    setActiveDropdown(dropdown);

    // Set first submenu item as active by default
    if (dropdown === 'program') {
      setActiveSubmenu('bootcamp');
    } else if (dropdown === 'about') {
      setActiveSubmenu('admissions');
    }

    // Close category dropdown if it was open
    if (dropdown !== 'categories') {
      setIsCategoryOpen(false);
    }
  };

  const handleDropdownMouseLeave = () => {
    // Add a small delay before closing to avoid flickering
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 150);
  };

  const handleSubmenuHover = (submenu: string) => {
    // Clear any pending timeout to change the submenu
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }

    setActiveSubmenu(submenu);
  }

  const handleCategoryMouseEnter = () => {
    // Clear any pending timeout to close the dropdown
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }

    setIsCategoryOpen(true);
    setActiveDropdown(null);
  };

  const handleCategoryMouseLeave = () => {
    // Add a small delay before closing to avoid flickering
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsCategoryOpen(false);
    }, 150);
  };

  // Mega menu content for different sections
  const programMenuContent = (
    <div className="flex w-full">
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
        <div className="py-2">
          <div
            className={`px-4 py-3 cursor-pointer ${activeSubmenu === 'bootcamp' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onMouseEnter={() => handleSubmenuHover('bootcamp')}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Bootcamp</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <div
            className={`px-4 py-3 cursor-pointer ${activeSubmenu === 'professional' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onMouseEnter={() => handleSubmenuHover('professional')}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Professional Development</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <div
            className={`px-4 py-3 cursor-pointer ${activeSubmenu === 'private' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onMouseEnter={() => handleSubmenuHover('private')}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Private</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <div
            className={`px-4 py-3 cursor-pointer ${activeSubmenu === 'campus' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onMouseEnter={() => handleSubmenuHover('campus')}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Campus Programs</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-2/3 p-4">
        {activeSubmenu === 'bootcamp' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Full-Day Bootcamp</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Transform beginners into job-ready digital talent</p>

            <Link href="/programs/full-stack-javascript" className="block py-2 text-sm hover:text-primary">
              Full Stack JavaScript Immersive
            </Link>
            <Link href="/programs/data-science" className="block py-2 text-sm hover:text-primary">
              Data Science & Data Analyst
            </Link>

            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-5 mb-3">Night Bootcamp</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Learn with a more flexible schedule</p>

            <Link href="/programs/comprehensive-data-analytics" className="block py-2 text-sm hover:text-primary">
              Comprehensive Data Analytics
            </Link>
            <Link href="/programs/digital-marketing" className="block py-2 text-sm hover:text-primary">
              Digital Marketing
            </Link>
            <Link href="/programs/frontend-react" className="block py-2 text-sm hover:text-primary">
              Front End React
            </Link>
          </div>
        )}

        {activeSubmenu === 'professional' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Professional Development</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">After-hours programs for IT upskilling</p>

            <Link href="/programs/web-developer" className="block py-2 text-sm hover:text-primary">
              Web Developer Program
            </Link>
            <Link href="/programs/python-data-science" className="block py-2 text-sm hover:text-primary">
              Python for Data Science
            </Link>
            <Link href="/programs/business-intelligence" className="block py-2 text-sm hover:text-primary">
              Business Intelligence
            </Link>
            <Link href="/programs/project-management" className="block py-2 text-sm hover:text-primary">
              Project Management
            </Link>
            <Link href="/programs/ui-ux-design" className="block py-2 text-sm hover:text-primary">
              UI/UX Design Fundamentals
            </Link>
          </div>
        )}

        {activeSubmenu === 'private' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Private Classes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Learn with more freedom in a private class setting</p>

            <Link href="/programs/private-full-stack" className="block py-2 text-sm hover:text-primary">
              Private Full Stack Development
            </Link>
            <Link href="/programs/private-data-science" className="block py-2 text-sm hover:text-primary">
              Private Data Science
            </Link>
            <Link href="/programs/private-ui-ux" className="block py-2 text-sm hover:text-primary">
              Private UI/UX Design
            </Link>
          </div>
        )}

        {activeSubmenu === 'campus' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Campus Programs</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Enhance your skills with our campus partnerships</p>

            <Link href="/programs/campus-web-development" className="block py-2 text-sm hover:text-primary">
              Web Development
            </Link>
            <Link href="/programs/campus-data-science" className="block py-2 text-sm hover:text-primary">
              Data Science
            </Link>
            <Link href="/programs/campus-mobile-development" className="block py-2 text-sm hover:text-primary">
              Mobile Development
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  const aboutMenuContent = (
    <div className="flex w-full">
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
        <div className="py-2">
          <div
            className={`px-4 py-3 cursor-pointer ${activeSubmenu === 'admissions' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onMouseEnter={() => handleSubmenuHover('admissions')}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Admissions</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <div
            className={`px-4 py-3 cursor-pointer ${activeSubmenu === 'students' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onMouseEnter={() => handleSubmenuHover('students')}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Students</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <div
            className={`px-4 py-3 cursor-pointer ${activeSubmenu === 'impact' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onMouseEnter={() => handleSubmenuHover('impact')}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Impact</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-2/3 p-4">
        {activeSubmenu === 'admissions' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Admissions</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">We&apos;re ready to address your questions</p>

            <Link href="/about/admissions-info" className="block py-2 text-sm hover:text-primary">
              Admissions Info
            </Link>
            <Link href="/about/financial-options" className="block py-2 text-sm hover:text-primary">
              Financial Options
            </Link>
            <Link href="/about/partners" className="block py-2 text-sm hover:text-primary">
              Financial Partners
            </Link>
          </div>
        )}

        {activeSubmenu === 'students' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Students</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Learn about our student community</p>

            <Link href="/about/outcomes" className="block py-2 text-sm hover:text-primary">
              Outcomes
            </Link>
            <Link href="/about/portfolio" className="block py-2 text-sm hover:text-primary">
              Portfolio
            </Link>
            <Link href="/about/success-stories" className="block py-2 text-sm hover:text-primary">
              Success Stories
            </Link>
          </div>
        )}

        {activeSubmenu === 'impact' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Impact Report</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Our impact on improving lives through education</p>

            <Link href="/about/impact-report" className="block py-2 text-sm hover:text-primary">
              Impact Report
            </Link>
            <Link href="/about/community-initiatives" className="block py-2 text-sm hover:text-primary">
              Community Initiatives
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <header>
      {/* Top Bar with Categories */}
      <div className="w-full border-b bg-background py-2 hidden md:block">
        <div className="container flex items-center justify-between pl-[26px] pr-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Categories</span>
            <div className="flex flex-wrap items-center gap-4 ml-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/course/categories/${category.toLowerCase().replace(' ', '-')}`}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${showStickyNav ? 'shadow-md' : ''} bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
        <div className="container flex h-16 items-center justify-between py-4 pl-[26px] pr-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6" />
              <span className="text-xl font-bold">SkillUp</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 ml-6" ref={dropdownRef}>
              {/* Categories Dropdown */}
              <div
                className="relative dropdown-trigger"
                ref={categoryRef}
                onMouseEnter={handleCategoryMouseEnter}
                onMouseLeave={handleCategoryMouseLeave}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
                  aria-expanded={isCategoryOpen}
                  aria-haspopup="true"
                >
                  <span>Categories</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoryOpen && (
                  <div
                    className="absolute z-50 top-full left-0 mt-1 bg-background border rounded-lg shadow-lg p-4 w-[300px] dropdown-menu"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="categories-menu"
                  >
                    <div className="mb-3 pb-2 border-b">
                      <h3 className="font-medium text-sm mb-2">Categories</h3>
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          ref={categoryInputRef}
                          type="text"
                          placeholder="Search categories..."
                          className="w-full pl-8 pr-2 py-1.5 text-sm rounded border border-input bg-background h-8 focus:outline-none focus:ring-1 focus:ring-primary"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2 max-h-[250px] overflow-y-auto">
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, index) => (
                          <Link
                            key={index}
                            href={`/course/categories/${category.toLowerCase().replace(' ', '-')}`}
                            className={`text-sm py-2 px-3 hover:bg-primary/10 rounded-md text-muted-foreground hover:text-foreground flex items-center ${index === 0 && isCategoryOpen ? 'bg-primary/5 text-foreground' : ''}`}
                            onClick={() => setIsCategoryOpen(false)}
                            role="menuitem"
                          >
                            {category}
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground py-2 px-3">No categories found</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Program Dropdown */}
              <div
                className="relative dropdown-trigger"
                onMouseEnter={() => handleDropdownMouseEnter('program')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
                  aria-expanded={activeDropdown === 'program'}
                  aria-haspopup="true"
                >
                  Program
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'program' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'program' && (
                  <div
                    className="absolute z-50 top-full left-0 mt-1 bg-background border rounded-lg shadow-lg w-[700px] dropdown-menu"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="program-menu"
                  >
                    {programMenuContent}
                  </div>
                )}
              </div>

              <Link href="/for-company" className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">
                For Company
                      </Link>

              <Link href="/prakerja" className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">
                Prakerja
                      </Link>

              {/* About Dropdown */}
              <div
                className="relative dropdown-trigger"
                onMouseEnter={() => handleDropdownMouseEnter('about')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:bg-muted rounded-md"
                  aria-expanded={activeDropdown === 'about'}
                  aria-haspopup="true"
                >
                  About
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'about' && (
                  <div
                    className="absolute z-50 top-full left-0 mt-1 bg-background border rounded-lg shadow-lg w-[600px] dropdown-menu"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="about-menu"
                  >
                    {aboutMenuContent}
                  </div>
                )}
              </div>

              <Link href="/blog" className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">
                Blog
              </Link>

              <Link href="/contact" className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">
                Contact
              </Link>

            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search bar - desktop */}
            <div className="hidden md:flex items-center relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 text-sm rounded-full border border-input bg-background h-9 w-[180px] lg:w-[220px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <ThemeToggleWrapper />
              <Link href="#signin" className="text-sm font-medium px-3 py-1.5 hover:bg-muted rounded-md">
                Sign In
              </Link>
              <Button size="sm">Sign Up</Button>
            </div>

            {/* Mobile buttons */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Search button - visible on mobile */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <ThemeToggleWrapper />
            </div>
          </div>
        </div>

        {/* Search bar overlay - mobile only */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-border py-3 px-4 bg-background">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 text-sm rounded-full border border-input bg-background h-9 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                autoFocus
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}