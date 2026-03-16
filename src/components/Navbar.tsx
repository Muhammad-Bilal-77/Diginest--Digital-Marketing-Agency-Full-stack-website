import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ProposalDialog from "./ProposalDialog";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Creators", href: "#creators" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Process", href: "#process" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-card shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
          <a href="#" className="font-heading font-extrabold text-xl lg:text-2xl tracking-tight text-foreground">
            Nexus<span className="gradient-text">Media</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setDialogOpen(true)}
              className="gradient-bg text-accent-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              Get Free Proposal
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-card border-t border-border"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                    {link.label}
                  </a>
                ))}
                <button onClick={() => { setMobileOpen(false); setDialogOpen(true); }}
                  className="block w-full gradient-bg text-accent-foreground px-6 py-2.5 rounded-lg text-sm font-semibold text-center">
                  Get Free Proposal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <ProposalDialog open={dialogOpen} onOpenChange={setDialogOpen} mode="proposal" />
    </>
  );
};

export default Navbar;
