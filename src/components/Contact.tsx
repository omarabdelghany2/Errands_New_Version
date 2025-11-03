import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to start your next project? Contact us today and let's discuss how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-border hover:shadow-lg transition-smooth">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Phone Numbers</h3>
                    <div className="space-y-2">
                      <a
                        href="tel:01559828884"
                        className="block text-muted-foreground hover:text-accent transition-smooth"
                      >
                        01559828884
                      </a>
                      <a
                        href="tel:01557554433"
                        className="block text-muted-foreground hover:text-accent transition-smooth"
                      >
                        01557554433
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-smooth">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Email Addresses</h3>
                    <div className="space-y-2">
                      <a
                        href="mailto:info@errands-sys.com"
                        className="block text-muted-foreground hover:text-accent transition-smooth break-all"
                      >
                        info@errands-sys.com
                      </a>
                      <a
                        href="mailto:sales@errands-sys.com"
                        className="block text-muted-foreground hover:text-accent transition-smooth break-all"
                      >
                        sales@errands-sys.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 hover:shadow-glow transition-smooth">
              <CardContent className="py-12">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Work Together?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Let's discuss your project requirements and explore how Errands can help bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => window.location.href = "mailto:info@errands-sys.com"}
                  >
                    Send Us an Email
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent/10"
                    onClick={() => window.location.href = "tel:01559828884"}
                  >
                    Call Us Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
