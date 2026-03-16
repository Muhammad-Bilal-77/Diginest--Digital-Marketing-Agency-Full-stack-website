import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import ProposalDialog from "./ProposalDialog";

const CTASection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"proposal" | "consultation">("proposal");

  const openDialog = (mode: "proposal" | "consultation") => {
    setDialogMode(mode);
    setDialogOpen(true);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative gradient-bg rounded-3xl p-10 lg:p-20 text-center overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl lg:text-5xl xl:text-6xl font-extrabold text-accent-foreground mb-4">
              Ready to Grow Your Brand?
            </h2>
            <p className="text-lg text-accent-foreground/80 max-w-xl mx-auto mb-10">
              Let's build your next digital success story. Get a free consultation and custom strategy for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openDialog("proposal")}
                className="bg-background text-foreground px-8 py-4 rounded-xl text-sm font-bold hover:bg-secondary transition-colors flex items-center gap-2"
              >
                Get Free Proposal <ArrowRight size={16} />
              </button>
              <button
                onClick={() => openDialog("consultation")}
                className="border border-accent-foreground/30 text-accent-foreground px-8 py-4 rounded-xl text-sm font-bold hover:bg-accent-foreground/10 transition-colors flex items-center gap-2"
              >
                <Calendar size={16} /> Book Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <ProposalDialog open={dialogOpen} onOpenChange={setDialogOpen} mode={dialogMode} />
    </section>
  );
};

export default CTASection;
