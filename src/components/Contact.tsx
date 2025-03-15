
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button'; 
import { Textarea } from '@/components/ui/textarea';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const revealElements = sectionRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a simulation of form submission. In a real application, you would
    // implement actual form submission logic to a backend service.
    console.log({ name, email, message });
    
    // Simulate successful submission
    setTimeout(() => {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      
      // Reset the submission state after a few seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };
  
  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-gray-800">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="section-title">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you. Fill out the form below or reach out through LinkedIn.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-colors"
                    placeholder="How can I help you?"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="button-primary w-full flex justify-center items-center"
                >
                  {submitted ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Message Sent!
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
            
            <div className="reveal">
              <div className="glass-panel rounded-xl p-8 h-full bg-gray-700/80">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/20 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-white">Email</h4>
                      <a 
                        href="mailto:your.email@example.com" 
                        className="text-gray-300 hover:text-primary transition-colors"
                      >
                        your.email@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/20 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-white">Location</h4>
                      <p className="text-gray-300">City, Country</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-lg font-semibold mb-4 text-white">Connect with Me</h4>
                  
                  <div className="flex">
                    <a
                      href="https://linkedin.com/in/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
