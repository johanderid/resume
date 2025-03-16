import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Project = {
  id: number;
  title: string;
  description: string;
  extendedDescription: string;
  tags: string[];
};

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Enterprise Azure Migration',
    description: 'Designed and implemented a comprehensive migration of on-premises infrastructure to Azure.',
    extendedDescription: 'This project involved assessing over 50 legacy servers, migrating critical workloads to Azure IaaS, optimizing resource utilization with auto-scaling groups, and implementing Azure Security Center for continuous monitoring. Reduced infrastructure costs by 30% and improved uptime to 99.99%.',
    tags: ['Azure', 'Cloud Migration', 'IaaS', 'Security'],
  },
  {
    id: 2,
    title: 'Modern Workplace Transformation',
    description: 'Led the deployment of Microsoft 365 suite with advanced security configurations.',
    extendedDescription: 'Deployed Microsoft 365 for 1,000+ users, configured Entra ID with SSO and MFA, integrated Teams with custom workflows, and enforced DLP policies. Improved collaboration efficiency by 40% and reduced security incidents by 25%.',
    tags: ['Microsoft 365', 'Entra ID', 'Teams', 'Security'],
  },
  {
    id: 3,
    title: 'Azure Virtual Desktop Implementation',
    description: 'Architected and deployed a scalable AVD environment to support remote workers.',
    extendedDescription: 'Built custom golden images with FSLogix for profile management, optimized multi-session hosts for 500 concurrent users, and integrated with Azure AD for secure access. Achieved a 50% reduction in remote desktop deployment time.',
    tags: ['Azure Virtual Desktop', 'FSLogix', 'Performance', 'Scaling'],
  },
  {
    id: 4,
    title: 'Device Management with Intune',
    description: 'Implemented comprehensive device management solution using Microsoft Intune.',
    extendedDescription: 'Managed 2,000+ devices with Intune, deployed apps via Company Portal, enforced conditional access policies, and monitored compliance with custom reports. Reduced manual IT interventions by 60%.',
    tags: ['Intune', 'Endpoint Management', 'Security', 'Compliance'],
  },
  {
    id: 5,
    title: 'Azure Security Posture Enhancement',
    description: 'Conducted thorough assessment of cloud environment with Microsoft Defender.',
    extendedDescription: 'Implemented Defender for Cloud across 10 subscriptions, set up automated threat detection, hardened VMs with JIT access, and achieved 95% compliance with CIS benchmarks. Reduced attack surface by 70%.',
    tags: ['Cloud Security', 'Defender for Cloud', 'Compliance', 'Zero Trust'],
  },
  {
    id: 6,
    title: 'Hybrid Identity Architecture',
    description: 'Designed a robust hybrid identity solution with Microsoft Entra ID.',
    extendedDescription: 'Integrated on-premises AD with Entra ID for 5,000 users, implemented MFA and passwordless authentication, and streamlined access to 20+ SaaS apps via SSO. Cut login-related support tickets by 80%.',
    tags: ['Entra ID', 'Hybrid Identity', 'Authentication', 'MFA'],
  },
];

export function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
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
          } else {
            entry.target.classList.remove('active');
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
  }, [expandedProject, selectedTag]); // Added selectedTag to dependencies

  const toggleProjectDetails = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 bg-gray-800">
      <div className="section-container">
        <div className="text-center mb-16 reveal">
          <h2 className="section-title">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            A showcase of my cloud consulting projects, demonstrating expertise in Microsoft cloud technologies and solutions.
          </p>
          {expandedProject === null && (
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
          )}
        </div>

        {expandedProject !== null ? (
          filteredProjects
            .filter((project) => project.id === expandedProject)
            .map((project) => (
              <div
                key={project.id}
                className="project-card bg-gray-700 rounded-xl border border-gray-600 w-full p-8 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <p className="text-gray-300 mb-6">{project.extendedDescription}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "text-xs font-medium px-2.5 py-1 rounded-full bg-gray-800 text-gray-300"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => toggleProjectDetails(project.id)}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Read Less
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="project-card reveal bg-gray-700 rounded-xl border border-gray-600"
                style={{ animationDelay: `${(index % 3) * 0.2}s` }}
              >
                <div className="p-6">
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
                    <button
                      onClick={() => toggleProjectDetails(project.id)}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Read More
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;