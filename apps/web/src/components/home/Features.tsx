import { features } from "./data"

export const Features = () => {
  return (
    <section id="features" className="container py-24 border-t dark:border-gray-800 px-6 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left side with title and intro text */}
        <div className="lg:col-span-5 space-y-6 lg:pl-4">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium mb-2">
            Our Features
          </div>
          <h2 className="text-4xl font-bold tracking-tight leading-tight text-gray-900 dark:text-gray-100">
            Why Choose Our <span className="text-primary">Course?</span>
          </h2>
          <p className="text-muted-foreground dark:text-gray-300 text-lg">
            We&apos;ve designed this course to give you everything you need to succeed as a modern web developer. Our approach combines expert instruction with practical hands-on projects.
          </p>
          <div className="stats shadow bg-base-200 dark:bg-gray-800/50 w-full lg:w-[80%]">
            <div className="stat">
              <div className="stat-title dark:text-gray-300">Students</div>
              <div className="stat-value text-primary">25K+</div>
              <div className="stat-desc dark:text-gray-400">From 50+ countries</div>
            </div>
            <div className="stat">
              <div className="stat-title dark:text-gray-300">Courses</div>
              <div className="stat-value dark:text-gray-100">100+</div>
              <div className="stat-desc dark:text-gray-400">In multiple categories</div>
            </div>
          </div>
        </div>

        {/* Right side with feature cards */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-base-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="card-body p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 size-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <feature.icon className="size-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="card-title text-lg mb-2 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                      <p className="text-muted-foreground dark:text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}