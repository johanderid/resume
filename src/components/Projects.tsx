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
    title: 'Azure Workload Migration and Optimization',
    description: 'Led a year-long initiative to migrate on-premises workloads to Azure, optimizing infrastructure for performance and scalability.',
    extendedDescription: 'Spearheaded a comprehensive lift-and-shift migration of critical workloads to Azure, transitioning select applications to PaaS and SaaS models where feasible. Reviewed and troubleshooted configurations using Azure Policies, fine-tuned network setups, and established secure landing zones to support operational continuity. Provided actionable insights for infrastructure optimization, ensuring cost-efficiency and robust performance across a hybrid cloud environment.',
    tags: ['Azure', 'Cloud Migration', 'IaaS', 'PaaS', 'Security'],
  },
  {
    id: 2,
    title: 'Enterprise Azure Infrastructure Deployment',
    description: 'Designed and deployed Azure infrastructure for a large-scale workload migration, enhancing application performance and modernization.',
    extendedDescription: 'Collaborated with application teams to create detailed migration assessments and documentation, planning Azure infrastructure to meet diverse workload needs. Advised on application modernization opportunities and implemented solutions using Azure DevOps and Infrastructure-as-Code (IaC). Configured resource groups, virtual networks, and connectivity options to ensure seamless integration and operational resilience in a cloud-first environment.',
    tags: ['Azure', 'Cloud Migration', 'IaaS', 'Azure DevOps'],
  },
  {
    id: 3,
    title: 'Intune Security and Device Management Review',
    description: 'Enhanced endpoint security and management through a targeted Intune deployment for Windows devices.',
    extendedDescription: 'Planned and executed Windows update rings and feature upgrades, alongside device restriction policies for Windows 10/11. Strengthened security by integrating Windows Defender for Endpoint recommendations via Intune policies. Packaged and deployed applications, configured AutoPilot enrollments, and optimized device management workflows to ensure compliance and operational efficiency across a diverse device fleet.',
    tags: ['Intune', 'Endpoint Management', 'Security','Compliance', 'Windows AutoPilot'],
  },
  {
    id: 4,
    title: 'Hybrid AutoPilot Deployment',
    description: 'Implemented Windows AutoPilot for hybrid and cloud-only device enrollment scenarios.',
    extendedDescription: 'Orchestrated the planning and rollout of Windows AutoPilot, supporting both Hybrid Azure AD and full Azure AD join configurations. Streamlined device provisioning processes, ensuring secure and efficient onboarding of Windows endpoints into a modern management framework, tailored to meet organizational scalability and security requirements.',
    tags: ['Intune', 'Windows AutoPilot', 'Hybrid Identity', 'Endpoint Management'],
  },
  {
    id: 5,
    title: 'Android Enterprise MDM Expansion',
    description: 'Expanded mobile device management capabilities for Android tablets using Intune.',
    extendedDescription: 'Designed and implemented Android Enterprise Dedicated Device enrollment for a fleet of tablets, importing and deploying in-house developed applications. Configured detailed compliance policies, configuration profiles, and app management settings to secure and optimize Android, iOS, and iPadOS devices, enhancing operational functionality for end-users.',
    tags: ['Intune', 'Endpoint Management', 'Compliance', 'Android Enterprise','iOS','Windows','MDM'],
  },
  {
    id: 6,
    title: 'Modern Device Management Assessment',
    description: 'Conducted a comprehensive review of an existing Intune and Azure AD environment to modernize device management.',
    extendedDescription: 'Evaluated the configuration of Intune, Azure AD, and Active Directory Domain Services to identify enabled features and gaps. Documented requirements for application packaging, Windows updates, mobile device management, and Group Policy transitions to Intune, delivering a roadmap for a streamlined, modern management solution that improved security and user experience.',
    tags: ['Intune', 'Entra ID', 'Hybrid Identity', 'Endpoint Management', 'Compliance'],
  },
  {
    id: 7,
    title: 'Security Enhancement Proofs of Concept',
    description: 'Delivered innovative security solutions through multiple proof-of-concept implementations.',
    extendedDescription: 'Presented and implemented proofs of concept for Windows Admin Center, Always-On VPN, and Windows Defender for Endpoint Web Content Filtering. Rolled out device-based Conditional Access policies across all client devices, enhancing security posture and ensuring compliance with Zero Trust principles in a hybrid environment.',
    tags: ['Security', 'Zero Trust', 'Defender for Endpoint', 'MFA', 'Windows Admin Center', 'Point-to-site VPN']
  },
  {
    id: 8,
    title: 'Azure Site-to-Site VPN Deployment',
    description: 'Established secure connectivity between on-premises infrastructure and Azure via a Site-to-Site VPN.',
    extendedDescription: 'Planned and deployed a Site-to-Site VPN, integrating on-premises networks with Azure to enable secure, reliable data exchange. Configured virtual networks and gateways, ensuring seamless connectivity and operational continuity for hybrid workloads, tailored to meet stringent performance and security standards.',
    tags: ['Azure', 'Cloud Security', 'Site-to-Site VPN']
  },
  {
    id: 9,
    title: 'M365 and Azure Workload Migration',
    description: 'Executed a full-scale migration of workloads and Microsoft 365 services to Azure.',
    extendedDescription: 'Planned and implemented an Azure Landing Zone with networks, Site-to-Site and Point-to-Site VPNs, and IaaS virtual machines. Configured Azure AD Connect for Hybrid Azure AD join, OneDrive Known Folder Move, and Azure Backup/Site Recovery with test failovers. Rolled out multi-factor authentication, self-service password reset, and Conditional Access policies, enhancing security and productivity across the environment.',
    tags: ['Azure', 'Microsoft 365', 'Entra ID', 'MFA', 'Cloud Migration', 'IaaS', 'Security','Point-to-site VPN', 'Site-to-Site VPN']
  },
  {
    id: 10,
    title: 'Data and Infrastructure Migration Assessment',
    description: 'Conducted Azure Migrate assessments to plan on-premises-to-cloud transitions.',
    extendedDescription: 'Ran Azure Migrate assessments across multiple environments to evaluate workloads, producing detailed migration plans, Total Cost of Ownership (TCO) calculations, and Azure cost estimates. Delivered actionable documentation to prioritize migrations, aligning technical solutions with business goals for a seamless cloud adoption journey.',
    tags: ['Azure', 'Cloud Migration', 'IaaS', 'Performance']
  },
  {
    id: 11,
    title: 'Azure Virtual Desktop Implementation ( Diplomacy)',
    description: 'Deployed a scalable Azure Virtual Desktop environment with on-premises connectivity.',
    extendedDescription: 'Planned and implemented an Azure Landing Zone and Azure Virtual Desktop (AVD) solution for 100 users, integrating secure connectivity from on-premises to Azure. Configured AVD to deliver a high-performance remote desktop experience, tailored to support critical operations with robust security and scalability.',
    tags: ['Azure Virtual Desktop', 'FSLogix', 'Performance', 'Scaling', 'Cloud Security']
  },
  {
    id: 12,
    title: 'Azure Virtual Desktop and Disaster Recovery',
    description: 'Rolled out Azure Virtual Desktop with disaster recovery for critical workloads.',
    extendedDescription: 'Planned and implemented an Azure Landing Zone and Azure Virtual Desktop (AVD) environment for 100 users, alongside Azure Site Recovery for identified workloads. Ensured seamless failover and failback capabilities, delivering a resilient remote desktop solution with optimized performance and security.',
    tags: ['Azure Virtual Desktop', 'FSLogix', 'Scaling', 'Cloud Security']
  },
  {
    id: 13,
    title: 'Intune Device Enrollment and Security',
    description: 'Configured Intune for Windows device management and enhanced endpoint security.',
    extendedDescription: 'Planned and implemented Intune for Windows device enrollment, onboarded devices to Microsoft Defender for Cloud, and enforced Bitlocker encryption across all endpoints. Streamlined device management workflows, ensuring compliance and robust protection for a diverse device ecosystem.',
    tags: ['Intune', 'Endpoint Management', 'Security', 'Compliance', 'Bitlocker']
  },
  {
    id: 14,
    title: 'Azure Landing Zone Implementation',
    description: 'Established an Azure Landing Zone to enable workload migration to the cloud.',
    extendedDescription: 'Planned and deployed an Azure Landing Zone with virtual networks, Resource Groups, and Site-to-Site VPN connectivity. Executed a lift-and-shift migration of identified workloads to Azure IaaS, implementing Azure Backup to ensure data protection and operational continuity.',
    tags: ['Azure', 'IaaS', 'Cloud Migration', 'Site-to-Site VPN', 'Cloud Security']
  },
  {
    id: 15,
    title: 'Azure Virtual Desktop with Teams Optimization',
    description: 'Deployed Azure Virtual Desktop with Teams Voice for call center operations.',
    extendedDescription: 'Planned and implemented an Azure Landing Zone and Azure Virtual Desktop (AVD) environment, integrating Azure Site Recovery for workload resilience. Optimized AVD for Teams Voice functionality, supporting call center agents with a secure, high-performance remote desktop experience.',
    tags: ['Azure Virtual Desktop', 'FSLogix', 'Teams', "Scaling", 'BCDR']
  },
  {
    id: 16,
    title: 'Hybrid Security and AVD Implementation',
    description: 'Enhanced security and deployed Azure Virtual Desktop in a hybrid environment.',
    extendedDescription: 'Configured Azure Monitor and Azure Sentinel for advanced monitoring, alongside an Azure Virtual Desktop deployment with a Landing Zone. Secured user accounts with Conditional Access policies and established on-premises-to-Azure connectivity, delivering a robust hybrid solution.',
    tags: ['Azure Virtual Desktop', 'Cloud Security', 'Zero Trust', 'MFA', 'Azure Sentinel', 'Azure Monitor']
  },
  {
    id: 17,
    title: 'Azure Migration with Advanced Networking',
    description: 'Executed a lift-and-shift migration with advanced Azure networking features.',
    extendedDescription: 'Migrated on-premises workloads to Azure, implementing Azure DNS, Front Door, Web Application Firewall, and Application Gateways. Configured Site-to-Site and Point-to-Site VPNs, moved data to storage accounts, set up Key Vaults, and created reporting dashboards with Azure Monitor for operational insights.',
    tags: ['Azure', 'Cloud Migration', 'IaaS', 'Cloud Security', 'Site-to-Site VPN','Azure Networking']
  },
  {
    id: 18,
    title: 'Intune and SCCM Co-Management',
    description: 'Integrated Intune with SCCM for a hybrid device management solution.',
    extendedDescription: 'Configured co-management between SCCM and Intune, enabling Hybrid Azure AD join and auto-enrollment for workstations. Created Windows 10 images and task sequences for upgrades, built bare-metal images for vendors, and enforced security with Bitlocker and Microsoft Defender for Endpoint.',
    tags: ['Intune', 'SCCM', 'Hybrid Identity', 'Endpoint Management', 'Security', 'Bitlocker', 'Defender for Endpoint']
  },
  {
    id: 19,
    title: 'Intune AutoPilot and Device Imaging',
    description: 'Implemented Intune with AutoPilot and custom device imaging.',
    extendedDescription: 'Planned and configured Intune for Windows device enrollment, created MDT images for re-imaging, and set up AutoPilot enrollments. Configured OneDrive Known Folder Move, ensuring seamless device provisioning and data migration in a modern management framework.',
    tags: ['Intune', 'Windows AutoPilot', 'Endpoint Management', 'Microsoft 365', 'MDT']
  },
  {
    id: 20,
    title: 'M365 Upgrade and Endpoint Security',
    description: 'Upgraded endpoints to Windows 10 and Office 365 with enhanced security.',
    extendedDescription: 'Upgraded devices from Windows 7 to Windows 10 using SCCM, created bare-metal builds for vendors, and deployed Office 365. Configured OneDrive Known Folder Move and onboarded devices to Windows Defender for Endpoint, ensuring a secure and productive environment.',
    tags: ['Microsoft 365', 'SCCM', 'Endpoint Management', 'Security','Windows Defender']
  },
  {
    id: 21,
    title: 'M365 Deployment with Teams',
    description: 'Rolled out Microsoft 365 with Teams and hybrid identity integration.',
    extendedDescription: 'Upgraded devices from Windows 7 to Windows 10 using SCCM, created bare-metal builds for vendors, and deployed Office 365 with Microsoft Teams. Configured Azure AD Connect, assigned licenses, and optimized the environment for collaboration and productivity.',
    tags: ['Microsoft 365', 'SCCM', 'Teams', 'Entra ID', 'Hybrid Identity']
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