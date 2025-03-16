
import { useEffect, useRef } from 'react';

type Certification = {
  title: string;
  issuer: string;
  date: string;
};

const certifications: Certification[] = [
  {
    title: 'Microsoft Certified: Identity and Access Administrator Associate',
    issuer: 'Microsoft',
    date: 'November 2024'
  },
  {
    title: 'Microsoft Certified: Security Operations Analyst Associate',
    issuer: 'Microsoft',
    date: 'July 2024'
  },
  {
    title: 'Microsoft Certified: Azure Security Engineer Associate',
    issuer: 'Microsoft',
    date: 'December 2023'
  },
  {
    title: 'Microsoft Certified: Azure Network Engineer Associate',
    issuer: 'Microsoft',
    date: 'September 2022'
  },
  {
    title: 'Microsoft Certified: Windows Server Hybrid Administrator Associate',
    issuer: 'Microsoft',
    date: 'March 2022'
  },
  {
    title: 'Microsoft Certified: Azure Virtual Desktop Specialty',
    issuer: 'Microsoft',
    date: 'June 2021'
  },
  {
    title: 'Microsoft Certified: Azure Administrator Associate',
    issuer: 'Microsoft',
    date: 'April 2021'
  },
  {
    title: 'Microsoft 365 Certified: Administrator Expert',
    issuer: 'Microsoft',
    date: 'April 2020'
  },
  {
    title: 'Microsoft 365 Certified: Endpoint Administrator Associate',
    issuer: 'Microsoft',
    date: 'August 2019'
  },
  {
    title: 'Microsoft® Certified Solutions Expert: Mobility',
    issuer: 'Microsoft',
    date: 'March 2019'
  },
  {
    title: 'Microsoft Certified Solutions Associate: Windows 10',
    issuer: 'Microsoft',
    date: 'March 2019'
  },
  {
    title: 'Administering System Center Configuration Manager and Cloud Services Integration',
    issuer: 'Microsoft',
    date: 'November 2018'
  },
  {
    title: 'Microsoft® Certified Technology Specialist: Administering and Deploying System Center 2012 Configuration Manager',
    issuer: 'Microsoft',
    date: 'November 2013'
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
