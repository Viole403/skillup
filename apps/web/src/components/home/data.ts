import {
  BookOpen,
  Code2,
  GraduationCap,
  Users,
} from "lucide-react"

// Categories data
export const categories = [
  "Design",
  "Development",
  "Architecture",
  "Life Style",
  "Data Science",
  "Marketing",
  "Music",
  "Typography",
  "Finance",
  "Motivation"
]

export const features = [
  {
    title: "Comprehensive Curriculum",
    description: "Learn from fundamentals to advanced concepts with our structured approach.",
    icon: BookOpen,
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of practical experience.",
    icon: GraduationCap,
  },
  {
    title: "Hands-on Projects",
    description: "Apply your knowledge through practical, real-world projects.",
    icon: Code2,
  },
  {
    title: "Community Support",
    description: "Join our community of learners and get support when you need it.",
    icon: Users,
  },
]

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    content: "This course completely transformed my career. The instructors explain complex concepts in a way that's easy to understand.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Full Stack Engineer",
    content: "The projects in this course gave me practical experience that I could immediately apply to my job.",
    avatar: "MC",
  },
  {
    name: "Emma Williams",
    role: "UX Designer",
    content: "As someone transitioning to tech, this course provided the perfect foundation for my new career.",
    avatar: "EW",
  },
]

export const pricingPlans = [
  {
    name: "Essential",
    price: "$49",
    description: "Perfect for beginners getting started",
    features: [
      "Full course access",
      "Basic project files",
      "Community access",
      "3 months support",
    ],
  },
  {
    name: "Professional",
    price: "$99",
    description: "For serious developers and professionals",
    features: [
      "Everything in Essential",
      "Advanced project files",
      "Priority support",
      "Lifetime access",
      "Certificate of completion",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "Complete solution for teams and businesses",
    features: [
      "Everything in Professional",
      "Team collaboration tools",
      "Custom projects",
      "Dedicated mentor",
      "Team workshops",
    ],
  },
]

export const faqs = [
  {
    question: "How long do I have access to the course?",
    answer: "Depending on your plan, you'll have either 3 months or lifetime access to the course content and updates."
  },
  {
    question: "Is this course suitable for beginners?",
    answer: "Yes! The course starts with fundamentals and gradually progresses to more advanced topics, making it suitable for all skill levels."
  },
  {
    question: "Do I get a certificate upon completion?",
    answer: "Yes, Professional and Enterprise plans include a certificate of completion that you can add to your portfolio and LinkedIn profile."
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Absolutely! You can upgrade your plan at any time by paying the difference between your current plan and the new one."
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with the course content."
  }
]

export const mediaLogos = [
  {
    id: "tribun",
    name: "Tribun News",
    logo: "/images/brand-logo/tribunnews.png"
  },
  {
    id: "cnbc",
    name: "CNBC Indonesia",
    logo: "/images/brand-logo/cnbcindonesia.png"
  },
  {
    id: "cnn",
    name: "CNN Indonesia",
    logo: "/images/brand-logo/cnnindonesia.png"
  },
  {
    id: "detik",
    name: "Detik.com",
    logo: "/images/brand-logo/detikcom.png"
  },
  {
    id: "kompas",
    name: "Kompas",
    logo: "/images/brand-logo/kompas.png"
  },
  {
    id: "antara",
    name: "Antara News",
    logo: "/images/brand-logo/antaranews.png"
  },
  {
    id: "tempo",
    name: "Tempo",
    logo: "/images/brand-logo/tempo.png"
  },
  {
    id: "liputan6",
    name: "Liputan 6",
    logo: "/images/brand-logo/liputan6.png"
  },
  {
    id: "kumparan",
    name: "Kumparan",
    logo: "/images/brand-logo/kumparan.png"
  },
  {
    id: "sindonews",
    name: "Sindo News",
    logo: "/images/brand-logo/sindonews.png"
  },
  {
    id: "suara",
    name: "Suara",
    logo: "/images/brand-logo/suara.png"
  },
  {
    id: "mediaindonesia",
    name: "Media Indonesia",
    logo: "/images/brand-logo/mediaindonesia.png"
  },
  {
    id: "kompasiana",
    name: "Kompasiana",
    logo: "/images/brand-logo/kompasiana.png"
  },
  {
    id: "merahputih",
    name: "Merah Putih",
    logo: "/images/brand-logo/merahputih.png"
  }
]

export const companyLogos = [
  {
    id: "delaware",
    name: "Delaware",
    logo: "/images/company-logo/Delaware.svg",
    width: 120,
    height: 45
  },
  {
    id: "bern",
    name: "Bern",
    logo: "/images/company-logo/Bern.svg",
    width: 120,
    height: 45
  },
  {
    id: "springfield",
    name: "Springfield",
    logo: "/images/company-logo/Springfield.svg",
    width: 120,
    height: 45
  },
  {
    id: "philadelphia",
    name: "Philadelphia",
    logo: "/images/company-logo/Philadelphia.svg",
    width: 120,
    height: 45
  },
  {
    id: "edinburgh",
    name: "Edinburgh",
    logo: "/images/company-logo/Edinburgh.svg",
    width: 120,
    height: 45
  },
  {
    id: "memphis",
    name: "Memphis",
    logo: "/images/company-logo/Memphis.svg",
    width: 120,
    height: 45
  },
  {
    id: "brooklyn",
    name: "Brooklyn",
    logo: "/images/company-logo/Brooklyn.svg",
    width: 120,
    height: 45
  },
  {
    id: "bristol",
    name: "Bristol",
    logo: "/images/company-logo/Bristol.svg",
    width: 120,
    height: 45
  },
]

// Payment images data
export const internationalPayments = [
  {
    src: "/images/payment/international/PayPal.png",
    alt: "PayPal",
    width: 40,
    height: 25
  },{
    src: "/images/payment/international/Visa.png",
    alt: "Visa",
    width: 40,
    height: 25
  },
  {
    src: "/images/payment/international/Mastercard.png",
    alt: "Mastercard",
    width: 40,
    height: 25
  },
  {
    src: "/images/payment/international/Amex.png",
    alt: "American Express",
    width: 40,
    height: 25
  },
    {
    src: "/images/payment/international/JCB.png",
    alt: "JCB",
    width: 40,
    height: 25
  },
  {
    src: "/images/payment/international/Stripe.png",
    alt: "Stripe",
    width: 40,
    height: 25
  },
  {
    src: "/images/payment/international/GooglePay.png",
    alt: "Google Pay",
    width: 40,
    height: 25
  },
  {
    src: "/images/payment/international/ApplePay.png",
    alt: "Apple Pay",
    width: 40,
    height: 25
  }
];

export const localPayments = [
  {
    src: "/images/payment/local/GPN.png",
    alt: "GPN",
    width: 40,
    height: 25
  },
  {
    src: "/images/payment/local/QRIS.png",
    alt: "QRIS",
    width: 40,
    height: 25
  },
  {
    src: "/images/payment/local/DANA.png",
    alt: "DANA",
    width: 40,
    height: 25
  },
  {
    src: "/images/payment/local/OVO.png",
    alt: "OVO",
    width: 40,
    height: 25
  },
  {
    src: "/images/payment/local/LinkAja.png",
    alt: "LinkAja",
    width: 40,
    height: 25
  },
  {
    src: "/images/payment/local/ShopeePay.png",
    alt: "ShopeePay",
    width: 40,
    height: 25
  },
];