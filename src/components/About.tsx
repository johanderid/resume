import { useEffect, useRef } from 'react';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
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
  
  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-gray-800 text-gray-100">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="reveal">
              <h2 className="section-title">
                About <span className="text-gradient">Me</span>
              </h2>
              
              <p className="text-gray-300 mb-6">
                I'm a specialized cloud consultant with extensive experience in Microsoft cloud technologies.
                I help organizations transform their IT infrastructure through innovative cloud solutions.
              </p>
              
              <p className="text-gray-300 mb-6">
                My expertise spans across Azure, Intune, Azure Virtual Desktop (AVD), and Microsoft 365,
                enabling businesses to leverage cloud capabilities for enhanced productivity, security, and scalability.
              </p>
              
              <p className="text-gray-300 mb-6">
                I specialize in designing and implementing secure, efficient, and cost-effective cloud environments
                tailored to each client's unique requirements and business objectives.
              </p>
              
              <p className="text-gray-300 mb-6">
                When I'm not architecting cloud solutions, I'm continuously expanding my knowledge of emerging
                Microsoft technologies and best practices in cloud security and governance.
              </p>
            </div>
          </div>
          
          <div className="reveal">
            <div className="relative">
              <div className="glass-panel bg-gray-700/80 border-gray-600 rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-square w-full bg-gray-700 rounded-2xl">
                  <img 
                    src="/Resume_Photo.jpeg"
                    alt="Resume Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 text-white">My Expertise</h3>
              
              <div className="flex flex-wrap">
                {['Azure', 'Microsoft 365', 'Intune', 'Azure Virtual Desktop', 'Cloud Security', 
                  'Identity Management', 'Cloud Migration', 'Microsoft Entra ID', 'Azure DevOps', 
                  'Windows 365', 'Azure Automation', 'Cost Optimization'].map((skill) => (
                  <span key={skill} className="skill-tag bg-gray-700 text-gray-300 border border-gray-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;