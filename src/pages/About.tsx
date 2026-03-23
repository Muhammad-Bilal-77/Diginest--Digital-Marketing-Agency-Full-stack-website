import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import { buildApiUrl } from "@/lib/apiBase";

interface AboutData {
  _id?: string;
  heroTitle: string;
  heroDescription: string;
  stats: { value: string; label: string }[];
  storyTitle: string;
  storyContent: string[];
  valuesTitle: string;
  values: { title: string; description: string }[];
  teamTitle: string;
  teamDescription: string;
}

const About = () => {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(buildApiUrl("/about"));
        if (response.ok) {
          const data = await response.json();
          setAbout(data);
        }
      } catch (error) {
        console.error("Error fetching about page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading || !about) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-secondary">
        {/* Hero Section */}
        <section className="container-wide section-padding pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6 text-foreground">
              {about.heroTitle.split("Digi")[0]}Digi<span className="gradient-text">nest</span>
            </h1>
            <p className="text-xl text-foreground/60 leading-relaxed">
              {about.heroDescription}
            </p>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="container-wide section-padding">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="container-wide section-padding">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-6 text-foreground">
                {about.storyTitle}
              </h2>
              {about.storyContent.map((paragraph, i) => (
                <p key={i} className="text-foreground/60 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container-wide section-padding">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-extrabold mb-12 text-center text-foreground"
          >
            {about.valuesTitle}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary/5 border border-primary/10 rounded-lg p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Check className="text-accent" size={20} />
                  <h3 className="font-heading font-bold text-foreground">
                    {value.title}
                  </h3>
                </div>
                <p className="text-sm text-foreground/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="container-wide section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-6 text-foreground">
              {about.teamTitle}
            </h2>
            <p className="text-foreground/60 leading-relaxed mb-8">
              {about.teamDescription}
            </p>
            <a
              href="/#creators"
              className="inline-block px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:shadow-lg transition-all"
            >
              View Our Team
            </a>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default About;
