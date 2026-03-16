import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import agencyTeam from "@/assets/agency-team.jpg";

const bullets = [
  "Data-driven strategies that deliver measurable results",
  "Global clients across 20+ countries",
  "Performance marketing experts with 15+ years experience",
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/50">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 gradient-bg rounded-2xl opacity-10 blur-xl scale-105" />
            <img
              src={agencyTeam}
              alt="Creative agency workspace"
              className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground mb-6">
              Building Digital <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Founded with a passion for digital innovation, NexusMedia has grown from a small startup into a 
              globally recognized agency. We combine creativity with data to deliver campaigns that not only 
              look stunning but also drive measurable business growth for our clients.
            </p>

            <div className="space-y-4 mb-8">
              {bullets.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-accent-foreground" />
                  </div>
                  <p className="text-sm text-foreground font-medium">{b}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 gradient-bg text-accent-foreground px-8 py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Learn More <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
