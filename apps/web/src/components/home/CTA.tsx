import { ChevronRight, GraduationCap } from "lucide-react"
import { Button } from "@/src/components/daisy-button"

export const CTA = () => {
  return (
    <section className="container px-4 pl-[26px] py-20 border-t dark:border-gray-800">
      <div className="max-w-4xl mx-auto bg-primary/10 dark:bg-primary/20 p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Ready to Transform Your Career?</h2>
            <p className="text-muted-foreground dark:text-gray-300">
              Join thousands of successful students who have taken their skills to the next level with our comprehensive course.
            </p>
            <Button size="lg" variant="accent" className="mt-2">
              Enroll Now
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="size-32 md:size-48 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center">
              <GraduationCap className="size-16 md:size-24 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}