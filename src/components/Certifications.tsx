
import { useEffect, useRef } from 'react';

type Certification = {
  title: string;
  issuer: string;
  date: string;
};

const certifications: Certification[] = [
  {
    title: 'Microsoft Certified: Azure Solutions Architect Expert',
    issuer: 'Microsoft',
    date: 'Oct 2022'
  },
  {
    title: 'Microsoft 365 Certified: Enterprise Administrator Expert',
    issuer: 'Microsoft',
    date: 'May 2022'
  },
  {
    title: 'Microsoft Certified: Azure Administrator Associate',
    issuer: 'Microsoft',
    date: 'Jan 2021'
  },
  {
    title: 'Microsoft Certified: Intune Administrator Associate',
    issuer: 'Microsoft',
    date: 'Mar 2021'
  },
  {
    title: 'Microsoft Certified: Azure Virtual Desktop Specialty',
    issuer: 'Microsoft',
    date: 'Sep 2021'
  },
  {
    title: 'Microsoft Certified: Security Administrator Associate',
    issuer: 'Microsoft',
    date: 'Jul 2022'
  }
];

export function Certifications() {
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
    <section id="certifications" ref={sectionRef} className="py-20 md:py-32 bg-gray-900 text-gray-100">
      <div className="section-container">
        <h2 className="section-title text-center reveal">
          Microsoft <span className="text-gradient">Certifications</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 hover:border-primary/30 rounded-lg p-6 transition-all reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-lg font-bold text-white mb-3">{cert.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-primary text-sm">{cert.issuer}</p>
                <span className="text-gray-400 text-sm">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
