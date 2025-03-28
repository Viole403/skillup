import Image from "next/image"
import { mediaLogos } from "./data"

export const MediaCoverage = () => {
  return (
    <section className="bg-gradient-to-b py-12 sm:py-16 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 pl-[26px]">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Media Coverage</h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            SkillUp has been featured in various reputable media outlets across Indonesia
          </p>
        </div>

        <div className="relative w-full overflow-hidden rounded-lg bg-primary dark:bg-primary/90 p-5 shadow-md">
          {/* Marquee container with continuous animation */}
          <div className="flex animate-marquee-infinite" aria-label="Media partners carousel">
            {/* First set of logos */}
            <div className="flex items-center gap-6 sm:gap-8 md:gap-12 whitespace-nowrap">
              {mediaLogos.map((media) => (
                <div
                  key={`first-${media.id}`}
                  className="size-10 sm:size-12 md:size-14 w-28 sm:w-32 md:w-36 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center pointer-events-none"
                >
                  <Image
                    src={media.logo}
                    alt={`${media.name} logo`}
                    width={100}
                    height={40}
                    className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set of logos for seamless looping */}
            <div className="flex items-center gap-6 sm:gap-8 md:gap-12 whitespace-nowrap">
              {mediaLogos.map((media) => (
                <div
                  key={`second-${media.id}`}
                  className="size-10 sm:size-12 md:size-14 w-28 sm:w-32 md:w-36 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center pointer-events-none"
                >
                  <Image
                    src={media.logo}
                    alt={`${media.name} logo`}
                    width={100}
                    height={40}
                    className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}