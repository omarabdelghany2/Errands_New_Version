import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Target, TrendingUp, Users } from "lucide-react";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";

const ProjectDetail = () => {
  const { id } = useParams();

  const projectsData = {
    "1": {
      title: "Digital Transformation Initiative",
      subtitle: "Modernizing Legacy Systems for the Digital Age",
      image: project1,
      tags: ["Strategy", "Technology", "Innovation"],
      overview: "A comprehensive digital transformation project that revolutionized the client's operations by modernizing legacy systems and implementing cutting-edge technologies. This initiative resulted in a 45% improvement in operational efficiency and significantly enhanced the user experience across all platforms.",
      challenge: "The client was operating with outdated systems that were hampering growth and creating bottlenecks in their workflow. They needed a complete digital overhaul while maintaining business continuity and ensuring zero data loss during the transition.",
      solution: "We implemented a phased transformation approach, beginning with a thorough audit of existing systems. Our team developed a custom migration strategy, deployed cloud-based infrastructure, and implemented modern APIs to ensure seamless integration across all platforms.",
      results: [
        { label: "Efficiency Increase", value: "45%" },
        { label: "Cost Reduction", value: "30%" },
        { label: "User Satisfaction", value: "92%" },
        { label: "System Uptime", value: "99.9%" }
      ],
      timeline: "8 months",
      client: "Global Enterprise Corp",
      testimonial: "Errands transformed our entire operation. Their expertise and dedication to our success was evident throughout the project. The results exceeded our expectations.",
      technologies: ["Cloud Infrastructure", "API Integration", "Data Migration", "Security Protocols"],
      objectives: [
        "Modernize legacy systems without disrupting operations",
        "Improve operational efficiency by at least 40%",
        "Enhance data security and compliance",
        "Create scalable infrastructure for future growth"
      ]
    },
    "2": {
      title: "Enterprise Automation Suite",
      subtitle: "Streamlining Workflows Through Intelligent Automation",
      image: project2,
      tags: ["Automation", "Integration", "Efficiency"],
      overview: "A sophisticated automation solution that streamlined workflows across multiple departments, eliminating manual processes and reducing human error. The implementation saved over 200 hours monthly and improved data accuracy by 95%.",
      challenge: "The organization was struggling with repetitive manual tasks that were time-consuming and prone to errors. Multiple departments were using disconnected systems, leading to data silos and inefficient workflows.",
      solution: "We designed and implemented a comprehensive automation suite that integrated seamlessly with existing systems. The solution included intelligent workflow automation, real-time data synchronization, and custom dashboards for monitoring and analytics.",
      results: [
        { label: "Time Saved Monthly", value: "200+ hrs" },
        { label: "Error Reduction", value: "95%" },
        { label: "ROI", value: "340%" },
        { label: "Process Efficiency", value: "78%" }
      ],
      timeline: "6 months",
      client: "Tech Solutions Inc",
      testimonial: "The automation suite has been a game-changer for our business. We're now able to focus on strategic initiatives rather than repetitive tasks.",
      technologies: ["Process Automation", "System Integration", "AI/ML", "Dashboard Analytics"],
      objectives: [
        "Automate repetitive manual processes",
        "Integrate disconnected systems",
        "Reduce operational costs by 30%",
        "Improve data accuracy and accessibility"
      ]
    },
    "3": {
      title: "Business Intelligence Platform",
      subtitle: "Transforming Data into Actionable Insights",
      image: project3,
      tags: ["Analytics", "Data", "Insights"],
      overview: "An advanced analytics and reporting platform that provides real-time insights for strategic decision-making. The platform aggregates data from multiple sources and presents it through intuitive visualizations and customizable dashboards.",
      challenge: "The client had vast amounts of data scattered across different systems but lacked the tools to extract meaningful insights. Decision-making was slow and often based on incomplete information.",
      solution: "We developed a centralized business intelligence platform that aggregates, processes, and visualizes data in real-time. The solution includes predictive analytics, automated reporting, and mobile accessibility for executives on the go.",
      results: [
        { label: "Decision Speed", value: "65% faster" },
        { label: "Data Accuracy", value: "98%" },
        { label: "User Adoption", value: "89%" },
        { label: "Revenue Impact", value: "+25%" }
      ],
      timeline: "10 months",
      client: "Financial Services Group",
      testimonial: "This platform has given us unprecedented visibility into our operations. We can now make data-driven decisions with confidence and speed.",
      technologies: ["Big Data Processing", "Real-time Analytics", "Machine Learning", "Data Visualization"],
      objectives: [
        "Centralize data from multiple sources",
        "Provide real-time analytics and insights",
        "Enable predictive decision-making",
        "Improve reporting efficiency by 50%"
      ]
    }
  };

  const project = projectsData[id as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/">
              <Button variant="outline" className="mb-8 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <Badge key={index} className="bg-accent text-accent-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-white/90">{project.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Project Overview
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.overview}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {project.results.map((result, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-smooth">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="text-3xl font-bold text-accent mb-2">{result.value}</div>
                <div className="text-sm text-muted-foreground">{result.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-border">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold">The Challenge</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold">Our Solution</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Details */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Objectives */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Project Objectives</h3>
              <ul className="space-y-3">
                {project.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                    <span className="text-muted-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-base py-2 px-4">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <div className="text-sm text-muted-foreground">Timeline</div>
                    <div className="font-semibold">{project.timeline}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <div>
                    <div className="text-sm text-muted-foreground">Client</div>
                    <div className="font-semibold">{project.client}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <Card className="max-w-4xl mx-auto border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
          <CardContent className="pt-12 pb-12">
            <div className="text-center">
              <div className="text-6xl text-accent mb-4">"</div>
              <p className="text-xl text-foreground mb-6 italic leading-relaxed">
                {project.testimonial}
              </p>
              <div className="text-sm text-muted-foreground">— {project.client}</div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Interested in Similar Results?</h3>
          <p className="text-muted-foreground mb-6">
            Let's discuss how we can help transform your business
          </p>
          <Link to="/">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => {
                setTimeout(() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
