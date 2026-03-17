import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, Briefcase, MessageSquare, Heart } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface Creator {
  _id: string;
  name: string;
  category: string;
  price: string;
}

interface HireCreatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creator: Creator | null;
}

const projectTypeOptions = [
  "Product Launch",
  "Brand Awareness",
  "Content Creation",
  "Social Media Campaign",
  "Sponsored Post",
  "Long-term Partnership",
  "One-time Collaboration",
  "Event Promotion",
];

const HireCreatorDialog = ({ open, onOpenChange, creator }: HireCreatorDialogProps) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [reasonToChoose, setReasonToChoose] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        const settings = await response.json();
        setWhatsappNumber(settings.whatsappNumber || "");
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    if (open) {
      fetchSettings();
    }
  }, [open]);

  const handleReset = () => {
    setClientName("");
    setClientEmail("");
    setCompanyName("");
    setProjectType("");
    setProjectDescription("");
    setBudget("");
    setCustomBudget("");
    setTimeline("");
    setReasonToChoose("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName || !clientEmail || !projectType || !projectDescription) {
      alert("Please fill in all required fields");
      return;
    }

    if (!whatsappNumber) {
      alert("WhatsApp number not available. Please try again later.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the message to send via WhatsApp
      const finalBudget = budget === "Custom" ? customBudget : budget;
      const message = `🎉 *New Creator Collaboration Request* 🎉

*Creator:* ${creator?.name}
*Category:* ${creator?.category}

👤 *Client Information:*
Name: ${clientName}
Email: ${clientEmail}
Company: ${companyName || "Not specified"}

📋 *Project Details:*
Type: ${projectType}
Budget: ${finalBudget || "To be negotiated"}
Timeline: ${timeline || "To be discussed"}

📝 *Project Description:*
${projectDescription}

💡 *Why work with ${creator?.name}:*
${reasonToChoose || "Not specified"}

---
_This message was sent through our Creator Collaboration Platform_`;

      const encodedMessage = encodeURIComponent(message);
      const cleanNumber = whatsappNumber.replace(/[^\d+]/g, "");
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, "_blank");

      // Show success message
      alert("Your collaboration request has been sent! The creator will contact you soon.");
      
      // Reset form and close dialog
      handleReset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!creator) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl bg-background border-border max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader className="text-left border-b border-border pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <AlertDialogTitle className="text-2xl font-bold text-foreground">
                Collaborate with {creator.name}
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2">
                Let us know about your project and why you'd love to work together
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          
          {/* Creator Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/50 border border-border rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Selected Creator</p>
                <p className="text-lg font-bold text-foreground">{creator.name}</p>
                <p className="text-sm text-muted-foreground">{creator.category}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="text-lg font-bold gradient-text">{creator.price}</p>
              </div>
            </div>
          </motion.div>

          {/* Client Name */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <User size={16} /> Your Name <span className="text-destructive">*</span>
            </label>
            <input
              required
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </motion.div>

          {/* Email */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Mail size={16} /> Email Address <span className="text-destructive">*</span>
            </label>
            <input
              required
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </motion.div>

          {/* Company Name */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Briefcase size={16} /> Company/Brand Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your company name (optional)"
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </motion.div>

          {/* Project Type */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Project Type <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {projectTypeOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setProjectType(type)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    projectType === type
                      ? "gradient-bg text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Project Description */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <MessageSquare size={16} /> Project Description <span className="text-destructive">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Tell us about your project, goals, deliverables, and what you're looking to achieve..."
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
            />
          </motion.div>

          {/* Budget */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <label className="text-sm font-semibold text-foreground mb-2 block">Budget Range</label>
            <select
              value={budget}
              onChange={(e) => {
                setBudget(e.target.value);
                if (e.target.value !== "Custom") {
                  setCustomBudget("");
                }
              }}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            >
              <option value="">Select your budget range...</option>
              <option value="$500 - $1,000">$500 - $1,000</option>
              <option value="$1,000 - $3,000">$1,000 - $3,000</option>
              <option value="$3,000 - $5,000">$3,000 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
              <option value="To be negotiated">To be negotiated</option>
              <option value="Custom">Custom Amount</option>
            </select>

            {/* Custom Budget Input */}
            {budget === "Custom" && (
              <motion.input
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                type="text"
                placeholder="e.g., $15,000 or $2,000/month"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow mt-3"
              />
            )}
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <label className="text-sm font-semibold text-foreground mb-2 block">Timeline</label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            >
              <option value="">Select timeline...</option>
              <option value="Immediate (Next 1-2 weeks)">Immediate (Next 1-2 weeks)</option>
              <option value="Short term (1-3 months)">Short term (1-3 months)</option>
              <option value="Medium term (3-6 months)">Medium term (3-6 months)</option>
              <option value="Long term (6+ months)">Long term (6+ months)</option>
              <option value="Ongoing partnership">Ongoing partnership</option>
            </select>
          </motion.div>

          {/* Why Choose This Creator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Heart size={16} /> Why Do You Want to Work with {creator.name}?
            </label>
            <textarea
              value={reasonToChoose}
              onChange={(e) => setReasonToChoose(e.target.value)}
              placeholder="Tell them why you believe they're the perfect fit for your project. What do you love about their work?"
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
            />
          </motion.div>

          {/* Submit & Cancel Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 pt-4"
          >
            <button
              type="button"
              onClick={() => {
                handleReset();
                onOpenChange(false);
              }}
              className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 gradient-bg text-accent-foreground py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send size={16} />
              {isSubmitting ? "Sending..." : "Send Collaboration Request"}
            </button>
          </motion.div>

          {/* Info Text */}
          <p className="text-xs text-muted-foreground text-center pt-2">
            Your request will be sent via WhatsApp. The creator will review and contact you directly.
          </p>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HireCreatorDialog;
