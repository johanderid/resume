
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
    title: 'Senior Frontend Developer',
    company: 'Company A',
    period: 'Jan 2021 - Present',
    description: 'Led the frontend development team in building a scalable and responsive web application. Implemented modern React patterns and optimized performance for a better user experience.',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS']
  },
  {
    title: 'Frontend Developer',
    company: 'Company B',
    period: 'Mar 2018 - Dec 2020',
    description: 'Developed and maintained multiple client-facing web applications. Collaborated with UX designers to implement responsive designs and ensure cross-browser compatibility.',
    skills: ['JavaScript', 'React', 'Redux', 'SCSS', 'Jest']
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
