import { motion } from "framer-motion";
import { MessageSquare, BarChart2, Target, Rocket, FileText, Settings } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Initial Consultation", desc: "Understanding your goals and challenges" },
  { icon: BarChart2, title: "Research & Analysis", desc: "Deep-dive into market and competitors" },
  { icon: Target, title: "Strategy Planning", desc: "Crafting a tailored growth roadmap" },
  { icon: Rocket, title: "Campaign Execution", desc: "Launching with precision and creativity" },
  { icon: FileText, title: "Reporting", desc: "Transparent performance analytics" },
  { icon: Settings, title: "Optimization", desc: "Continuous improvement and scaling" },
];

const ProcessTimeline = () => {
  return (
    <section id="process" className="section-padding bg-secondary/50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Our Process</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground">
            How We <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Line */}
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-border" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-10 left-0 right-0 h-0.5 gradient-bg origin-left"
            />

            <div className="grid grid-cols-6 gap-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full gradient-bg mx-auto flex items-center justify-center mb-4 relative z-10 shadow-lg">
                    <s.icon size={24} className="text-accent-foreground" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-foreground mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden space-y-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                <s.icon size={18} className="text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
