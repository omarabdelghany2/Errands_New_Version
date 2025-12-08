import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactsApi, contactInfoApi, type ContactInfo } from "@/lib/api";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Fetch contact info
  const { data: contactInfo } = useQuery<ContactInfo[]>({
    queryKey: ['contact-info'],
    queryFn: contactInfoApi.getAll,
    retry: 1,
  });

  const phones = (contactInfo || []).filter(item => item.type === 'phone');
  const emails = (contactInfo || []).filter(item => item.type === 'email');

  const contactMutation = useMutation({
    mutationFn: contactsApi.create,
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. We'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            {/* Phone Numbers Card */}
            {phones.length > 0 && (
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
                        {phones.map((phone) => (
                          <div key={phone.id}>
                            <a
                              href={`tel:${phone.value}`}
                              className="block text-muted-foreground hover:text-accent transition-smooth"
                            >
                              {phone.value}
                            </a>
                            {phone.label && (
                              <span className="text-xs text-muted-foreground">({phone.label})</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Email Addresses Card */}
            {emails.length > 0 && (
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
                        {emails.map((email) => (
                          <div key={email.id}>
                            <a
                              href={`mailto:${email.value}`}
                              className="block text-muted-foreground hover:text-accent transition-smooth break-all"
                            >
                              {email.value}
                            </a>
                            {email.label && (
                              <span className="text-xs text-muted-foreground">({email.label})</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Form */}
          <Card className="border-border mb-12">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Direct Contact CTA */}
          {(phones.length > 0 || emails.length > 0) && (
            <div className="text-center">
              <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 hover:shadow-glow transition-smooth">
                <CardContent className="py-12">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Prefer Direct Contact?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    You can also reach us directly via email or phone.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {emails.length > 0 && (
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={() => window.location.href = `mailto:${emails[0].value}`}
                      >
                        Send Us an Email
                      </Button>
                    )}
                    {phones.length > 0 && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-accent text-accent hover:bg-accent/10"
                        onClick={() => window.location.href = `tel:${phones[0].value}`}
                      >
                        Call Us Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
