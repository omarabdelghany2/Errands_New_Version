import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(scrollY / windowHeight, 1);

      // Parallax effect for background
      if (bgRef.current) {
        const parallaxSpeed = 0.5;
        bgRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px) scale(${1 + scrollProgress * 0.1})`;
      }

      // 3D transform and fade for content
      if (contentRef.current) {
        const fadeOut = 1 - scrollProgress;
        const scale = 1 - scrollProgress * 0.2;
        const rotateX = scrollProgress * 15; // Slight 3D tilt

        contentRef.current.style.opacity = `${fadeOut}`;
        contentRef.current.style.transform = `
          scale(${scale})
          translateY(${scrollY * 0.3}px)
          perspective(1000px)
          rotateX(${rotateX}deg)
        `;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay - with parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <img
          src={heroImage}
          alt="Errands Company"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
      </div>

      {/* Content - with 3D transforms */}
      <div
        ref={contentRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Welcome to <span className="text-accent">Errands</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Delivering exceptional solutions that transform your business through innovation, expertise, and dedication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-glow group"
            >
              View Our Projects
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
