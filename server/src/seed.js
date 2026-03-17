import { Service } from "./models/Service.js";
import { Creator } from "./models/Creator.js";
import { Project } from "./models/Project.js";
import { Settings } from "./models/Settings.js";
import { About } from "./models/About.js";
import { connectToDatabase } from "./config/db.js";

const settingsData = {
  email: "hello@dinest.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  whatsappNumber: "+923104833310",
  socials: [
    { name: "Twitter", url: "https://twitter.com/diginest", icon: "twitter" },
    { name: "LinkedIn", url: "https://linkedin.com/company/diginest", icon: "linkedin" },
    { name: "Instagram", url: "https://instagram.com/diginest", icon: "instagram" },
    { name: "Dribbble", url: "https://dribbble.com/diginest", icon: "dribbble" },
  ],
};

const aboutData = {
  heroTitle: "About Digi nest",
  heroDescription: "We are a team of creative professionals dedicated to transforming businesses through innovative digital solutions and strategic marketing excellence.",
  stats: [
    { value: "500+", label: "Projects Delivered" },
    { value: "10+", label: "Years Experience" },
    { value: "200+", label: "Happy Clients" },
    { value: "50+", label: "Team Members" },
  ],
  storyTitle: "Our Story",
  storyContent: [
    "Founded in 2015, Digi nest started with a simple vision: to help businesses navigate the digital landscape and achieve their goals through innovative and strategic solutions.",
    "What began as a small team of passionate designers and marketers has grown into a full-service digital agency serving clients across industries and continents.",
    "Today, we continue to push boundaries, challenge conventions, and deliver exceptional results for businesses looking to make an impact in the digital world.",
  ],
  valuesTitle: "Our Core Values",
  values: [
    { title: "Excellence", description: "We deliver nothing but the best quality work" },
    { title: "Innovation", description: "Cutting-edge solutions for modern challenges" },
    { title: "Integrity", description: "Transparent, honest partnerships with clients" },
    { title: "Impact", description: "Measurable results that drive growth" },
  ],
  teamTitle: "Meet Our Team",
  teamDescription: "Our talented team consists of designers, developers, strategists, and creative minds who work together to bring ideas to life. Each member brings unique expertise and passion to every project.",
};

