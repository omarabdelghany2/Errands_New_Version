import errandsLogo from "@/assets/errands-logo-transparent.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <img 
            src={errandsLogo} 
            alt="Errands Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <p className="text-primary-foreground/80 mb-4">
            Transforming businesses through innovation and excellence.
          </p>
          <div className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Errands. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
