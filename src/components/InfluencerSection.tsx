import { motion } from "framer-motion";
import { Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const creators = [
  { name: "Alex Rivera", category: "Tech Reviewer", followers: "2.4M", price: "$1,500", color: "from-blue-500 to-cyan-400" },
  { name: "Sophia Chen", category: "Food Vlogger", followers: "1.8M", price: "$1,200", color: "from-pink-500 to-rose-400" },
  { name: "Marcus Johnson", category: "Fitness Influencer", followers: "3.1M", price: "$2,000", color: "from-green-500 to-emerald-400" },
  { name: "Priya Patel", category: "Product Influencer", followers: "980K", price: "$800", color: "from-purple-500 to-violet-400" },
];

const InfluencerSection = () => {
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
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover-lift"
            >
              {/* Avatar placeholder */}
              <div className={`h-48 bg-gradient-to-br ${c.color} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="font-heading text-2xl font-bold text-accent-foreground">
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                </div>
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