const servicesData = [
  {
    title: "Web Design",
    slug: "web-design",
    desc: "Stunning, conversion-optimized websites that captivate your audience and drive results.",
    tagline: "Stunning websites",
    description: "Our web design services create beautiful, high-performing websites that convert visitors into customers.",
    heroImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200",
    icon: "Palette",
    features: [
      { title: "Responsive Design", desc: "Perfect on all devices" },
      { title: "SEO Optimized", desc: "Built for search engines" },
      { title: "Fast Performance", desc: "Lightning-quick load times" },
    ],
    process: [
      { step: "Discovery", desc: "Understanding your goals and audience" },
      { step: "Design", desc: "Creating stunning visual designs" },
      { step: "Development", desc: "Building high-performance code" },
      { step: "Launch", desc: "Deploying with excellence" },
    ],
    stats: [
      { value: "500+", label: "Projects Completed" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "2.5x", label: "Avg. Conversion Lift" },
    ],
    testimonial: {
      quote: "Our new website exceeded all expectations. Traffic has never been higher.",
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      rating: 5,
    },
    faqs: [
      { q: "How long does web design take?", a: "Typical projects take 8-12 weeks depending on complexity." },
      { q: "Do you provide maintenance?", a: "Yes, we offer ongoing support and updates." },
      { q: "What's your design process?", a: "We follow a collaborative process with multiple review stages." },
    ],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    desc: "Full-funnel strategies that generate qualified leads and maximize your ROI.",
    tagline: "Strategic growth",
    description: "Comprehensive digital marketing services to grow your business across all channels.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=1200",
    icon: "BarChart3",
    features: [
      { title: "Lead Generation", desc: "Qualified prospects for sales" },
      { title: "Campaign Management", desc: "Multi-channel coordination" },
      { title: "Analytics & Reporting", desc: "Data-driven insights" },
    ],
    process: [
      { step: "Strategy", desc: "Defining your growth roadmap" },
      { step: "Execution", desc: "Implementing campaigns across channels" },
      { step: "Optimization", desc: "Testing and improving continuously" },
      { step: "Scaling", desc: "Growing successful initiatives" },
    ],
    stats: [
      { value: "450%", label: "Avg. ROI Improvement" },
      { value: "12M+", label: "Leads Generated" },
      { value: "$80M+", label: "Revenue Driven" },
    ],
    testimonial: {
      quote: "Digi nest transformed our marketing. Our customer acquisition costs dropped 60%.",
      name: "Michael Chen",
      role: "CMO, GrowthCo",
      rating: 5,
    },
    faqs: [
      { q: "What channels do you manage?", a: "We manage Google Ads, Meta, LinkedIn, TikTok, and more." },
      { q: "How do you measure success?", a: "We track ROI, cost per acquisition, and conversion rates." },
      { q: "What's the minimum budget?", a: "We work with budgets from $2K to $100K+ per month." },
    ],
  },
  {
    title: "SEO Optimization",
    slug: "seo-optimization",
    desc: "Dominate search rankings with data-driven SEO strategies and technical excellence.",
    tagline: "Search dominance",
    description: "Advanced SEO services to rank higher and drive organic traffic.",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    icon: "Search",
    features: [
      { title: "Technical SEO", desc: "Site speed and architecture" },
      { title: "Content Strategy", desc: "Ranking content creation" },
      { title: "Link Building", desc: "Authority development" },
    ],
    process: [
      { step: "Audit", desc: "Comprehensive site analysis" },
      { step: "Strategy", desc: "Keyword and content planning" },
      { step: "Implementation", desc: "On-page and technical fixes" },
      { step: "Monitoring", desc: "Tracking rankings and traffic" },
    ],
    stats: [
      { value: "47", label: "Avg. Keywords in Top 3" },
      { value: "+580%", label: "Organic Traffic Growth" },
      { value: "1,200+", label: "Monthly Leads" },
    ],
    testimonial: {
      quote: "Our organic pipeline went from zero to our top revenue source.",
      name: "David Park",
      role: "VP Growth, LegalShield",
      rating: 5,
    },
    faqs: [
      { q: "How long until results?", a: "3-6 months to see significant improvements typically." },
      { q: "Do you guarantee #1 rankings?", a: "No guarantees in SEO, but our success rate is strong." },
      { q: "What's included in SEO?", a: "Technical audit, content strategy, link building, and monthly reports." },
    ],
  },
  {
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    desc: "Build engaged communities and amplify your brand across every platform.",
    tagline: "Community building",
    description: "Strategic social media management to build your brand and engage your audience.",
    heroImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200",
    icon: "Share2",
    features: [
      { title: "Content Creation", desc: "Engaging posts and videos" },
      { title: "Community Management", desc: "Active engagement and growth" },
      { title: "Influencer Partnerships", desc: "Authentic brand amplification" },
    ],
    process: [
      { step: "Audit", desc: "Current performance analysis" },
      { step: "Planning", desc: "Content calendar and strategy" },
      { step: "Creation", desc: "High-quality daily content" },
      { step: "Engagement", desc: "Building and nurturing community" },
    ],
    stats: [
      { value: "8.7%", label: "Avg. Engagement Rate" },
      { value: "3,200+", label: "UGC Submissions" },
      { value: "+340%", label: "Sales Increase" },
    ],
    testimonial: {
      quote: "We went from unknown to trending. Digi nest's creativity is unmatched.",
      name: "Mia Torres",
      role: "Marketing Director, FreshBite",
      rating: 5,
    },
    faqs: [
      { q: "Which platforms do you manage?", a: "We manage TikTok, Instagram, Facebook, LinkedIn, Twitter, and YouTube." },
      { q: "How often do you post?", a: "Typically 3-5 times daily depending on strategy and platform." },
      { q: "Do you create content in-house?", a: "Yes, we have an in-house production team." },
    ],
  },
  {
    title: "Branding & Graphic Design",
    slug: "branding-graphic-design",
    desc: "Distinctive brand identities that tell your story and stand out from the competition.",
    tagline: "Identity design",
    description: "Comprehensive branding services to create distinctive, memorable brand identities.",
    heroImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200",
    icon: "PenTool",
    features: [
      { title: "Logo Design", desc: "Distinctive brand marks" },
      { title: "Brand Guidelines", desc: "Comprehensive style guides" },
      { title: "Visual Assets", desc: "Complete design systems" },
    ],
    process: [
      { step: "Discovery", desc: "Understanding your brand essence" },
      { step: "Ideation", desc: "Creating multiple concepts" },
      { step: "Refinement", desc: "Perfecting the winner" },
      { step: "Guidelines", desc: "Documenting everything" },
    ],
    stats: [
      { value: "2,400+", label: "Assets Created" },
      { value: "240%", label: "Brand Recognition Lift" },
      { value: "98%", label: "Brand Consistency" },
    ],
    testimonial: {
      quote: "Our global brand now speaks with one voice. Stakeholder confidence is immeasurable.",
      name: "Robert Chen",
      role: "CMO, Vertex Holdings",
      rating: 5,
    },
    faqs: [
      { q: "What's included in branding?", a: "Logo, color palette, typography, imagery, and guidelines." },
      { q: "How long does branding take?", a: "Typically 6-10 weeks for comprehensive brand identity." },
      { q: "Do you do rebrand projects?", a: "Yes, we specialize in strategic rebrands." },
    ],
  },
  {
    title: "Paid Advertising",
    slug: "paid-advertising",
    desc: "High-performance PPC campaigns across Google, Meta, and emerging channels.",
    tagline: "Performance ads",
    description: "Expertly managed paid advertising campaigns that deliver measurable results.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=1200",
    icon: "Megaphone",
    features: [
      { title: "Google Ads", desc: "Search and display campaigns" },
      { title: "Meta Advertising", desc: "Facebook and Instagram ads" },
      { title: "Conversion Optimization", desc: "Maximizing ROAS" },
    ],
    process: [
      { step: "Strategy", desc: "Audience and campaign planning" },
      { step: "Setup", desc: "Account structure and tracking" },
      { step: "Launch", desc: "Campaign activation" },
      { step: "Optimization", desc: "Continuous improvement" },
    ],
    stats: [
      { value: "4.2x", label: "Average ROAS" },
      { value: "$1.2M+", label: "Ad Spend Managed" },
      { value: "-58%", label: "Cost Per Acquisition" },
    ],
    testimonial: {
      quote: "Our biggest cost center became our growth engine. The results speak for themselves.",
      name: "James Liu",
      role: "Founder, UrbanNest",
      rating: 5,
    },
    faqs: [
      { q: "What's a realistic ROAS?", a: "2-5x is typical; we've achieved up to 8x for some clients." },
      { q: "How much should I budget?", a: "We recommend $2K-$5K/month minimum for optimization." },
      { q: "What's your approach?", a: "Data-driven, with continuous testing and optimization." },
    ],
  },
];

