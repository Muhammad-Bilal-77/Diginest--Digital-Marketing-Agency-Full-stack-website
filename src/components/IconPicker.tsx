import { useState, useMemo, ComponentType, createElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, LucideProps } from "lucide-react";
import * as Icons from "lucide-react";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

type IconName = keyof typeof Icons;
type LucideIcon = ComponentType<LucideProps>;

// All available lucide icons - commonly used for services
const commonIcons = [
  "Palette", "BarChart3", "Search", "Share2", "PenTool", "Megaphone",
  "Briefcase", "Target", "TrendingUp", "Users", "Award", "Zap",
  "Settings", "Code", "Smartphone", "Monitor", "Camera", "Video",
  "MessageSquare", "Mail", "Phone", "MapPin", "Clock", "Calendar",
  "Heart", "Star", "Checkmark", "AlertCircle", "Info", "HelpCircle",
  "ChevronRight", "ChevronDown", "ArrowRight", "ArrowUp", "Download", "Upload",
  "Copy", "Share", "Trash2", "Edit2", "Plus", "Minus",
  "Home", "File", "Folder", "Database", "Server", "Cloud",
  "Shield", "Lock", "Unlock", "Eye", "EyeOff", "Twitter",
  "Facebook", "Instagram", "Linkedin", "Github", "Youtube", "Dribbble",
  "Chrome", "Firefox", "Safari", "Cpu", "HardDrive", "Wifi",
  "Volume2", "Music", "Radio", "Headphones", "Mic", "Bell",
  "Gift", "Cake", "Coffee", "Droplet", "Wind", "Sun",
  "Moon", "CloudRain", "Zap", "Activity", "CornerDownRight", "Layers",
];

const IconPicker = ({ value, onChange, label }: IconPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter available icons
  const filteredIcons = useMemo(() => {
    return commonIcons.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const selectedIconComponent = (Icons[value as IconName] || Icons.Palette) as LucideIcon;

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-semibold text-foreground">{label}</label>}
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-3 px-4 py-2.5 bg-card border border-border rounded-lg text-foreground hover:border-foreground/30 transition-colors text-left"
        >
          <div className="flex-shrink-0">
            {createElement(selectedIconComponent, { size: 20 })}
          </div>
          <span className="flex-1 text-sm">{value || "Select an icon"}</span>
          <span className="text-xs text-muted-foreground">{filteredIcons.length} icons</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-lg shadow-lg"
            >
              {/* Search */}
              <div className="p-3 border-b border-border sticky top-0 bg-card rounded-t-lg">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search icons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-secondary border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground/30"
                    autoFocus
                  />
                </div>
              </div>

              {/* Icons Grid */}
              <div className="max-h-80 overflow-y-auto p-3">
                {filteredIcons.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm py-8">No icons found</p>
                ) : (
                  <div className="grid grid-cols-6 gap-2">
                    {filteredIcons.map((iconName) => {
                      const IconComponent = (Icons[iconName as IconName] || Icons.Palette) as LucideIcon;

                      return (
                        <button
                          key={iconName}
                          onClick={() => {
                            onChange(iconName);
                            setIsOpen(false);
                            setSearchTerm("");
                          }}
                          className={`relative p-3 rounded-lg border transition-all flex items-center justify-center group ${
                            value === iconName
                              ? "bg-accent border-accent text-accent-foreground"
                              : "bg-secondary border-border hover:border-foreground/30 text-foreground"
                          }`}
                          title={iconName}
                        >
                          {createElement(IconComponent, { size: 20 })}
                          {value === iconName && (
                            <div className="absolute inset-0 flex items-center justify-end p-1">
                              <Check size={14} className="text-accent-foreground opacity-100" />
                            </div>
                          )}
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 text-xs whitespace-nowrap bg-foreground text-background px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-1">
                            {iconName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IconPicker;
