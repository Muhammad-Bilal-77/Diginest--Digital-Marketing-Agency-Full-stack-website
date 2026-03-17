import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to that element
    if (hash) {
      const timer = setTimeout(() => {
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      // Otherwise, scroll to top when pathname changes
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
