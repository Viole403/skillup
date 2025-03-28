import Image from "next/image";
import { companyLogos } from "./data";

export const CompaniesSection = () => {
  return (
    <section className="container px-4 pl-[26px] py-8 sm:py-12 border-t">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-center mb-8 sm:mb-12">
        1600+ SkillUp Graduates Have Worked in
      </h2>
      <div className="relative w-full overflow-hidden rounded-lg bg-primary dark:bg-primary/90 p-5 shadow-md">
        {/* Company logos carousel - with infinite scrolling effect */}
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee-infinite pointer-events-none">
            {/* First set of logos */}
            <div className="flex items-center">
              {companyLogos.map((company) => (
                <div
                  key={company.id}
                  className="mx-8 sm:mx-12 w-[180px] h-20 flex items-center justify-center rounded px-4 bg-white dark:bg-gray-800 transition-colors flex-shrink-0"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={company.width}
                    height={company.height}
                    className="w-auto h-12 object-contain filter dark:invert"
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="flex items-center">
              {companyLogos.map((company) => (
                <div
                  key={`duplicate-${company.id}`}
                  className="mx-8 sm:mx-12 w-[180px] h-20 flex items-center justify-center rounded px-4 bg-white dark:bg-gray-800 transition-colors flex-shrink-0"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={company.width}
                    height={company.height}
                    className="w-auto h-12 object-contain filter dark:invert"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 sm:mt-8 text-base sm:text-xl font-semibold">
        and 750+ Other Hiring Partners
      </div>
    </section>
  );
};