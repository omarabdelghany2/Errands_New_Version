import { useEffect, useRef } from "react";
import { Target, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To deliver innovative solutions that exceed expectations and drive sustainable growth for our clients."
    },
    {
      icon: Users,
      title: "Our Team",
      description: "A dedicated group of professionals committed to excellence, collaboration, and continuous improvement."
    },
    {
      icon: Zap,
      title: "Our Approach",
      description: "Combining cutting-edge technology with proven methodologies to create impactful, lasting results."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Animate title
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementMiddle = rect.top + rect.height / 2;
        const distanceFromCenter = elementMiddle - windowHeight / 2;
        const normalizedDistance = distanceFromCenter / windowHeight;

        const scale = 1 - Math.abs(normalizedDistance) * 0.1;
        titleRef.current.style.transform = `scale(${Math.max(0.95, Math.min(1.05, scale))})`;
      }

      // Animate value cards with 3D effects
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;

        // Calculate progress (0 to 1 as element moves through viewport)
        const progress = 1 - Math.abs(cardCenter - viewportCenter) / viewportCenter;
        const clampedProgress = Math.max(0, Math.min(1, progress));

        // 3D transforms
        const rotateX = (0.5 - clampedProgress) * 10;
        const translateY = (1 - clampedProgress) * 20;
        const scale = 0.95 + clampedProgress * 0.05;
        const opacity = 0.6 + clampedProgress * 0.4;

        // Stagger effect based on index
        const delay = index * 0.05;
        const adjustedProgress = Math.max(0, clampedProgress - delay);

        card.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          translateY(${translateY}px)
          scale(${scale})
        `;
        card.style.opacity = `${opacity}`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="py-20 sm:py-24 bg-secondary/30" style={{ perspective: '1500px' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="max-w-3xl mx-auto text-center mb-16 transition-transform will-change-transform">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Errands
          </h2>
          <p className="text-lg text-muted-foreground">
            We are a forward-thinking company dedicated to transforming businesses through innovative solutions,
            strategic expertise, and unwavering commitment to excellence. Our portfolio showcases the breadth
            and depth of our capabilities across various industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="border-border hover:shadow-lg transition-smooth hover:-translate-y-1 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
