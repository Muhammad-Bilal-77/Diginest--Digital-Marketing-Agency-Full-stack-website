import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight, Palette, BarChart3, Search, Share2, PenTool, Megaphone, Star, Quote, Zap, Target, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

import serviceWebDesign from "@/assets/service-web-design.jpg";
import serviceDigitalMarketing from "@/assets/service-digital-marketing.jpg";
import serviceSeo from "@/assets/service-seo.jpg";
import serviceSocialMedia from "@/assets/service-social-media.jpg";
import serviceBranding from "@/assets/service-branding.jpg";
import servicePaidAds from "@/assets/service-paid-ads.jpg";

const servicesData: Record<string, {
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  features: { title: string; desc: string; icon: React.ElementType }[];
  process: { step: string; desc: string }[];
  stats: { value: string; label: string }[];
  testimonial: { quote: string; name: string; role: string; rating: number };
  faqs: { q: string; a: string }[];
}> = {
  "web-design": {
    icon: Palette,
    title: "Web Design",
    tagline: "Stunning websites that convert visitors into customers",
    heroImage: serviceWebDesign,
    description: "We craft pixel-perfect, high-performance websites that blend aesthetics with conversion science. From landing pages to full-scale platforms, our designs are built to impress and perform. Every detail is considered — from micro-interactions to load speed — ensuring your brand delivers a world-class digital experience.",
    features: [
      { title: "Custom UI/UX Design", desc: "Tailored interfaces that reflect your brand and delight users at every touchpoint.", icon: Palette },
      { title: "Responsive Development", desc: "Flawless experiences across desktop, tablet, and mobile devices.", icon: Zap },
      { title: "Conversion Optimization", desc: "Data-backed layouts designed to turn visitors into paying customers.", icon: Target },
      { title: "Performance First", desc: "Lightning-fast load times with perfect Core Web Vitals scores.", icon: TrendingUp },
      { title: "CMS Integration", desc: "WordPress, Webflow, or Shopify — managed with ease.", icon: Users },
      { title: "Ongoing Support", desc: "Dedicated maintenance and feature updates post-launch.", icon: CheckCircle2 },
    ],
    process: [
      { step: "Discovery", desc: "We learn your brand, goals, and audience inside out." },
      { step: "Wireframing", desc: "Blueprint the user journey and page architecture." },
      { step: "Visual Design", desc: "High-fidelity mockups with your brand identity." },
      { step: "Development", desc: "Clean, performant code with modern frameworks." },
      { step: "QA & Launch", desc: "Rigorous testing before going live." },
    ],
    stats: [
      { value: "200+", label: "Websites Launched" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "3x", label: "Avg. Conversion Lift" },
      { value: "0.8s", label: "Avg. Load Time" },
    ],
    testimonial: {
      quote: "NexusMedia completely transformed our online presence. The new website increased our leads by 340% in just 3 months. Their design team is world-class.",
      name: "Sarah Mitchell",
      role: "CEO, TechVentures Inc.",
      rating: 5,
    },
    faqs: [
      { q: "How long does a website project take?", a: "Most projects are completed within 4-8 weeks depending on complexity. We provide a detailed timeline during our initial consultation." },
      { q: "Do you offer website maintenance?", a: "Yes, we offer ongoing maintenance packages that include security updates, content changes, performance monitoring, and priority support." },
      { q: "Can you redesign my existing website?", a: "Absolutely. We specialize in redesigns that preserve your SEO value while dramatically improving design, UX, and conversion rates." },
    ],
  },
  "digital-marketing": {
    icon: BarChart3,
    title: "Digital Marketing",
    tagline: "Full-funnel strategies that drive measurable growth",
    heroImage: serviceDigitalMarketing,
    description: "Our data-driven digital marketing campaigns are engineered to generate qualified leads, increase revenue, and build lasting brand awareness. We combine creative storytelling with performance analytics to deliver campaigns that consistently outperform benchmarks across every channel.",
    features: [
      { title: "Multi-Channel Strategy", desc: "Integrated campaigns across search, social, email, and display channels.", icon: Target },
      { title: "Marketing Automation", desc: "CRM integration and automated workflows that nurture leads at scale.", icon: Zap },
      { title: "Content Marketing", desc: "High-quality content that educates, engages, and converts.", icon: PenTool },
      { title: "Email Sequences", desc: "Personalized email campaigns with proven engagement frameworks.", icon: Users },
      { title: "Analytics Dashboards", desc: "Real-time performance tracking with actionable insights.", icon: BarChart3 },
      { title: "A/B Testing", desc: "Continuous experimentation to maximize every conversion point.", icon: TrendingUp },
    ],
    process: [
      { step: "Audit", desc: "Deep-dive into your current marketing performance." },
      { step: "Strategy", desc: "Build a custom growth roadmap with clear KPIs." },
      { step: "Execution", desc: "Launch campaigns across targeted channels." },
      { step: "Optimize", desc: "Continuous testing and refinement for peak ROI." },
      { step: "Report", desc: "Transparent reporting with actionable insights." },
    ],
    stats: [
      { value: "$12M+", label: "Revenue Generated" },
      { value: "150+", label: "Campaigns Managed" },
      { value: "5.2x", label: "Avg. ROAS" },
      { value: "45%", label: "Lower CAC" },
    ],
    testimonial: {
      quote: "Their marketing strategy doubled our revenue in 6 months. The ROI we've seen is incredible — every dollar spent returns fivefold.",
      name: "James Rodriguez",
      role: "CMO, ScaleUp Solutions",
      rating: 5,
    },
    faqs: [
      { q: "What's your minimum contract period?", a: "We recommend a minimum 3-month engagement to see meaningful results, but we offer flexible month-to-month options after the initial period." },
      { q: "How do you measure success?", a: "We track KPIs like leads generated, cost per acquisition, ROAS, and revenue attributed to our campaigns with full transparency." },
      { q: "Do you work with small businesses?", a: "Yes! We have packages designed for businesses of all sizes, from startups to enterprise companies." },
    ],
  },
  "seo-optimization": {
    icon: Search,
    title: "SEO Optimization",
    tagline: "Dominate search rankings and own your niche",
    heroImage: serviceSeo,
    description: "We engineer sustainable organic growth through technical SEO mastery, strategic content, and authoritative link building. Our approach combines algorithmic understanding with creative content strategies to establish your brand as the go-to authority in your industry.",
    features: [
      { title: "Technical SEO", desc: "Complete site health audits and fixes for crawlability and indexing.", icon: Zap },
      { title: "Keyword Strategy", desc: "Research and target high-intent, winnable keywords in your niche.", icon: Search },
      { title: "On-Page Optimization", desc: "Content, meta tags, schema markup, and internal linking perfected.", icon: PenTool },
      { title: "Local SEO", desc: "Dominate local search with optimized Google Business Profile.", icon: Target },
      { title: "Link Building", desc: "Earn high-authority backlinks through digital PR and outreach.", icon: TrendingUp },
      { title: "Monthly Reporting", desc: "Detailed ranking, traffic, and conversion reports every month.", icon: BarChart3 },
    ],
    process: [
      { step: "Technical Audit", desc: "Identify and fix site health issues." },
      { step: "Keyword Mapping", desc: "Target high-intent, winnable keywords." },
      { step: "Content Plan", desc: "Create search-optimized content calendar." },
      { step: "Authority Building", desc: "Earn high-quality backlinks." },
      { step: "Monitor & Scale", desc: "Track rankings and scale what works." },
    ],
    stats: [
      { value: "500+", label: "Keywords Ranked #1" },
      { value: "10x", label: "Avg. Traffic Growth" },
      { value: "85%", label: "First Page Rankings" },
      { value: "200%", label: "Organic Lead Growth" },
    ],
    testimonial: {
      quote: "We went from page 5 to position 1 for our most competitive keyword. The organic traffic growth has been phenomenal.",
      name: "Emily Chen",
      role: "Founder, GreenLeaf Commerce",
      rating: 5,
    },
    faqs: [
      { q: "How long does SEO take to show results?", a: "SEO is a long-term investment. Most clients see noticeable improvements within 3-6 months, with significant results by month 6-12." },
      { q: "Do you guarantee rankings?", a: "We don't guarantee specific rankings (no ethical SEO agency can), but we guarantee transparent effort, proven strategies, and measurable progress." },
      { q: "Is SEO still worth it in 2025?", a: "Absolutely. Organic search still drives the majority of web traffic and has the highest ROI of any digital channel long-term." },
    ],
  },
  "social-media-marketing": {
    icon: Share2,
    title: "Social Media Marketing",
    tagline: "Build communities that amplify your brand",
    heroImage: serviceSocialMedia,
    description: "We transform your social presence into a growth engine. From content creation to community management, we craft platform-specific strategies that build authentic connections, drive engagement, and convert followers into loyal customers across every major social network.",
    features: [
      { title: "Content Strategy", desc: "Platform-specific content calendars tailored to your audience.", icon: PenTool },
      { title: "Content Creation", desc: "Professional photos, videos, reels, and graphics that stop the scroll.", icon: Palette },
      { title: "Community Management", desc: "Active engagement that builds loyal brand advocates.", icon: Users },
      { title: "Influencer Partnerships", desc: "Strategic collaborations with creators who align with your brand.", icon: Star },
      { title: "Social Listening", desc: "Monitor brand mentions and industry trends in real-time.", icon: Search },
      { title: "Performance Analytics", desc: "Monthly reports with growth metrics and actionable insights.", icon: BarChart3 },
    ],
    process: [
      { step: "Brand Audit", desc: "Evaluate your current social footprint." },
      { step: "Content Strategy", desc: "Design a content calendar that resonates." },
      { step: "Create & Publish", desc: "Produce scroll-stopping content daily." },
      { step: "Engage", desc: "Actively grow and nurture your community." },
      { step: "Analyze", desc: "Measure impact and refine the approach." },
    ],
    stats: [
      { value: "2M+", label: "Followers Grown" },
      { value: "300%", label: "Avg. Engagement Lift" },
      { value: "50+", label: "Brands Managed" },
      { value: "10M+", label: "Monthly Impressions" },
    ],
    testimonial: {
      quote: "Our Instagram went from 2K to 85K followers in 8 months. The engagement and brand awareness has been game-changing for our business.",
      name: "Aisha Patel",
      role: "Director, Luxe Beauty Co.",
      rating: 5,
    },
    faqs: [
      { q: "Which platforms do you manage?", a: "We manage Instagram, TikTok, Facebook, LinkedIn, X (Twitter), YouTube, and Pinterest — tailored to where your audience lives." },
      { q: "Do you create all the content?", a: "Yes, our creative team handles everything — from photography and videography to graphic design and copywriting." },
      { q: "How often do you post?", a: "Posting frequency depends on your goals and platforms, but we typically recommend 4-7 posts per week across main channels." },
    ],
  },
  "branding-graphic-design": {
    icon: PenTool,
    title: "Branding & Graphic Design",
    tagline: "Distinctive identities that tell your story",
    heroImage: serviceBranding,
    description: "We build brands that people remember. From logo design to complete brand identity systems, our creative team develops visual languages that differentiate you from the competition and create deep emotional connections with your audience across every touchpoint.",
    features: [
      { title: "Logo Design", desc: "Timeless logos that become the face of your brand.", icon: Palette },
      { title: "Brand Identity", desc: "Complete visual systems including colors, typography, and patterns.", icon: PenTool },
      { title: "Brand Guidelines", desc: "Comprehensive style documentation for consistent application.", icon: CheckCircle2 },
      { title: "Marketing Collateral", desc: "Business cards, brochures, banners, and print materials.", icon: Megaphone },
      { title: "Packaging Design", desc: "Product packaging that stands out on shelves and screens.", icon: Target },
      { title: "Presentation Design", desc: "Investor decks and sales presentations that close deals.", icon: TrendingUp },
    ],
    process: [
      { step: "Brand Discovery", desc: "Understand your vision, values, and audience." },
      { step: "Concept Development", desc: "Explore creative directions and moodboards." },
      { step: "Design Execution", desc: "Craft the final visual identity system." },
      { step: "Brand Guidelines", desc: "Document usage rules for consistency." },
      { step: "Asset Delivery", desc: "Provide all files in every format needed." },
    ],
    stats: [
      { value: "300+", label: "Brands Created" },
      { value: "100%", label: "Ownership Transferred" },
      { value: "4.9★", label: "Avg. Client Rating" },
      { value: "15+", label: "Design Awards" },
    ],
    testimonial: {
      quote: "They captured our brand essence perfectly. The new identity elevated our perception from startup to premium brand overnight.",
      name: "Marcus Johnson",
      role: "Founder, Atlas Ventures",
      rating: 5,
    },
    faqs: [
      { q: "How many logo concepts do you provide?", a: "We typically present 3-5 unique logo concepts, with unlimited revisions on the chosen direction until you're 100% satisfied." },
      { q: "Do I own the final designs?", a: "Absolutely. Full ownership and all source files are transferred to you upon project completion." },
      { q: "Can you rebrand an existing business?", a: "Yes, we specialize in strategic rebrands that modernize your image while preserving brand equity your audience recognizes." },
    ],
  },
  "paid-advertising": {
    icon: Megaphone,
    title: "Paid Advertising",
    tagline: "High-performance campaigns that maximize every dollar",
    heroImage: servicePaidAds,
    description: "We build and manage paid advertising campaigns that deliver exceptional returns. From Google Ads to Meta, TikTok, and LinkedIn, we leverage advanced targeting, creative testing, and bid optimization to ensure your ad spend generates maximum revenue and growth.",
    features: [
      { title: "Google Ads", desc: "Search, Display, and Shopping campaigns that capture high-intent buyers.", icon: Search },
      { title: "Meta Ads", desc: "Facebook & Instagram campaigns with advanced audience targeting.", icon: Users },
      { title: "TikTok & LinkedIn", desc: "Platform-specific strategies for emerging ad channels.", icon: Share2 },
      { title: "Retargeting", desc: "Re-engage visitors with personalized ads that convert.", icon: Target },
      { title: "Creative Production", desc: "Thumb-stopping ad creatives and persuasive copy.", icon: Palette },
      { title: "Budget Optimization", desc: "Real-time bid management to maximize every dollar spent.", icon: TrendingUp },
    ],
    process: [
      { step: "Account Setup", desc: "Configure tracking, pixels, and audiences." },
      { step: "Campaign Build", desc: "Structure campaigns for maximum efficiency." },
      { step: "Creative Testing", desc: "Launch multiple ad variations." },
      { step: "Optimization", desc: "Scale winners and cut underperformers." },
      { step: "Reporting", desc: "Weekly insights with clear ROI metrics." },
    ],
    stats: [
      { value: "$8M+", label: "Ad Spend Managed" },
      { value: "6.8x", label: "Avg. ROAS" },
      { value: "40%", label: "Lower CPA vs Industry" },
      { value: "500+", label: "Campaigns Launched" },
    ],
    testimonial: {
      quote: "Our ROAS went from 1.8x to 7.2x within 60 days. Their paid media team is hands-down the best we've ever worked with.",
      name: "David Kim",
      role: "VP Marketing, NovaRetail",
      rating: 5,
    },
    faqs: [
      { q: "What's the minimum ad budget you work with?", a: "We recommend a minimum monthly ad spend of $2,000 to generate meaningful data and results, but we can discuss options for any budget." },
      { q: "How quickly will I see results?", a: "Paid ads can generate results within days. We typically see optimized performance within 2-4 weeks as we gather data and refine targeting." },
      { q: "Do you create the ad creatives?", a: "Yes, our in-house creative team designs all ad visuals, writes copy, and produces video content optimized for each platform." },
    ],
  },
};

