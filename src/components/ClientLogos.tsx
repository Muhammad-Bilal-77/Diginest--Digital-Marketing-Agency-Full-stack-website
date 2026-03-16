import { motion } from "framer-motion";

const clients = [
  "TechCorp", "Innovate", "GrowthLab", "Velocity", "ScaleUp", "NovaBrand", "CloudSync", "DataPulse"
];

const ClientLogos = () => {
  return (
    <section className="section-padding border-y border-border">
      <div className="container-wide">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10">
          Trusted by industry leaders worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {clients.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group cursor-pointer"
            >
              <span className="font-heading text-xl lg:text-2xl font-bold text-muted-foreground/40 group-hover:text-foreground transition-colors duration-300">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
