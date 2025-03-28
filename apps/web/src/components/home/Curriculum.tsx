import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

export const Curriculum = () => {
  return (
    <section id="curriculum" className="container px-4 pl-[26px] py-20 border-t">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight">What You&apos;ll Learn</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Our comprehensive curriculum covers everything from the basics to advanced techniques.
        </p>
      </div>
      <Tabs defaultValue="fundamentals" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
        </TabsList>
        <TabsContent value="fundamentals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Web Development Foundations</CardTitle>
              <CardDescription>Master the core technologies of the web</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">HTML5 & CSS3 Mastery</h4>
                  <p className="text-sm text-muted-foreground">Learn modern HTML5 semantics and CSS3 layouts</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">JavaScript Essentials</h4>
                  <p className="text-sm text-muted-foreground">Core concepts, ES6+ features, and programming patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Responsive Design</h4>
                  <p className="text-sm text-muted-foreground">Create sites that work perfectly on any device</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="frontend" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Modern Frontend Development</CardTitle>
              <CardDescription>Build beautiful, interactive user interfaces</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">React & Next.js</h4>
                  <p className="text-sm text-muted-foreground">Component-based architecture and server-side rendering</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">TypeScript</h4>
                  <p className="text-sm text-muted-foreground">Type-safe JavaScript for larger applications</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Modern CSS Techniques</h4>
                  <p className="text-sm text-muted-foreground">Tailwind CSS, animations, and advanced layouts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="backend" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Backend & API Development</CardTitle>
              <CardDescription>Create robust server-side applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Node.js & Express</h4>
                  <p className="text-sm text-muted-foreground">Build scalable APIs and server-side applications</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Database Integration</h4>
                  <p className="text-sm text-muted-foreground">Work with SQL and NoSQL databases effectively</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Authentication & Security</h4>
                  <p className="text-sm text-muted-foreground">Implement secure authentication and authorization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}