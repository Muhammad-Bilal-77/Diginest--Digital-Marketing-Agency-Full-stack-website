import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, User, Briefcase, DollarSign, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";

const budgetOptions = ["$500 - $1,000", "$1,000 - $3,000", "$3,000 - $5,000", "$5,000+"];
const serviceOptions = ["Web Design", "Digital Marketing", "SEO Optimization", "Social Media Marketing", "Branding & Graphic Design", "Paid Advertising", "Influencer Marketing"];

interface Creator {
  _id: string;
  name: string;
  category: string;
  followers: string;
  price: string;
  color: string;
  image?: string;
}

const HireNow = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [creatorLoading, setCreatorLoading] = useState(true);
  const [selectedCreatorId, setSelectedCreatorId] = useState("");
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [message, setMessage] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [creatorsRes, settingsRes] = await Promise.all([
          fetch("/api/creators"),
          fetch("/api/settings"),
        ]);
        
        const creatorsData = await creatorsRes.json();
        const settingsData = await settingsRes.json();
        
        setCreators(creatorsData);
        setWhatsappNumber(settingsData.whatsappNumber || "");
        setCreatorLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setCreatorLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedCreator = creators.find(c => c._id === selectedCreatorId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!whatsappNumber) {
      alert("WhatsApp number not available. Please try again later.");
      return;
    }

    const finalBudget = budget === "Custom" ? customBudget : budget;
    const creatorMention = selectedCreator ? `\n*Interested Creator:* ${selectedCreator.name}` : "";
    const text = `Hi NexusMedia! 👋\n\n*Name:* ${name}\n*Service:* ${service}\n*Budget:* ${finalBudget}${creatorMention}\n*Details:* ${message}`;
    const encoded = encodeURIComponent(text);
    const cleanNumber = whatsappNumber.replace(/[^\d+]/g, "");
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg">
        <div className="container-wide px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-accent-foreground/80 hover:text-accent-foreground text-sm font-medium transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
        <div className="container-wide px-4 sm:px-6 lg:px-8 pb-16 pt-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl lg:text-5xl font-extrabold text-accent-foreground mb-3"
          >
            Let's Work Together
          </motion.h1>
          <p className="text-accent-foreground/70 max-w-md mx-auto">
            Fill in your details and we'll connect on WhatsApp instantly.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container-wide px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8 lg:p-10 shadow-xl space-y-6"
        >
          {/* Select Creator */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Users size={15} /> Want to Work with a Specific Creator?
            </label>
            <select
              value={selectedCreatorId}
              onChange={(e) => setSelectedCreatorId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            >
              <option value="">Select a creator (optional)</option>
              {creatorLoading ? (
                <option disabled>Loading creators...</option>
              ) : (
                creators.map((creator) => (
                  <option key={creator._id} value={creator._id}>
                    {creator.name} - {creator.category} ({creator.price})
                  </option>
                ))
              )}
            </select>
            {selectedCreator && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-secondary/50 border border-border rounded-lg"
              >
                <p className="text-xs text-muted-foreground">Selected Creator</p>
                <p className="font-semibold text-foreground">{selectedCreator.name}</p>
                <p className="text-xs text-muted-foreground">{selectedCreator.category} • {selectedCreator.price}</p>
              </motion.div>
            )}
          </div>
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <User size={15} /> Your Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>

          {/* Service */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Briefcase size={15} /> Service Needed
            </label>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setService(s)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    service === s
                      ? "gradient-bg text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <DollarSign size={15} /> Budget Range
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {budgetOptions.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => {
                    setBudget(b);
                    setCustomBudget("");
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    budget === b
                      ? "gradient-bg text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {b}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setBudget("Custom")}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  budget === "Custom"
                    ? "gradient-bg text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                Custom
              </button>
            </div>
            {budget === "Custom" && (
              <motion.input
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                type="text"
                placeholder="Enter your budget (e.g., $15,000 or $2,000/month)"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            )}
          </div>

          {/* Message */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <MessageSquare size={15} /> Project Details
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project, goals, and timeline..."
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full gradient-bg text-accent-foreground py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Send size={16} />
            Send via WhatsApp
          </button>

          <p className="text-xs text-muted-foreground text-center">
            You'll be redirected to WhatsApp to send us your inquiry directly.
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default HireNow;
