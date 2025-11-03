const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Errands</h3>
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
