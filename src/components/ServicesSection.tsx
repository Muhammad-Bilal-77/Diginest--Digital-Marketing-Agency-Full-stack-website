import { motion } from "framer-motion";
import { Palette, BarChart3, Search, Share2, PenTool, Megaphone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Palette, title: "Web Design", slug: "web-design", desc: "Stunning, conversion-optimized websites that captivate your audience and drive results." },
  { icon: BarChart3, title: "Digital Marketing", slug: "digital-marketing", desc: "Full-funnel strategies that generate qualified leads and maximize your ROI." },
  { icon: Search, title: "SEO Optimization", slug: "seo-optimization", desc: "Dominate search rankings with data-driven SEO strategies and technical excellence." },
  { icon: Share2, title: "Social Media Marketing", slug: "social-media-marketing", desc: "Build engaged communities and amplify your brand across every platform." },
  { icon: PenTool, title: "Branding & Graphic Design", slug: "branding-graphic-design", desc: "Distinctive brand identities that tell your story and stand out from the competition." },
  { icon: Megaphone, title: "Paid Advertising", slug: "paid-advertising", desc: "High-performance PPC campaigns across Google, Meta, and emerging channels." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">What We Do</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground">
            Services That Drive <span className="gradient-text">Growth</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Link key={s.title} to={`/services/${s.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-card border border-border rounded-2xl p-8 hover-lift cursor-pointer h-full"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg-subtle flex items-center justify-center mb-5 group-hover:gradient-bg transition-all duration-300">
                  <s.icon size={22} className="text-accent-blue group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground group-hover:text-accent transition-colors duration-300"
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
