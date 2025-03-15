
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
};

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Enterprise Azure Migration',
    description: 'Designed and implemented a comprehensive migration of on-premises infrastructure to Azure, including optimization of workloads and implementation of robust security controls.',
    tags: ['Azure', 'Cloud Migration', 'IaaS', 'Security'],
    link: '#'
  },
  {
    id: 2,
    title: 'Modern Workplace Transformation',
    description: 'Led the deployment of Microsoft 365 suite with advanced security configurations, enabling remote work capabilities and enhancing collaboration across the organization.',
    tags: ['Microsoft 365', 'Entra ID', 'Teams', 'Security'],
    link: '#'
  },
  {
    id: 3,
    title: 'Azure Virtual Desktop Implementation',
    description: 'Architected and deployed a scalable AVD environment to support remote workers, including custom image creation, FSLogix profiles, and multi-session optimization.',
    tags: ['Azure Virtual Desktop', 'FSLogix', 'Performance', 'Scaling'],
    link: '#'
  },
  {
    id: 4,
    title: 'Device Management with Intune',
    description: 'Implemented comprehensive device management solution using Microsoft Intune, including security policies, application deployment, and compliance monitoring.',
    tags: ['Intune', 'Endpoint Management', 'Security', 'Compliance'],
    link: '#'
  },
  {
    id: 5,
    title: 'Azure Security Posture Enhancement',
    description: 'Conducted thorough assessment of cloud environment and implemented Microsoft Defender for Cloud with enhanced security controls and monitoring capabilities.',
    tags: ['Cloud Security', 'Defender for Cloud', 'Compliance', 'Zero Trust'],
    link: '#'
  },
  {
    id: 6,
    title: 'Hybrid Identity Architecture',
    description: 'Designed and implemented a robust hybrid identity solution with Microsoft Entra ID, enabling seamless access management across cloud and on-premises resources.',
    tags: ['Entra ID', 'Hybrid Identity', 'Authentication', 'MFA'],
    link: '#'
  }
];

export function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const allTags = Array.from(
    new Set(projectsData.flatMap(project => project.tags))
  ).sort();
  
  const filteredProjects = selectedTag
    ? projectsData.filter(project => project.tags.includes(selectedTag))
    : projectsData;
  
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
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-gray-800"
    >
      <div className="section-container">
        <div className="text-center mb-16 reveal">
          <h2 className="section-title">
            My <span className="text-gradient">Projects</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            A showcase of my cloud consulting projects, demonstrating expertise in Microsoft cloud technologies and solutions.
          </p>
          
          <div className="inline-flex flex-wrap justify-center gap-2 p-2 bg-gray-700/80 backdrop-blur-sm rounded-xl">
            <button
              onClick={() => setSelectedTag(null)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedTag === null
                  ? "bg-gray-600 shadow-sm text-white"
                  : "text-gray-300 hover:bg-gray-600/60"
              )}
            >
              All
            </button>
            
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  selectedTag === tag
                    ? "bg-gray-600 shadow-sm text-white"
                    : "text-gray-300 hover:bg-gray-600/60"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="project-card reveal bg-gray-700 rounded-xl border border-gray-600"
              style={{ animationDelay: `${(index % 3) * 0.2}s` }}
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className={cn(
                        "text-xs font-medium px-2.5 py-1 rounded-full",
                        selectedTag === tag 
                          ? "bg-primary/20 text-primary" 
                          : "bg-gray-800 text-gray-300"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <span className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    View Project
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
