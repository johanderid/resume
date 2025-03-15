
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { title: 'Home', href: '#home' },
  { title: 'About', href: '#about' },
  { title: 'Experience', href: '#experience' },
  { title: 'Projects', href: '#projects' },
  { title: 'Contact', href: '#contact' }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll event for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4 blur-header",
        isScrolled ? "bg-white/80 shadow-sm backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a 
          href="#home" 
          className="text-xl font-display font-bold text-foreground"
        >
          <span className="text-gradient">Portfolio</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link",
                activeSection === link.href.substring(1) && "active"
              )}
            >
              {link.title}
            </a>
          ))}
        </nav>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center"
          aria-label="Toggle menu"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground"
          >
            {isMenuOpen ? (
              <path 
                d="M6 18L18 6M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            ) : (
              <path 
                d="M4 6H20M4 12H20M4 18H20" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-lg shadow-md transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col p-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                activeSection === link.href.substring(1) 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-foreground hover:bg-gray-100"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
