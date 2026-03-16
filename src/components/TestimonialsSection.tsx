import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    company: "TechCorp",
    quote: "NexusMedia transformed our digital presence completely. Our conversion rates increased by 340% within just three months of launching the new website.",
    rating: 5,
  },
  {
    name: "David Park",
    company: "GrowthLab",
    quote: "The team's expertise in SEO and paid advertising helped us achieve record-breaking ROI. They truly understand performance marketing at scale.",
    rating: 5,
  },
  {
    name: "Emma Williams",
    company: "ScaleUp Inc",
    quote: "Their creative approach to branding gave our startup the premium identity we needed. The results speak for themselves — 2x increase in brand recall.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground">
            What Clients <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl p-8 lg:p-12 text-center relative"
            >
              <Quote size={40} className="text-accent/20 mx-auto mb-6" />
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-8 font-medium italic">
                "{testimonials[current].quote}"
              </p>
              <div className="w-12 h-12 rounded-full gradient-bg mx-auto mb-3 flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">
                  {testimonials[current].name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <p className="font-heading font-bold text-foreground">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].company}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft size={18} className="text-foreground" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight size={18} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
