import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Eye, X, CheckCircle2, TrendingUp, Users, BarChart3, ExternalLink } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const filters = ["All", "Web Design", "Branding", "SEO", "Marketing"];

const projects = [
  {
    title: "Luxury Fashion E-Commerce",
    cat: "Web Design",
    img: portfolio1,
    desc: "Premium online store with 180% conversion lift",
    client: "Maison Élégance",
    duration: "12 Weeks",
    year: "2024",
    challenge: "Maison Élégance needed a complete digital overhaul to match their ultra-premium in-store experience. Their existing e-commerce platform suffered from slow load times, outdated design, and a 2.1% conversion rate far below industry standards.",
    solution: "We designed and developed a bespoke e-commerce platform with cinematic product showcases, AI-powered size recommendations, and a seamless checkout experience. Every micro-interaction was carefully crafted to evoke luxury.",
    results: [
      { label: "Conversion Rate", value: "+180%", icon: TrendingUp },
      { label: "Avg. Order Value", value: "+65%", icon: BarChart3 },
      { label: "Page Load Speed", value: "0.8s", icon: CheckCircle2 },
      { label: "Monthly Visitors", value: "420K+", icon: Users },
    ],
    deliverables: ["Custom Shopify Plus Theme", "Mobile-First UX Design", "AI Size Recommendation Engine", "Performance Optimization", "A/B Testing Framework"],
    testimonial: { text: "NexusMedia transformed our online presence entirely. Sales have never been higher.", author: "Claire Dubois", role: "CEO, Maison Élégance" },
  },
  {
    title: "Corporate Identity Suite",
    cat: "Branding",
    img: portfolio2,
    desc: "Gold-standard brand system for Fortune 500",
    client: "Vertex Holdings",
    duration: "8 Weeks",
    year: "2024",
    challenge: "Vertex Holdings, a Fortune 500 conglomerate, had inconsistent branding across 14 subsidiaries. They needed a unified identity system that conveyed trust, innovation, and global authority.",
    solution: "We developed a comprehensive brand architecture with a modular identity system, custom typography, and a 200-page brand guidelines document. The system scales across digital, print, and environmental applications.",
    results: [
      { label: "Brand Recognition", value: "+240%", icon: TrendingUp },
      { label: "Brand Consistency", value: "98%", icon: CheckCircle2 },
      { label: "Subsidiaries Unified", value: "14", icon: Users },
      { label: "Assets Created", value: "2,400+", icon: BarChart3 },
    ],
    deliverables: ["Brand Strategy & Architecture", "Logo System & Typography", "200-Page Brand Guidelines", "Digital Asset Library", "Environmental Design Templates"],
    testimonial: { text: "Finally, our global brand speaks with one voice. The impact on stakeholder confidence has been immeasurable.", author: "Robert Chen", role: "CMO, Vertex Holdings" },
  },
  {
    title: "Viral Content Campaign",
    cat: "Marketing",
    img: portfolio3,
    desc: "12M+ impressions in 30 days across platforms",
    client: "FreshBite Foods",
    duration: "6 Weeks",
    year: "2023",
    challenge: "FreshBite Foods was launching a new product line and needed massive awareness in a saturated health food market. Traditional advertising wasn't cutting through the noise with their Gen-Z target audience.",
    solution: "We crafted a multi-platform content strategy leveraging micro-influencers, UGC challenges, and real-time social listening. Our team produced 180+ content pieces optimized for TikTok, Instagram Reels, and YouTube Shorts.",
    results: [
      { label: "Total Impressions", value: "12M+", icon: TrendingUp },
      { label: "Engagement Rate", value: "8.7%", icon: BarChart3 },
      { label: "UGC Submissions", value: "3,200+", icon: Users },
      { label: "Sales Increase", value: "+340%", icon: CheckCircle2 },
    ],
    deliverables: ["Content Strategy Blueprint", "180+ Video Assets", "Influencer Partnership Program", "UGC Campaign Management", "Real-Time Analytics Dashboard"],
    testimonial: { text: "We went from unknown to trending in under a month. NexusMedia's creativity is unmatched.", author: "Mia Torres", role: "Marketing Director, FreshBite" },
  },
  {
    title: "Enterprise SEO Overhaul",
    cat: "SEO",
    img: portfolio4,
    desc: "From page 5 to #1 rankings in 90 days",
    client: "LegalShield Pro",
    duration: "16 Weeks",
    year: "2024",
    challenge: "LegalShield Pro, a B2B legal tech SaaS, was invisible in search results. With 50+ competitors ranking above them for critical keywords, their organic pipeline had completely dried up.",
    solution: "We executed a full technical SEO audit, rebuilt their site architecture, created 85 pieces of authoritative content, and built a white-hat backlink portfolio from 120+ high-DA domains.",
    results: [
      { label: "Keywords in Top 3", value: "47", icon: TrendingUp },
      { label: "Organic Traffic", value: "+580%", icon: BarChart3 },
      { label: "Domain Authority", value: "62→81", icon: CheckCircle2 },
      { label: "Organic Leads/Mo", value: "1,200+", icon: Users },
    ],
    deliverables: ["Technical SEO Audit & Fixes", "Site Architecture Redesign", "85 Long-Form Content Pieces", "Link Building Campaign", "Monthly Performance Reports"],
    testimonial: { text: "Our organic pipeline went from zero to our #1 revenue channel. The ROI is staggering.", author: "David Park", role: "VP Growth, LegalShield Pro" },
  },
  {
    title: "Fintech Super App",
    cat: "Web Design",
    img: portfolio5,
    desc: "Award-winning mobile banking experience",
    client: "NovaPay",
    duration: "20 Weeks",
    year: "2023",
    challenge: "NovaPay needed to consolidate 5 separate financial products into a single, intuitive super app. The challenge was making complex financial tools feel simple and trustworthy for everyday users.",
    solution: "We designed a unified mobile experience with biometric authentication, smart dashboards, and contextual financial insights. The interface uses progressive disclosure to reveal complexity only when users need it.",
    results: [
      { label: "App Store Rating", value: "4.9★", icon: TrendingUp },
      { label: "Daily Active Users", value: "890K", icon: Users },
      { label: "Task Completion", value: "94%", icon: CheckCircle2 },
      { label: "Support Tickets", value: "-72%", icon: BarChart3 },
    ],
    deliverables: ["UX Research & User Testing", "Design System & Components", "iOS & Android Prototypes", "Accessibility Audit (WCAG 2.1)", "Developer Handoff Package"],
    testimonial: { text: "Users love it. We won a Webby Award within 6 months of launch. NexusMedia delivered magic.", author: "Aisha Rahman", role: "CPO, NovaPay" },
  },
  {
    title: "Omnichannel Ad Campaign",
    cat: "Marketing",
    img: portfolio6,
    desc: "4.2x ROAS across Google & Meta platforms",
    client: "UrbanNest Furniture",
    duration: "10 Weeks",
    year: "2024",
    challenge: "UrbanNest Furniture was spending $80K/month on ads with a 1.1x ROAS — barely breaking even. They needed to dramatically improve efficiency while scaling spend to capture seasonal demand.",
    solution: "We restructured their entire paid media strategy with advanced audience segmentation, dynamic creative optimization, and a full-funnel attribution model. Our AI-powered bid management system optimized in real-time.",
    results: [
      { label: "ROAS", value: "4.2x", icon: TrendingUp },
      { label: "Cost Per Acquisition", value: "-58%", icon: BarChart3 },
      { label: "Ad Spend Managed", value: "$1.2M", icon: CheckCircle2 },
      { label: "Revenue Generated", value: "$5M+", icon: Users },
    ],
    deliverables: ["Paid Media Strategy", "Creative Asset Production", "Audience Segmentation Model", "Real-Time Bid Management", "Weekly Performance Reports"],
    testimonial: { text: "Our ad spend finally makes sense. NexusMedia turned our biggest cost center into our growth engine.", author: "James Liu", role: "Founder, UrbanNest" },
  },
];

