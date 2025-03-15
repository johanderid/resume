
import { useEffect, useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate center of the element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      const distanceX = (clientX - centerX) / 25;
      const distanceY = (clientY - centerY) / 25;
      
      // Apply the transform to the background shapes
      const shapes = containerRef.current.querySelectorAll('.bg-shape');
      shapes.forEach((shape: Element, index) => {
        const factor = (index + 1) * 0.4;
        (shape as HTMLElement).style.transform = `translate(${distanceX * factor}px, ${distanceY * factor}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden page-fade-in bg-gray-900 text-gray-100">
      {/* Background elements with darker colors */}
      <div className="absolute inset-0 z-0">
        <div className="bg-shape absolute top-20 left-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="bg-shape absolute bottom-20 right-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="bg-shape absolute top-40 right-40 w-40 h-40 rounded-full bg-primary/10 blur-2xl"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary animate-fade-in">
              Cloud Consultant
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-gradient">Your Name</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Specialized in Azure, Intune, Azure Virtual Desktop, and Microsoft 365 solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a href="#projects" className="button-primary">
              View My Work
            </a>
            <a href="#contact" className="button-secondary">
              Get In Touch
            </a>
          </div>
          
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <a 
              href="#about" 
              className="inline-flex flex-col items-center text-gray-500 hover:text-primary transition-colors"
              aria-label="Scroll to about section"
            >
              <span className="mb-2 text-sm">Scroll down</span>
              <svg 
                className="animate-bounce w-6 h-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
