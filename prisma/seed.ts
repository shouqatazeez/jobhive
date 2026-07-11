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
    logo: "/logos/google.svg",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹18L - ₹25L/year",
    description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing features using React and Next.js, ensuring high performance and responsiveness.",
    requirements: "3+ years experience with React/Next.js, Strong knowledge of HTML, CSS, JavaScript/TypeScript, Experience with REST APIs and state management, Good understanding of responsive design",
    featured: true,
  },

  {
    title: "DevOps Engineer",
    company: "Atlassian",
    logo: "/logos/atlassian.svg",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹22L - ₹35L/year",
    description: "Manage and improve our cloud infrastructure, CI/CD pipelines, and deployment processes. Ensure high availability and scalability of our services.",
    requirements: "Experience with AWS/GCP, Kubernetes and Docker, CI/CD tools (Jenkins, GitHub Actions), Infrastructure as Code (Terraform), Monitoring and logging tools",
    featured: true,
  },
  {
    title: "Data Analyst",
    company: "Swiggy",
    logo: "/logos/swiggy.svg",
    location: "Hyderabad, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹10L - ₹15L/year",
    description: "Analyze large datasets to uncover insights that drive business decisions. Build dashboards and reports for stakeholders across the company.",
    requirements: "2+ years in data analytics, SQL and Python proficiency, Experience with Tableau/Power BI, Statistical analysis skills",
    featured: false,
  },

  {
    title: "Content Writer",
    company: "Zomato",
    logo: "/logos/zomato.svg",
    location: "Gurgaon, India",
    type: "CONTRACT" as const,
    category: "Marketing",
    salary: "₹6L - ₹9L/year",
    description: "Write engaging content for our food delivery platform including app copy, blog posts, social media content, and email newsletters.",
    requirements: "2+ years content writing experience, Excellent English writing skills, Understanding of SEO, Experience in food or lifestyle industry preferred",
    featured: false,
  },
  {
    title: "Machine Learning Engineer",
    company: "Nvidia",
    logo: "/logos/nvidia.svg",
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
    logo: "/logos/goldmansachs.svg",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Finance",
    salary: "₹15L - ₹22L/year",
    description: "Analyze financial data and build models to support investment decisions. Work with global teams on risk assessment and portfolio management.",
    requirements: "CFA or MBA in Finance, 2+ years in financial analysis, Advanced Excel and financial modeling, Knowledge of capital markets",
    featured: false,
  },

  {
    title: "Business Development Manager",
    company: "OYO",
    logo: "/logos/oyo.svg",
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
    logo: "/logos/paytm.svg",
    location: "Noida, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹16L - ₹22L/year",
    description: "Build and optimize our iOS application for millions of users. Work on payment features, UPI integration, and smooth user experiences.",
    requirements: "3+ years iOS development, Swift and SwiftUI, App Store deployment experience, Performance optimization",
    featured: false,
  },
  {
    title: "Solutions Architect",
    company: "Accenture",
    logo: "/logos/accenture.svg",
    location: "Mumbai, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹25L - ₹40L/year",
    description: "Design and deliver enterprise solutions for Fortune 500 clients. Lead technical strategy and architecture decisions across large-scale projects.",
    requirements: "7+ years in software engineering, Cloud architecture experience, Client-facing communication skills, Enterprise integration patterns",
    featured: true,
  },
  {
    title: "Product Designer",
    company: "Airbnb",
    logo: "/logos/airbnb.svg",
    location: "Remote",
    type: "REMOTE" as const,
    category: "Design",
    salary: "₹20L - ₹30L/year",
    description: "Design beautiful and intuitive experiences for travelers worldwide. Work on the full design process from research to high-fidelity prototypes.",
    requirements: "4+ years product design experience, Strong Figma skills, Portfolio with shipped products, User research experience",
    featured: true,
  },
  {
    title: "Network Engineer",
    company: "Airtel",
    logo: "/logos/airtel.svg",
    location: "Gurgaon, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹12L - ₹18L/year",
    description: "Design and maintain telecom network infrastructure. Optimize network performance and ensure reliable connectivity for millions of users.",
    requirements: "3+ years in network engineering, CCNA/CCNP certification, Experience with 4G/5G networks, Network troubleshooting skills",
    featured: false,
  },
  {
    title: "Network Security Engineer",
    company: "Cisco",
    logo: "/logos/cisco.svg",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Technology",
    salary: "₹18L - ₹28L/year",
    description: "Protect enterprise networks from cyber threats. Design and implement security solutions for global clients.",
    requirements: "4+ years in network security, CCIE Security preferred, Firewall and VPN configuration, Incident response experience",
    featured: false,
  },
  {
    title: "Systems Engineer",
    company: "Dell",
    logo: "/logos/dell.svg",
    location: "Hyderabad, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹14L - ₹20L/year",
    description: "Design and develop enterprise storage and computing solutions. Work on hardware-software integration for data center products.",
    requirements: "3+ years systems engineering, Linux/Windows server administration, Storage technologies, Virtualization platforms",
    featured: false,
  },
  {
    title: "Developer Advocate",
    company: "GitHub",
    logo: "/logos/github.svg",
    location: "Remote",
    type: "REMOTE" as const,
    category: "Technology",
    salary: "₹22L - ₹35L/year",
    description: "Build and nurture the developer community. Create technical content, speak at conferences, and help developers succeed with our platform.",
    requirements: "3+ years in developer relations, Strong coding skills, Public speaking experience, Content creation abilities, Open source contributions",
    featured: true,
  },
  {
    title: "ERP Consultant",
    company: "SAP",
    logo: "/logos/sap.svg",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Business",
    salary: "₹18L - ₹28L/year",
    description: "Implement and customize SAP solutions for enterprise clients. Lead digital transformation initiatives and optimize business processes.",
    requirements: "4+ years SAP implementation, S/4HANA experience, ABAP programming, Business process understanding",
    featured: false,
  },
  {
    title: "Payments Engineer",
    company: "Stripe",
    logo: "/logos/stripe.svg",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹25L - ₹40L/year",
    description: "Build reliable payment infrastructure that powers millions of businesses worldwide. Work on payment processing, fraud detection, and financial APIs.",
    requirements: "4+ years backend development, Experience with payment systems, Distributed systems knowledge, Ruby/Go/Java proficiency",
    featured: true,
  },
  {
    title: "Autonomous Driving Engineer",
    company: "Tesla",
    logo: "/logos/tesla.svg",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹35L - ₹50L/year",
    description: "Work on self-driving technology and computer vision systems. Develop algorithms for real-time object detection and path planning.",
    requirements: "MS/PhD in robotics or computer vision, C++/Python expertise, Deep learning experience, Sensor fusion knowledge",
    featured: true,
  },
  {
    title: "Fraud Prevention Analyst",
    company: "Visa",
    logo: "/logos/visa.svg",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Finance",
    salary: "₹12L - ₹18L/year",
    description: "Detect and prevent fraudulent transactions across our global payment network. Build machine learning models for real-time fraud detection.",
    requirements: "2+ years in fraud analytics, SQL and Python, Machine learning basics, Understanding of payment ecosystems",
    featured: false,
  },
  {
    title: "Chip Design Engineer",
    company: "Intel",
    logo: "/logos/intel.svg",
    location: "Bangalore, India",
    type: "FULL_TIME" as const,
    category: "Engineering",
    salary: "₹20L - ₹35L/year",
    description: "Design next-generation processor architectures. Work on RTL design, verification, and physical design of cutting-edge semiconductor chips.",
    requirements: "3+ years in VLSI design, Verilog/SystemVerilog proficiency, FPGA experience, Digital design fundamentals",
    featured: false,
  },
];

async function main() {
  console.log("🌱 Starting seed...");

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

  // Delete existing jobs to avoid duplicates
  await prisma.application.deleteMany({});
  await prisma.job.deleteMany({});

  for (const jobData of jobsData) {
    await prisma.job.create({
      data: {
        ...jobData,
        employerId: employer.id,
      },
    });
  }

  console.log(`✅ ${jobsData.length} jobs seeded with company logos`);
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
