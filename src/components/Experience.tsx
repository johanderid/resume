
import { useEffect, useRef } from 'react';

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
};

const experienceData: ExperienceItem[] = [
  {
    title: 'Cloud Engineer',
    company: 'KEMBIT',
    period: 'July 2023 - February 2025',
    description: 'Optimized and managed Microsoft Azure cloud environments to enhance performance, scalability, and cost-efficiency while ensuring high availability and operational 
    resilience. Enforced security and compliance through vulnerability scans, system hardening, and robust identity management using Azure Active Directory, implementing multi-factor 
    authentication (MFA) with conditional access policies. Configured and maintained virtual networks, VPNs, and cloud tools like Office 365, Teams, and Exchange Online to support 
    seamless connectivity and productivity. Managed all aspects of Microsoft Intune for device management and compliance, leveraged Microsoft Defender to protect emails and endpoints, 
    and maintained Azure Virtual Desktop solutions for secure remote access. Oversaw Windows Server ecosystems and collaborated on scalable cloud solutions, proactively upgrading 
    systems to minimize downtime and adapt to evolving business needs.',
    skills: ['Azure', 'Microsoft 365', 'Intune', 'Azure Virtual Desktop', 'Microsoft Entra ID', 'Active Directory', 'Windows Server', 'Microsoft Defender']
  },
  {
    title: 'Cloud Infrastructure Consultant',
    company: 'Netsurit',
    period: 'April 2019 - June 2023',
    description: 'Delivered expert guidance on Azure, Microsoft 365, Intune, and SCCM, implementing cloud infrastructure and modern device management solutions for small, medium, and 
    enterprise clients. Collaborated with pre-sales teams to scope projects and define technical requirements, leading the execution of requirements analysis, deployment, and upgrades 
    for cloud and hybrid solutions. Facilitated client workshops to align technology with business needs and drove the adoption of modern workplace technologies to enhance productivity. 
    Managed project implementation from start to finish, ensuring seamless delivery, and provided troubleshooting support for issues in Azure, Intune, and Microsoft 365 environments. 
    Performed quality assurance to maintain high-quality outcomes and authored detailed documentation to support ongoing operations.',
    skills: ['Azure', 'Microsoft 365', 'Intune', 'Azure Virtual Desktop','Configuration Manager']
  },
  {
    title: 'Junior Web Developer',
    company: 'Company C',
    period: 'Jun 2016 - Feb 2018',
    description: 'Assisted in the development of web applications and implemented UI components based on design specifications. Learned and applied best practices for web development.',
    skills: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap']
  }
];

export function Experience() {
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
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    const revealElements = sectionRef.current?.querySelectorAll('.reveal');
    revealElements?.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 bg-gray-800 text-gray-200">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center reveal">
            Work <span className="text-gradient">Experience</span>
          </h2>
          
          <div className="experience-timeline">
            {experienceData.map((item, index) => (
              <div 
                key={index} 
                className="reveal" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="experience-dot" style={{ top: '32px' }}></div>
                <div className="experience-card bg-gray-700/80 border-gray-600">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-primary font-medium">{item.company}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-block bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {item.period}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap">
                    {item.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag bg-gray-600 text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
