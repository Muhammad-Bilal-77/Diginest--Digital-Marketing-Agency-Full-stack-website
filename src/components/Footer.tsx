import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProposalDialog from "./ProposalDialog";
import { buildApiUrl } from "@/lib/apiBase";

interface Service {
  _id: string;
  title: string;
  slug: string;
}

interface Settings {
  _id?: string;
  email: string;
  phone: string;
  location: string;
  socials: { name: string; url: string; icon: string }[];
}

const Footer = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [showProposal, setShowProposal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const servicesResponse = await fetch(buildApiUrl("/services"));
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setServices(servicesData);
        }

        // Fetch settings
        const settingsResponse = await fetch(buildApiUrl("/settings"));
        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json();
          setSettings(settingsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Services",
      links: services.map((s) => ({ title: s.title, slug: s.slug, path: `/services/${s.slug}` })),
    },
    {
      title: "Company",
      links: [
        { title: "About Us", slug: "about", path: "/about" },
        { title: "Our Team", slug: "team", path: "/#creators", isHash: true },
        { title: "Contact", slug: "contact", isAction: true },
      ],
    },
    {
      title: "Portfolio",
      links: [
        { title: "Projects", slug: "projects", path: "/#portfolio", isHash: true },
      ],
    },
  ];

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowProposal(true);
  };

  const handleHashLink = (path: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hash = path.split("#")[1];
    navigate(`/#${hash}`);
  };

  return (
    <>
      <footer className="bg-primary text-primary-foreground">
        <div className="container-wide section-padding pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <p className="font-heading text-2xl font-extrabold mb-4">
                Digi<span className="gradient-text">nest</span>
              </p>
              <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-sm mb-6">
                Award-winning digital marketing & web design agency delivering results-driven strategies for ambitious brands worldwide.
              </p>
              <div className="space-y-3 text-sm text-primary-foreground/60">
                {settings && (
                  <>
                    <div className="flex items-center gap-2">
                      <Mail size={14} /> {settings.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} /> {settings.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} /> {settings.location}
                    </div>
                  </>
                )}
              </div>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-heading font-bold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.title}>
                      {link.isAction ? (
                        <a
                          href="#"
                          onClick={handleContactClick}
                          className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                        >
                          {link.title}
                        </a>
                      ) : link.isHash ? (
                        <a
                          href={link.path}
                          onClick={(e) => handleHashLink(link.path, e)}
                          className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                        >
                          {link.title}
                        </a>
                      ) : (
                        <a
                          href={link.path}
                          className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(link.path);
                          }}
                        >
                          {link.title}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/40">
              © 2026 Digi nest. All rights reserved.
            </p>
            <div className="flex gap-6">
              {settings?.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url !== "#" ? "_blank" : undefined}
                  rel={social.url !== "#" ? "noopener noreferrer" : undefined}
                  className="text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <ProposalDialog open={showProposal} onOpenChange={setShowProposal} mode="proposal" />
    </>
  );
};

export default Footer;
