import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Videos from "@/components/Videos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollingBackground3D from "@/components/ScrollingBackground3D";
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <div className="min-h-screen relative">
      {/* 3D Background that rotates with scroll */}
      <ScrollingBackground3D />

      {/* Main content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Videos />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
