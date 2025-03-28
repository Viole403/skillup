import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { testimonials } from "./data"

export const Testimonials = () => {
  return (
    <section id="testimonials" className="container px-4 pl-[26px] py-20 border-t dark:border-gray-800">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">What Our Students Say</h2>
        <p className="text-muted-foreground dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Thousands of developers have transformed their careers with our course.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border bg-background dark:bg-gray-800/50 dark:border-gray-700 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary">
                  <span className="text-primary-foreground font-medium">{testimonial.avatar}</span>
                </div>
                <div>
                  <CardTitle className="text-base text-gray-900 dark:text-gray-100">{testimonial.name}</CardTitle>
                  <CardDescription className="dark:text-gray-400">{testimonial.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground dark:text-gray-300">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}