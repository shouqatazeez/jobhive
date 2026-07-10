import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const jobsData = [
  {
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹18L - ₹25L/year",
    description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing features using React and Next.js, ensuring high performance and responsiveness.",
    requirements: "3+ years experience with React/Next.js, Strong knowledge of HTML, CSS, JavaScript/TypeScript, Experience with REST APIs and state management, Good understanding of responsive design",
    featured: true,
  },
  {
    title: "Backend Engineer",
    company: "Razorpay",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹20L - ₹30L/year",
    description: "Join our payments infrastructure team to build scalable backend services that handle millions of transactions daily. You'll work with distributed systems and microservices.",
    requirements: "4+ years backend development, Experience with Node.js or Go, Knowledge of databases (PostgreSQL, Redis), Understanding of distributed systems and message queues",
    featured: true,
  },
  {
    title: "UI/UX Designer",
    company: "Flipkart",
    location: "Hyderabad, India",
    type: "FULL_TIME" as const,
    category: "Design",
    salary: "₹12L - ₹18L/year",
    description: "Looking for a creative UI/UX Designer to design beautiful and intuitive user experiences for our e-commerce platform used by millions of customers.",
    requirements: "3+ years in UI/UX design, Proficiency in Figma and design systems, Portfolio showcasing mobile and web designs, Understanding of user research and usability testing",
    featured: true,
  },
  {
    title: "Full Stack Developer",
    company: "Zerodha",
    location: "Remote",
    type: "REMOTE" as const,
    category: "Technology",
    salary: "₹15L - ₹22L/year",
    description: "Build and maintain trading platforms used by millions of investors. Work on both frontend and backend systems in a fast-paced fintech environment.",
    requirements: "3+ years full stack development, React/Vue.js frontend experience, Node.js or Python backend, Database design and API development",
    featured: true,
  },
  {
    title: "DevOps Engineer",
    company: "Atlassian",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹22L - ₹35L/year",
    description: "Manage and improve our cloud infrastructure, CI/CD pipelines, and deployment processes. Ensure high availability and scalability of our services.",
    requirements: "Experience with AWS/GCP, Kubernetes and Docker, CI/CD tools (Jenkins, GitHub Actions), Infrastructure as Code (Terraform), Monitoring and logging tools",
    featured: false,
  },
  {
    title: "Product Manager",
    company: "CRED",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Business",
    salary: "₹25L - ₹40L/year",
    description: "Lead product strategy and roadmap for our credit card payments platform. Collaborate with engineering, design, and business teams to deliver impactful features.",
    requirements: "5+ years in product management, Experience with fintech or consumer apps, Strong analytical and communication skills, Data-driven decision making",
    featured: false,
  },
  {
    title: "Data Analyst",
    company: "Swiggy",
    location: "Hyderabad, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹10L - ₹15L/year",
    description: "Analyze large datasets to uncover insights that drive business decisions. Build dashboards and reports for stakeholders across the company.",
    requirements: "2+ years in data analytics, SQL and Python proficiency, Experience with Tableau/Power BI, Statistical analysis skills",
    featured: false,
  },
  {
    title: "Marketing Manager",
    company: "Myntra",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Marketing",
    salary: "₹14L - ₹20L/year",
    description: "Develop and execute marketing campaigns to drive user acquisition and engagement for India's leading fashion e-commerce platform.",
    requirements: "5+ years in digital marketing, Experience with SEO, SEM, and social media, Campaign management and analytics, Creative thinking and brand building",
    featured: false,
  },
  {
    title: "Mobile Developer (React Native)",
    company: "PhonePe",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹16L - ₹24L/year",
    description: "Build and maintain our React Native mobile application used by over 400 million users for digital payments and financial services.",
    requirements: "3+ years React Native experience, Knowledge of native Android/iOS, Performance optimization, Redux or MobX state management",
    featured: false,
  },
  {
    title: "HR Specialist",
    company: "Infosys",
    location: "Pune, India",
    type: "FULL_TIME" as const,
    category: "Human Resource",
    salary: "₹8L - ₹12L/year",
    description: "Manage recruitment, onboarding, and employee engagement activities. Partner with business leaders to support organizational growth.",
    requirements: "3+ years in HR, Experience with HRIS systems, Strong interpersonal skills, Knowledge of labor laws and compliance",
    featured: false,
  },
  {
    title: "Cloud Architect",
    company: "TCS",
    location: "Mumbai, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹30L - ₹45L/year",
    description: "Design and implement cloud solutions for enterprise clients. Lead cloud migration projects and establish best practices for cloud-native development.",
    requirements: "8+ years in cloud computing, AWS/Azure/GCP certifications, Microservices architecture, Security and compliance knowledge",
    featured: false,
  },
  {
    title: "Content Writer",
    company: "Zomato",
    location: "Gurgaon, India",
    type: "CONTRACT" as const,
    category: "Marketing",
    salary: "₹6L - ₹9L/year",
    description: "Write engaging content for our food delivery platform including app copy, blog posts, social media content, and email newsletters.",
    requirements: "2+ years content writing experience, Excellent English writing skills, Understanding of SEO, Experience in food or lifestyle industry preferred",
    featured: false,
  },
  {
    title: "QA Engineer",
    company: "Freshworks",
    location: "Chennai, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹10L - ₹16L/year",
    description: "Ensure quality of our SaaS products through manual and automated testing. Design test strategies and maintain testing frameworks.",
    requirements: "3+ years in QA, Automation experience (Selenium, Cypress), API testing, Strong attention to detail",
    featured: false,
  },
  {
    title: "Sales Executive",
    company: "Salesforce",
    location: "Hyderabad, India",
    type: "FULL_TIME" as const,
    category: "Sales",
    salary: "₹12L - ₹18L/year",
    description: "Drive enterprise sales for our CRM platform. Build relationships with key decision-makers and close deals with Fortune 500 companies.",
    requirements: "3+ years in B2B sales, CRM experience, Strong presentation skills, Track record of meeting sales targets",
    featured: false,
  },
  {
    title: "Machine Learning Engineer",
    company: "Nvidia",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹28L - ₹40L/year",
    description: "Develop and deploy machine learning models for our AI platform. Work on cutting-edge research in deep learning and computer vision.",
    requirements: "MS/PhD in CS or related field, PyTorch/TensorFlow experience, Published research preferred, Strong mathematics background",
    featured: true,
  },
  {
    title: "Financial Analyst",
    company: "Goldman Sachs",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Finance",
    salary: "₹15L - ₹22L/year",
    description: "Analyze financial data and build models to support investment decisions. Work with global teams on risk assessment and portfolio management.",
    requirements: "CFA or MBA in Finance, 2+ years in financial analysis, Advanced Excel and financial modeling, Knowledge of capital markets",
    featured: false,
  },
  {
    title: "Graphic Designer",
    company: "Adobe",
    location: "Noida, India",
    type: "FULL_TIME" as const,
    category: "Design",
    salary: "₹10L - ₹15L/year",
    description: "Create visual designs for marketing materials, product interfaces, and brand assets. Collaborate with cross-functional teams to deliver creative solutions.",
    requirements: "3+ years graphic design experience, Expert in Adobe Creative Suite, Strong portfolio, Understanding of typography and color theory",
    featured: false,
  },
  {
    title: "Cybersecurity Analyst",
    company: "Wipro",
    location: "Hyderabad, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹12L - ₹18L/year",
    description: "Monitor and protect organizational systems from security threats. Conduct vulnerability assessments and implement security measures.",
    requirements: "3+ years in cybersecurity, CISSP or CEH certification, Experience with SIEM tools, Knowledge of network security",
    featured: false,
  },
  {
    title: "Business Development Manager",
    company: "OYO",
    location: "Delhi, India",
    type: "FULL_TIME" as const,
    category: "Business",
    salary: "₹14L - ₹20L/year",
    description: "Identify and pursue new business opportunities. Build strategic partnerships and expand our hotel network across India.",
    requirements: "4+ years in business development, Strong negotiation skills, Experience in hospitality industry, Regional language skills preferred",
    featured: false,
  },
  {
    title: "iOS Developer",
    company: "Paytm",
    location: "Noida, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹16L - ₹22L/year",
    description: "Build and optimize our iOS application for millions of users. Work on payment features, UPI integration, and smooth user experiences.",
    requirements: "3+ years iOS development, Swift and SwiftUI, App Store deployment experience, Performance optimization",
    featured: false,
  },
  {
    title: "Technical Writer",
    company: "Microsoft",
    location: "Hyderabad, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹12L - ₹18L/year",
    description: "Create technical documentation for our cloud services. Write API docs, tutorials, and guides that help developers succeed.",
    requirements: "3+ years technical writing, Understanding of APIs and cloud services, Markdown and docs-as-code experience, Developer audience writing",
    featured: false,
  },
  {
    title: "Operations Manager",
    company: "Amazon",
    location: "Mumbai, India",
    type: "FULL_TIME" as const,
    category: "Business",
    salary: "₹18L - ₹25L/year",
    description: "Manage warehouse operations and logistics. Optimize delivery processes and lead teams to meet performance targets.",
    requirements: "5+ years in operations, Experience with supply chain management, Leadership and team management, Data-driven approach",
    featured: false,
  },
  {
    title: "Social Media Manager",
    company: "Dream11",
    location: "Mumbai, India",
    type: "FULL_TIME" as const,
    category: "Marketing",
    salary: "₹8L - ₹12L/year",
    description: "Manage social media presence across all platforms. Create engaging content around sports and fantasy gaming.",
    requirements: "2+ years social media management, Content creation skills, Analytics and reporting, Sports enthusiast preferred",
    featured: false,
  },
  {
    title: "Intern - Software Development",
    company: "Tata Digital",
    location: "Bangalore, India",
    type: "INTERNSHIP" as const,
    category: "Technology",
    salary: "₹25K - ₹40K/month",
    description: "Join our engineering team as an intern. Work on real projects, learn from senior engineers, and contribute to products used by millions.",
    requirements: "Currently pursuing B.Tech/B.E in CS or IT, Basic knowledge of programming, Willingness to learn, Good communication skills",
    featured: false,
  },
  {
    title: "Part-Time Customer Support",
    company: "Ola",
    location: "Remote",
    type: "PART_TIME" as const,
    category: "Business",
    salary: "₹15K - ₹20K/month",
    description: "Handle customer queries via chat and email. Resolve issues related to rides, payments, and account management.",
    requirements: "Good communication in English and Hindi, Basic computer skills, Ability to work in shifts, Problem-solving attitude",
    featured: false,
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Create a demo employer user
  const hashedPassword = await hash("password123", 12);

  const employer = await prisma.user.upsert({
    where: { email: "employer@jobhive.com" },
    update: {},
    create: {
      name: "JobHive Demo Employer",
      email: "employer@jobhive.com",
      password: hashedPassword,
      role: "EMPLOYER",
    },
  });

  // Create a demo seeker user
  await prisma.user.upsert({
    where: { email: "seeker@jobhive.com" },
    update: {},
    create: {
      name: "JobHive Demo Seeker",
      email: "seeker@jobhive.com",
      password: hashedPassword,
      role: "SEEKER",
    },
  });

  console.log("✅ Demo users created");

  // Create jobs
  for (const jobData of jobsData) {
    await prisma.job.create({
      data: {
        ...jobData,
        employerId: employer.id,
      },
    });
  }

  console.log(`✅ ${jobsData.length} jobs seeded`);
  console.log("🎉 Seed complete!");
  console.log("\nDemo accounts:");
  console.log("  Employer: employer@jobhive.com / password123");
  console.log("  Seeker:   seeker@jobhive.com / password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
