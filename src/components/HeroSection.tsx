import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";
import ProposalDialog from "./ProposalDialog";

const HeroSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent-blue/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent-purple/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full gradient-bg opacity-[0.03] blur-3xl" />
      </div>

      <div className="container-wide section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 gradient-bg-subtle rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full gradient-bg" />
              <span className="text-xs font-semibold text-foreground tracking-wide uppercase">
                Award-Winning Agency
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-foreground mb-6">
              Award Winning{" "}
              <span className="gradient-text">Digital Marketing</span>{" "}
              & Web Design Agency
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
              We craft data-driven digital experiences that drive growth, 
              build brands, and deliver measurable results for ambitious businesses worldwide.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setDialogOpen(true)}
                className="gradient-bg text-accent-foreground px-8 py-4 rounded-xl text-sm font-bold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/20 flex items-center gap-2"
              >
                Get Free Proposal
                <ArrowRight size={16} />
              </button>
              <a
                href="#portfolio"
                className="border border-border text-foreground px-8 py-4 rounded-xl text-sm font-bold hover:bg-secondary transition-all duration-300 flex items-center gap-2"
              >
                <Play size={16} />
                View Portfolio
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-border">
              {[
                { value: "250+", label: "Projects Delivered" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "15+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl lg:text-3xl font-extrabold gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative animate-float">
              <div className="absolute inset-0 gradient-bg rounded-2xl opacity-20 blur-2xl scale-105" />
              <img
                src={heroDashboard}
                alt="Marketing analytics dashboard"
                className="relative rounded-2xl shadow-2xl border border-border/50 w-full"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 shadow-xl"
            >
              <p className="text-xs text-muted-foreground">Conversion Rate</p>
              <p className="font-heading text-2xl font-bold gradient-text">+340%</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ProposalDialog open={dialogOpen} onOpenChange={setDialogOpen} mode="proposal" />
    </section>
  );
};

export default HeroSection;
