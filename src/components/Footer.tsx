import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const columns = [
    {
      title: "Services",
      links: ["Web Design", "Digital Marketing", "SEO Optimization", "Social Media", "Branding", "Paid Ads"],
    },
    {
      title: "Company",
      links: ["About Us", "Our Team", "Careers", "Blog", "Contact"],
    },
    {
      title: "Portfolio",
      links: ["Case Studies", "Web Projects", "Branding Work", "Marketing Campaigns"],
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide section-padding pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-heading text-2xl font-extrabold mb-4">
              Nexus<span className="gradient-text">Media</span>
            </p>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-sm mb-6">
              Award-winning digital marketing & web design agency delivering results-driven strategies for ambitious brands worldwide.
            </p>
            <div className="space-y-3 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-2"><Mail size={14} /> hello@nexusmedia.com</div>
              <div className="flex items-center gap-2"><Phone size={14} /> +1 (555) 123-4567</div>
              <div className="flex items-center gap-2"><MapPin size={14} /> New York, NY</div>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-bold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            © 2026 NexusMedia. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "Instagram", "Dribbble"].map((s) => (
              <a key={s} href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
