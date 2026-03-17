import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Eye, X, CheckCircle2, TrendingUp, Users, BarChart3 } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  cat: string;
  img: string;
  desc: string;
  client: string;
  duration: string;
  year: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  deliverables: string[];
  testimonial: { text: string; author: string; role: string };
}

const getIconForResult = (label: string) => {
  const iconMap: Record<string, React.ElementType> = {
    "Conversion Rate": TrendingUp,
    "Avg. Order Value": BarChart3,
    "Monthly Visitors": Users,
    "Brand Recognition": TrendingUp,
    "Subsidiaries Unified": Users,
    "Assets Created": BarChart3,
    "Total Impressions": TrendingUp,
    "Engagement Rate": BarChart3,
    "UGC Submissions": Users,
    "Sales Increase": TrendingUp,
    "Keywords in Top 3": TrendingUp,
    "Organic Traffic": BarChart3,
    "Organic Leads/Mo": Users,
    "App Store Rating": TrendingUp,
    "Daily Active Users": Users,
    "Task Completion": CheckCircle2,
    "Support Tickets": BarChart3,
    ROAS: TrendingUp,
    "Cost Per Acquisition": BarChart3,
    "Ad Spend Managed": Users,
    "Revenue Generated": TrendingUp,
  };
  return iconMap[label] || TrendingUp;
};

const PortfolioSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, settingsRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/settings"),
        ]);

        const projectsData = await projectsRes.json();
        const settingsData = await settingsRes.json();
        
        setProjects(projectsData);
        setWhatsappNumber(settingsData.whatsappNumber || "");
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filters = ["All", ...new Set(projects.map((p) => p.cat))];
  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  if (loading) {
    return (
      <section id="portfolio" className="section-padding bg-secondary/50">
        <div className="container-wide">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Our Work</p>
            <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
              Creative <span className="gradient-text">Portfolio</span>
            </h2>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl h-64 animate-pulse break-inside-avoid" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
                  key={p._id || p.title}
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
                      className="w-full h-64 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
                  {selectedProject.results.map((r, i) => {
                    const Icon = getIconForResult(r.label);
                    return (
                      <motion.div
                        key={r.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="rounded-2xl gradient-bg-subtle border border-border p-5 text-center"
                      >
                        <Icon size={20} className="mx-auto mb-2 text-accent" />
                        <p className="font-heading text-2xl font-extrabold gradient-text">{r.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{r.label}</p>
                      </motion.div>
                    );
                  })}
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
                    href={`https://wa.me/${whatsappNumber.replace(/[^\d+]/g, "")}?text=Hi!%20I%20saw%20your%20portfolio%20and%20I'd%20love%20to%20discuss%20a%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-bg text-accent-foreground px-8 py-3.5 rounded-xl text-sm font-bold text-center hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
                  >
                    Start a Similar Project <ArrowUpRight size={14} />
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
