import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, BarChart3, Search, Share2, PenTool, Megaphone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { buildApiUrl } from "@/lib/apiBase";

interface Service {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  icon?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Palette,
  BarChart3,
  Search,
  Share2,
  PenTool,
  Megaphone,
};

const getIconForService = (iconName?: string): React.ElementType => {
  if (!iconName || !iconMap[iconName]) {
    return Palette; // fallback icon
  }
  return iconMap[iconName];
};

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(buildApiUrl("/services"));
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground">
              Services That Drive <span className="gradient-text">Growth</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-8 h-32 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            <Link key={s._id || s.title} to={`/services/${s.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-card border border-border rounded-2xl p-8 hover-lift cursor-pointer h-full"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg-subtle flex items-center justify-center mb-5 group-hover:gradient-bg transition-all duration-300">
                  {(() => {
                    const IconComponent = getIconForService(s.icon);
                    return <IconComponent size={22} className="text-accent-blue group-hover:text-accent-foreground transition-colors" />;
                  })()}
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
