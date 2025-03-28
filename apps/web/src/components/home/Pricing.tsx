import { CheckCircle2 } from "lucide-react"
import { Button } from "@/src/components/daisy-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { pricingPlans } from "./data"

export const Pricing = () => {
  return (
    <section id="pricing" className="container px-4 pl-[26px] py-20 border-t dark:border-gray-800">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Choose Your Learning Path</h2>
        <p className="text-muted-foreground dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Flexible pricing options to fit your needs and budget.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <Card key={index} className={`border dark:bg-gray-800/50 dark:border-gray-700 transition-all hover:shadow-md ${plan.featured ? 'border-primary dark:border-primary/70 shadow-lg relative overflow-hidden' : ''}`}>
            {plan.featured && (
              <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-xs font-medium text-primary-foreground rounded-bl-lg">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">{plan.price}</span>
                <span className="text-muted-foreground dark:text-gray-400 ml-1">/once</span>
              </div>
              <CardDescription className="mt-2 dark:text-gray-300">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="size-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.featured ? "default" : "ghost"}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}