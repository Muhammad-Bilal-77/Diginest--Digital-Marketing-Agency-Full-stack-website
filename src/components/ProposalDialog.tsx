import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Send, User, Briefcase, DollarSign, MessageSquare, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildApiUrl } from "@/lib/apiBase";

const serviceOptions = ["Web Design", "Digital Marketing", "SEO Optimization", "Social Media Marketing", "Branding & Graphic Design", "Paid Advertising", "Influencer Marketing"];
const budgetOptions = ["$500 - $1,000", "$1,000 - $3,000", "$3,000 - $5,000", "$5,000+"];
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

interface ProposalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "proposal" | "consultation";
}

const ProposalDialog = ({ open, onOpenChange, mode }: ProposalDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("923104833310");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(buildApiUrl("/settings"));
        if (response.ok) {
          const data = await response.json();
          const cleaned = data.whatsappNumber.replace(/\D/g, "");
          setWhatsappNumber(cleaned);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    if (open) {
      fetchSettings();
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isConsultation = mode === "consultation";
    const finalBudget = budget === "Custom" ? customBudget : budget;
    const text = isConsultation
      ? `Hi Digi nest! 👋\n\n*Consultation Booking*\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Service:* ${service}\n*Preferred Date:* ${date}\n*Preferred Time:* ${time}\n*Details:* ${message}`
      : `Hi Digi nest! 👋\n\n*Free Proposal Request*\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Service:* ${service}\n*Budget:* ${finalBudget}\n*Details:* ${message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
    toast({ title: "Redirecting to WhatsApp", description: "Complete your inquiry on WhatsApp." });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setName(""); setEmail(""); setPhone(""); setService(""); setBudget(""); setCustomBudget(""); setMessage(""); setDate(""); setTime("");
  };

  const isConsultation = mode === "consultation";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-extrabold">
            {isConsultation ? "Book a Free Consultation" : "Get Your Free Proposal"}
          </DialogTitle>
          <DialogDescription>
            {isConsultation
              ? "Schedule a call with our team to discuss your project."
              : "Tell us about your project and we'll prepare a custom strategy."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                <User size={13} /> Full Name
              </label>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                📧 Email
              </label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
              📱 Phone Number
            </label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000"
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
              <Briefcase size={13} /> Service Interested In
            </label>
            <div className="flex flex-wrap gap-1.5">
              {serviceOptions.map((s) => (
                <button type="button" key={s} onClick={() => setService(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    service === s ? "gradient-bg text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {!isConsultation && (
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                <DollarSign size={13} /> Budget Range
              </label>
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                {budgetOptions.map((b) => (
                  <button type="button" key={b} onClick={() => {
                    setBudget(b);
                    setCustomBudget("");
                  }}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      budget === b ? "gradient-bg text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}>
                    {b}
                  </button>
                ))}
                <button type="button" onClick={() => setBudget("Custom")}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    budget === "Custom" ? "gradient-bg text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}>
                  Custom
                </button>
              </div>
              {budget === "Custom" && (
                <input
                  type="text"
                  placeholder="Enter your budget"
                  value={customBudget}
                  onChange={(e) => setCustomBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              )}
            </div>
          )}

          {isConsultation && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                  <Calendar size={13} /> Preferred Date
                </label>
                <input required type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                  <Clock size={13} /> Preferred Time
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {timeSlots.map((t) => (
                    <button type="button" key={t} onClick={() => setTime(t)}
                      className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${
                        time === t ? "gradient-bg text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
              <MessageSquare size={13} /> Project Details
            </label>
            <textarea required rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project, goals, and timeline..."
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>

          <button type="submit"
            className="w-full gradient-bg text-accent-foreground py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Send size={15} />
            {isConsultation ? "Book via WhatsApp" : "Get Proposal via WhatsApp"}
          </button>
          <p className="text-xs text-muted-foreground text-center">
            You'll be redirected to WhatsApp to complete your inquiry.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalDialog;
