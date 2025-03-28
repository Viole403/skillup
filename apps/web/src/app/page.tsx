import {
  Header,
  Hero,
  CompaniesSection,
  WhyChooseUs,
  LearningPath,
  Features,
  Curriculum,
  Testimonials,
  Pricing,
  FAQ,
  // CTA,
  MediaCoverage,
  Footer,
  ScrollToTop
} from "@/src/components/home"

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <CompaniesSection />
        <WhyChooseUs />
        <LearningPath />
        <Curriculum />
        <Testimonials />
        <Pricing />
        <FAQ />
        {/* <CTA /> */}
        <MediaCoverage />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
