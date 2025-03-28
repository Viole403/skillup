import { faqs } from "./data";
import Image from "next/image";

export const FAQ = () => {
  return (
    <section className="container mx-auto px-4 py-20 border-t dark:border-gray-800">
      <div className="text-center mb-12">
        <h6 className="text-primary font-medium mb-2">Frequently Asked Questions (FAQs)</h6>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Find Answers to Your Questions</h2>
        <p className="text-muted-foreground dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Welcome to our FAQs section! Here, we&apos;ve compiled answers to some of the most common questions our users ask.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left side image - single image with teacher and student */}
        <div className="relative overflow-hidden rounded-xl shadow-xl h-[500px] transform transition-transform duration-300 hover:scale-[1.02]">
          <Image
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Teacher and student learning together"
            fill
            className="object-cover rounded-xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Right side FAQ content */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box shadow-sm">
              <input type="radio" name="faq-accordion" className="peer" defaultChecked={index === 0} />
              <div className="collapse-title text-xl font-medium text-gray-900 dark:text-gray-100 flex items-center py-5">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-muted-foreground dark:text-gray-300 pb-3">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};