import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight, Palette, BarChart3, Search, Share2, PenTool, Megaphone, Star, Quote, Zap, Target, TrendingUp, Users } from "lucide-react";
import * as Icons from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { buildApiUrl } from "@/lib/apiBase";

interface Service {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  icon?: string;
  features: { title: string; desc: string }[];
  process: { step: string; desc: string }[];
  stats: { value: string; label: string }[];
  testimonial: { quote: string; name: string; role: string; rating: number };
  faqs: { q: string; a: string }[];
}

// Map feature titles to icons
const featureIconMap: Record<string, React.ElementType> = {
  "custom ui/ux design": Palette,
  "responsive development": Zap,
  "conversion optimization": Target,
  "performance first": TrendingUp,
  "cms integration": Users,
  "ongoing support": CheckCircle2,
  "multi-channel strategy": Target,
  "marketing automation": Zap,
  "content marketing": PenTool,
  "email sequences": Users,
  "analytics dashboards": BarChart3,
  "a/b testing": TrendingUp,
  "technical seo": Zap,
  "keyword strategy": Search,
  "on-page optimization": PenTool,
  "local seo": Target,
  "link building": TrendingUp,
  "monthly reporting": BarChart3,
  "content strategy": PenTool,
  "content creation": Palette,
  "community management": Users,
  "influencer partnerships": Star,
  "social listening": Search,
  "performance analytics": BarChart3,
  "logo design": Palette,
  "brand identity": PenTool,
  "brand guidelines": CheckCircle2,
  "marketing collateral": Megaphone,
  "packaging design": Target,
  "presentation design": TrendingUp,
  "google ads": Search,
  "meta ads": Users,
  "tiktok & linkedin": Share2,
  "retargeting": Target,
  "creative production": Palette,
  "budget optimization": TrendingUp,
};

const getFeatureIcon = (title: string): React.ElementType => {
  const iconKey = title.toLowerCase();
  return featureIconMap[iconKey] || Palette;
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, settingsRes] = await Promise.all([
          fetch(buildApiUrl("/services")),
          fetch(buildApiUrl("/settings")),
        ]);

        const servicesData: Service[] = await servicesRes.json();
        const settingsData = await settingsRes.json();
        
        setAllServices(servicesData);
        setWhatsappNumber(settingsData.whatsappNumber || "");

        // Find the service by slug
        const found = servicesData.find((s) => s.slug === slug);
        setService(found || null);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-accent border-t-background animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading service...</p>
        </div>
      </div>
    );
  }

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

  // Get icon from service
  const getServiceIcon = (iconName?: string): React.ElementType => {
    if (!iconName) return Palette;
    return (Icons[iconName as keyof typeof Icons] as React.ElementType) || Palette;
  };

  const Icon = getServiceIcon(service.icon);

  // Get prev/next services
  const currentIndex = allServices.findIndex((s) => s.slug === slug);
  const nextService = allServices[(currentIndex + 1) % allServices.length];
  const prevService = allServices[(currentIndex - 1 + allServices.length) % allServices.length];

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
                <a href={`https://wa.me/${whatsappNumber.replace(/[^\d+]/g, "")}?text=Hi!%20I'm%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service`}
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
            {service.features.map((f, i) => {
              const FeatureIcon = getFeatureIcon(f.title);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative bg-card border border-border rounded-2xl p-8 hover-lift"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg-subtle flex items-center justify-center mb-5 group-hover:gradient-bg transition-all duration-300">
                    <FeatureIcon size={22} className="text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
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
            <Link to={`/services/${prevService.slug}`} className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <div className="hidden sm:block">
                <p className="text-xs text-muted-foreground">Previous</p>
                <p className="font-heading font-bold text-foreground">{prevService.title}</p>
              </div>
            </Link>
            <Link to="/#services" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              All Services
            </Link>
            <Link to={`/services/${nextService.slug}`} className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-right">
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
