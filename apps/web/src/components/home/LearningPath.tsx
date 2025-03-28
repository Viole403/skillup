import { CheckCircle2 } from "lucide-react"
import { Button } from "@/src/components/daisy-button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"

export const LearningPath = () => {
  return (
    <section className="container px-4 pl-[26px] py-20 border-t">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Learning Path</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          We provide learning programs that fit your needs in the digital industry.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="border hover:border-primary hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle>Bootcamp</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Intensive learning program that transforms beginners into job-ready digital talents.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Full Stack JavaScript</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Data Science & Analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Front-End Development</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardFooter>
        </Card>
        <Card className="border hover:border-primary hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle>Professional Development</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Part-time learning programs for upskilling in the IT field.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Web Developer Program</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Python for Data Science</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>UI/UX Design Fundamentals</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardFooter>
        </Card>
        <Card className="border hover:border-primary hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle>Corporate Training</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Customized employee training programs with flexible schedules.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Team Upskilling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Custom Curriculum</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Flexible Scheduling</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Learn More</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}