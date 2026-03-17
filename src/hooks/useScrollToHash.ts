import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const hash = location.hash;
      
      if (hash) {
        // Remove the # and get the element ID
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // If no hash, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);
};
