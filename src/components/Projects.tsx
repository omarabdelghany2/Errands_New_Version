import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { projectsApi, type Project } from "@/lib/api";

const Projects = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch projects from API
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll,
    retry: 1,
  });

  const safeProjects = projects || [];

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

  // Simple, reliable fade-in and slide-up animation
  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null;

      // Set initial state
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Card enters viewport - trigger animation
              setTimeout(() => {
                if (card) {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
                }
              }, index * 150); // Stagger by 150ms
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [safeProjects.length]);

  return (
    <section id="projects" className="py-20 sm:py-24" ref={sectionRef}>
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

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : safeProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No projects to display yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeProjects.map((project, index) => (
              <Link to={`/project/${project.id}`} key={project.id}>
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  style={{
                    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  }}
                >
                  <Card className="overflow-hidden border-border hover:shadow-xl transition-smooth hover:-translate-y-2 group h-full cursor-pointer">
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
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