const creatorsData = [
  { name: "Alex Rivera", category: "Tech Reviewer", followers: "2.4M", price: "$1,500", color: "from-blue-500 to-cyan-400", image: "" },
  { name: "Sophia Chen", category: "Food Vlogger", followers: "1.8M", price: "$1,200", color: "from-pink-500 to-rose-400", image: "" },
  { name: "Marcus Johnson", category: "Fitness Influencer", followers: "3.1M", price: "$2,000", color: "from-green-500 to-emerald-400", image: "" },
  { name: "Priya Patel", category: "Product Influencer", followers: "980K", price: "$800", color: "from-purple-500 to-violet-400", image: "" },
];

const projectsData = [
  {
    title: "Luxury Fashion E-Commerce",
    cat: "Web Design",
    img: "https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=1200",
    desc: "Premium online store with 180% conversion lift",
    client: "Maison Élégance",
    duration: "12 Weeks",
    year: "2024",
    challenge: "Maison Élégance needed a complete digital overhaul to match their ultra-premium in-store experience. Their existing e-commerce platform suffered from slow load times, outdated design, and a 2.1% conversion rate far below industry standards.",
    solution: "We designed and developed a bespoke e-commerce platform with cinematic product showcases, AI-powered size recommendations, and a seamless checkout experience. Every micro-interaction was carefully crafted to evoke luxury.",
    results: [
      { label: "Conversion Rate", value: "+180%" },
      { label: "Avg. Order Value", value: "+65%" },
      { label: "Page Load Speed", value: "0.8s" },
      { label: "Monthly Visitors", value: "420K+" },
    ],
    deliverables: ["Custom Shopify Plus Theme", "Mobile-First UX Design", "AI Size Recommendation Engine", "Performance Optimization", "A/B Testing Framework"],
    testimonial: { text: "Digi nest transformed our online presence entirely. Sales have never been higher.", author: "Claire Dubois", role: "CEO, Maison Élégance" },
  },
  {
    title: "Corporate Identity Suite",
    cat: "Branding",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200",
    desc: "Gold-standard brand system for Fortune 500",
    client: "Vertex Holdings",
    duration: "8 Weeks",
    year: "2024",
    challenge: "Vertex Holdings, a Fortune 500 conglomerate, had inconsistent branding across 14 subsidiaries. They needed a unified identity system that conveyed trust, innovation, and global authority.",
    solution: "We developed a comprehensive brand architecture with a modular identity system, custom typography, and a 200-page brand guidelines document. The system scales across digital, print, and environmental applications.",
    results: [
      { label: "Brand Recognition", value: "+240%" },
      { label: "Brand Consistency", value: "98%" },
      { label: "Subsidiaries Unified", value: "14" },
      { label: "Assets Created", value: "2,400+" },
    ],
    deliverables: ["Brand Strategy & Architecture", "Logo System & Typography", "200-Page Brand Guidelines", "Digital Asset Library", "Environmental Design Templates"],
    testimonial: { text: "Finally, our global brand speaks with one voice. The impact on stakeholder confidence has been immeasurable.", author: "Robert Chen", role: "CMO, Vertex Holdings" },
  },
  {
    title: "Viral Content Campaign",
    cat: "Marketing",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200",
    desc: "12M+ impressions in 30 days across platforms",
    client: "FreshBite Foods",
    duration: "6 Weeks",
    year: "2023",
    challenge: "FreshBite Foods was launching a new product line and needed massive awareness in a saturated health food market. Traditional advertising wasn't cutting through the noise with their Gen-Z target audience.",
    solution: "We crafted a multi-platform content strategy leveraging micro-influencers, UGC challenges, and real-time social listening. Our team produced 180+ content pieces optimized for TikTok, Instagram Reels, and YouTube Shorts.",
    results: [
      { label: "Total Impressions", value: "12M+" },
      { label: "Engagement Rate", value: "8.7%" },
      { label: "UGC Submissions", value: "3,200+" },
      { label: "Sales Increase", value: "+340%" },
    ],
    deliverables: ["Content Strategy Blueprint", "180+ Video Assets", "Influencer Partnership Program", "UGC Campaign Management", "Real-Time Analytics Dashboard"],
    testimonial: { text: "We went from unknown to trending in under a month. Digi nest's creativity is unmatched.", author: "Mia Torres", role: "Marketing Director, FreshBite" },
  },
  {
    title: "Enterprise SEO Overhaul",
    cat: "SEO",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    desc: "From page 5 to #1 rankings in 90 days",
    client: "LegalShield Pro",
    duration: "16 Weeks",
    year: "2024",
    challenge: "LegalShield Pro, a B2B legal tech SaaS, was invisible in search results. With 50+ competitors ranking above them for critical keywords, their organic pipeline had completely dried up.",
    solution: "We executed a full technical SEO audit, rebuilt their site architecture, created 85 pieces of authoritative content, and built a white-hat backlink portfolio from 120+ high-DA domains.",
    results: [
      { label: "Keywords in Top 3", value: "47" },
      { label: "Organic Traffic", value: "+580%" },
      { label: "Domain Authority", value: "62→81" },
      { label: "Organic Leads/Mo", value: "1,200+" },
    ],
    deliverables: ["Technical SEO Audit & Fixes", "Site Architecture Redesign", "85 Long-Form Content Pieces", "Link Building Campaign", "Monthly Performance Reports"],
    testimonial: { text: "Our organic pipeline went from zero to our #1 revenue channel. The ROI is staggering.", author: "David Park", role: "VP Growth, LegalShield Pro" },
  },
  {
    title: "Fintech Super App",
    cat: "Web Design",
    img: "https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=1200",
    desc: "Award-winning mobile banking experience",
    client: "NovaPay",
    duration: "20 Weeks",
    year: "2023",
    challenge: "NovaPay needed to consolidate 5 separate financial products into a single, intuitive super app. The challenge was making complex financial tools feel simple and trustworthy for everyday users.",
    solution: "We designed a unified mobile experience with biometric authentication, smart dashboards, and contextual financial insights. The interface uses progressive disclosure to reveal complexity only when users need it.",
    results: [
      { label: "App Store Rating", value: "4.9★" },
      { label: "Daily Active Users", value: "890K" },
      { label: "Task Completion", value: "94%" },
      { label: "Support Tickets", value: "-72%" },
    ],
    deliverables: ["UX Research & User Testing", "Design System & Components", "iOS & Android Prototypes", "Accessibility Audit (WCAG 2.1)", "Developer Handoff Package"],
    testimonial: { text: "Users love it. We won a Webby Award within 6 months of launch. Digi nest delivered magic.", author: "Aisha Rahman", role: "CPO, NovaPay" },
  },
  {
    title: "Omnichannel Ad Campaign",
    cat: "Marketing",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200",
    desc: "4.2x ROAS across Google & Meta platforms",
    client: "UrbanNest Furniture",
    duration: "10 Weeks",
    year: "2024",
    challenge: "UrbanNest Furniture was spending $80K/month on ads with a 1.1x ROAS — barely breaking even. They needed to dramatically improve efficiency while scaling spend to capture seasonal demand.",
    solution: "We restructured their entire paid media strategy with advanced audience segmentation, dynamic creative optimization, and a full-funnel attribution model. Our AI-powered bid management system optimized in real-time.",
    results: [
      { label: "ROAS", value: "4.2x" },
      { label: "Cost Per Acquisition", value: "-58%" },
      { label: "Ad Spend Managed", value: "$1.2M" },
      { label: "Revenue Generated", value: "$5M+" },
    ],
    deliverables: ["Paid Media Strategy", "Creative Asset Production", "Audience Segmentation Model", "Real-Time Bid Management", "Weekly Performance Reports"],
    testimonial: { text: "Our ad spend finally makes sense. Digi nest turned our biggest cost center into our growth engine.", author: "James Liu", role: "Founder, UrbanNest" },
  },
];

async function seed() {
  try {
    await connectToDatabase();
    console.log("Connected to database");

    // Clear existing data
    await Service.deleteMany({});
    await Creator.deleteMany({});
    await Project.deleteMany({});
    await Settings.deleteMany({});
    await About.deleteMany({});
    console.log("Cleared existing data");

    // Seed settings
    await Settings.create(settingsData);
    console.log("✓ Seeded settings");

    // Seed about
    await About.create(aboutData);
    console.log("✓ Seeded about page");

    // Seed services
    await Service.insertMany(servicesData);
    console.log(`✓ Seeded ${servicesData.length} services`);

    // Seed creators
    await Creator.insertMany(creatorsData);
    console.log(`✓ Seeded ${creatorsData.length} creators`);

    // Seed projects
    await Project.insertMany(projectsData);
    console.log(`✓ Seeded ${projectsData.length} projects`);

    console.log("\n✅ Database seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
