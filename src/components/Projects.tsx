import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";

const Projects = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 100);
            } else {
              setTimeout(() => {
                setVisibleCards((prev) => prev.filter((i) => i !== index));
              }, index * 50);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px"
        }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);
  const projects = [
    {
      id: "1",
      title: "Digital Transformation Initiative",
      description: "Comprehensive digital transformation project that modernized legacy systems and improved operational efficiency by 45%.",
      image: project1,
      tags: ["Strategy", "Technology", "Innovation"],
      videoName: "DT_Overview_2024.mp4"
    },
    {
      id: "2",
      title: "Enterprise Automation Suite",
      description: "Custom automation solution that streamlined workflows across multiple departments, saving 200+ hours monthly.",
      image: project2,
      tags: ["Automation", "Integration", "Efficiency"],
      videoName: "Automation_Demo.mp4"
    },
    {
      id: "3",
      title: "Business Intelligence Platform",
      description: "Advanced analytics and reporting platform providing real-time insights for strategic decision-making.",
      image: project3,
      tags: ["Analytics", "Data", "Insights"],
      videoName: "BI_Platform_Tour.mp4"
    }
  ];

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our portfolio of successful projects that showcase our expertise, 
            innovation, and commitment to delivering exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link to={`/project/${project.id}`} key={index}>
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className={`transition-all duration-700 ease-out ${
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <Card className="overflow-hidden border-border hover:shadow-xl transition-smooth hover:-translate-y-2 group h-full cursor-pointer"
              >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-3">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="font-medium text-accent">Video:</span>
                  {project.videoName}
                </p>
              </CardContent>
            </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