const allSlugs = Object.keys(servicesData);

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/" className="gradient-text font-semibold hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;
  const currentIndex = allSlugs.indexOf(slug!);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  const prevSlug = allSlugs[(currentIndex - 1 + allSlugs.length) % allSlugs.length];
  const nextService = servicesData[nextSlug];
  const prevService = servicesData[prevSlug];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Premium Hero */}
      <section className="pt-28 lg:pt-36 pb-0 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-blue/5 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-border/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-border/10" />
        </div>

        <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/#services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Services
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Icon size={14} className="text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">{service.title}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground mb-6 leading-[1.05]">
                {service.tagline.split(" ").slice(0, 3).join(" ")}{" "}
                <span className="gradient-text">{service.tagline.split(" ").slice(3).join(" ")}</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                {service.description.slice(0, 180)}...
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <a href={`https://wa.me/923104833310?text=Hi!%20I'm%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service`}
                   target="_blank" rel="noopener noreferrer"
                   className="gradient-bg text-accent-foreground px-8 py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all hover:shadow-lg hover:shadow-accent/20">
                  Get Started Today
                </a>
                <Link to="/hire" className="border border-border text-foreground px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-secondary transition-all">
                  Request Free Proposal
                </Link>
              </div>

              {/* Mini Stats Row */}
              <div className="flex gap-8">
                {service.stats.slice(0, 3).map((stat, i) => (
                  <div key={i}>
                    <p className="font-heading text-2xl lg:text-3xl font-extrabold gradient-text">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-accent/10 border border-border/50">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 shadow-xl border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                    <TrendingUp size={18} className="text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{service.stats[0].value}</p>
                    <p className="text-xs text-muted-foreground">{service.stats[0].label}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Stats Bar */}
      <section className="py-16 mt-16 border-y border-border/50 bg-secondary/20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {service.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-4xl lg:text-5xl font-extrabold gradient-text mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">What's Included</p>
            <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-card border border-border rounded-2xl p-8 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg-subtle flex items-center justify-center mb-5 group-hover:gradient-bg transition-all duration-300">
                  <f.icon size={22} className="text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description + Image split */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-foreground mb-6">
                We Don't Just Deliver — We <span className="gradient-text">Transform</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                {service.description}
              </p>
              <div className="space-y-4">
                {["Industry-leading expertise", "Transparent communication", "Proven track record", "Dedicated account manager"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-accent-foreground" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative">
                <img src={service.heroImage} alt={service.title} className="rounded-2xl w-full h-[400px] object-cover shadow-xl" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent/10 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Our Process</p>
            <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground">
              How We <span className="gradient-text">Make It Happen</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {service.process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative text-center"
                >
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-5 text-accent-foreground font-bold text-lg shadow-lg shadow-accent/20 relative z-10">
                    {i + 1}
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground mb-2">{p.step}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Quote size={48} className="text-accent/30 mx-auto mb-6" />
            <p className="font-heading text-2xl lg:text-3xl font-bold text-foreground leading-snug mb-8">
              "{service.testimonial.quote}"
            </p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: service.testimonial.rating }).map((_, i) => (
                <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <p className="font-heading font-bold text-foreground">{service.testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{service.testimonial.role}</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-foreground">
              Common <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {service.faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-heading font-bold text-foreground hover:text-accent transition-colors">
                  {faq.q}
                  <ArrowRight size={18} className="text-muted-foreground group-open:rotate-90 transition-transform duration-200 shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed -mt-2">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Navigate Services */}
      <section className="py-12 border-t border-border/50">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to={`/services/${prevSlug}`} className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <div className="hidden sm:block">
                <p className="text-xs text-muted-foreground">Previous</p>
                <p className="font-heading font-bold text-foreground">{prevService.title}</p>
              </div>
            </Link>
            <Link to="/#services" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              All Services
            </Link>
            <Link to={`/services/${nextSlug}`} className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-right">
              <div className="hidden sm:block">
                <p className="text-xs text-muted-foreground">Next</p>
                <p className="font-heading font-bold text-foreground">{nextService.title}</p>
              </div>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