interface Project {
  title: string;
  cat: string;
  img: string;
  desc: string;
  client: string;
  duration: string;
  year: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string; icon: React.ElementType }[];
  deliverables: string[];
  testimonial: { text: string; author: string; role: string };
}

const PortfolioSection = () => {
  const [active, setActive] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <>
      <section id="portfolio" className="section-padding bg-secondary/50">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Our Work</p>
            <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
              Creative <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Explore our award-winning projects that have driven real business results.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  active === f
                    ? "gradient-bg text-accent-foreground shadow-lg shadow-accent-purple/20"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setSelectedProject(p)}
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer bg-card border border-border shadow-sm hover:shadow-xl hover:shadow-accent-purple/5 transition-shadow duration-500"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent-foreground/60 mb-2 gradient-bg-subtle px-3 py-1 rounded-full backdrop-blur-sm">
                          {p.cat}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-accent-foreground leading-tight mb-1">
                          {p.title}
                        </h3>
                        <p className="text-xs text-accent-foreground/70">{p.desc}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-foreground hover:underline">
                          <Eye size={13} /> View Case Study
                        </span>
                        <ArrowUpRight size={14} className="text-accent-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Card info below image */}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-sm font-bold text-foreground group-hover:gradient-text transition-all">
                          {p.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{p.cat}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:gradient-bg group-hover:border-transparent transition-all duration-300">
                        <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-foreground/60 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-background rounded-3xl overflow-hidden shadow-2xl my-4"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>

              {/* Hero image */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest gradient-bg text-accent-foreground px-3 py-1 rounded-full mb-3">
                    {selectedProject.cat}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-10 space-y-10">
                {/* Meta info */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Client</p>
                    <p className="font-semibold text-foreground">{selectedProject.client}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Duration</p>
                    <p className="font-semibold text-foreground">{selectedProject.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Year</p>
                    <p className="font-semibold text-foreground">{selectedProject.year}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Category</p>
                    <p className="font-semibold text-foreground">{selectedProject.cat}</p>
                  </div>
                </div>

                {/* Results grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {selectedProject.results.map((r, i) => (
                    <motion.div
                      key={r.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="rounded-2xl gradient-bg-subtle border border-border p-5 text-center"
                    >
                      <r.icon size={20} className="mx-auto mb-2 text-accent" />
                      <p className="font-heading text-2xl font-extrabold gradient-text">{r.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{r.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Challenge & Solution */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-secondary/60 border border-border p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">The Challenge</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.challenge}</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/60 border border-border p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">Our Solution</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">Key Deliverables</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.deliverables.map((d) => (
                      <span
                        key={d}
                        className="inline-flex items-center gap-1.5 text-xs font-medium bg-card border border-border rounded-full px-4 py-2 text-muted-foreground"
                      >
                        <CheckCircle2 size={12} className="text-accent" />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="rounded-2xl gradient-bg p-6 sm:p-8">
                  <p className="text-accent-foreground text-base sm:text-lg font-medium italic leading-relaxed mb-4">
                    "{selectedProject.testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-accent-foreground text-sm">{selectedProject.testimonial.author}</p>
                    <p className="text-accent-foreground/70 text-xs">{selectedProject.testimonial.role}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href="https://wa.me/923104833310?text=Hi!%20I%20saw%20your%20portfolio%20and%20I'd%20love%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-bg text-accent-foreground px-8 py-3.5 rounded-xl text-sm font-bold text-center hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
                  >
                    Start a Similar Project <ExternalLink size={14} />
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-8 py-3.5 rounded-xl text-sm font-bold text-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                  >
                    Back to Portfolio
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioSection;
