import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface Creator {
  _id: string;
  name: string;
  category: string;
  followers: string;
  price: string;
  color: string;
  image?: string;
}

const InfluencerSection = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await fetch("/api/creators");
        const data = await response.json();
        setCreators(data);
      } catch (error) {
        console.error("Failed to fetch creators:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) {
    return (
      <section id="creators" className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Creator Marketplace</p>
            <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground">
              Work With Top <span className="gradient-text">Creators</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="creators" className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Creator Marketplace</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground">
            Work With Top <span className="gradient-text">Creators</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((c, i) => (
            <motion.div
              key={c._id || c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover-lift"
            >
              {/* Avatar with image or placeholder */}
              <div className={`h-48 bg-gradient-to-br ${c.color} relative flex items-center justify-center overflow-hidden`}>
                {c.image ? (
                  <img src={c.image} alt={c.name} className="w-20 h-20 rounded-full object-cover border-2 border-accent-foreground/30" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="font-heading text-2xl font-bold text-accent-foreground">
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-foreground">{c.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{c.category}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users size={14} /> {c.followers}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <DollarSign size={14} /> {c.price}
                  </div>
                </div>
                <Link to="/hire" className="block w-full gradient-bg text-accent-foreground py-2.5 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity text-center">
                  Hire Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfluencerSection;
