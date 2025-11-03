import { Target, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
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

  return (
    <section id="about" className="py-20 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
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
              className="border-border hover:shadow-lg transition-smooth hover:-translate-y-1"
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
