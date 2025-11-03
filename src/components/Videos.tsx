import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

const Videos = () => {
  const videos = [
    {
      title: "Company Overview",
      description: "Discover our story, values, and vision for the future.",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
    },
    {
      title: "Project Showcase",
      description: "A detailed walkthrough of our most impactful projects.",
      thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
    },
    {
      title: "Client Testimonials",
      description: "Hear what our clients have to say about working with us.",
      thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
    }
  ];

  return (
    <section id="videos" className="py-20 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Video Gallery
          </h2>
          <p className="text-lg text-muted-foreground">
            Watch our videos to learn more about our work, our team, and the impact we create.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border hover:shadow-xl transition-smooth hover:-translate-y-2 group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-video bg-muted">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-primary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-glow">
                    <Play className="w-8 h-8 text-accent-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{video.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
