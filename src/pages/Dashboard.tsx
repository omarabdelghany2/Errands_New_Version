import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
  });

  const [videoForm, setVideoForm] = useState({
    title: "",
    url: "",
    description: "",
  });

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Project Added",
      description: "New project has been added successfully.",
    });
    setProjectForm({ title: "", description: "", image: "", category: "" });
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Video Added",
      description: "New video has been added successfully.",
    });
    setVideoForm({ title: "", url: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content</p>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Project
                </CardTitle>
                <CardDescription>Create a new project entry</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input
                      id="project-title"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="Enter project title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="project-category">Category</Label>
                    <Input
                      id="project-category"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      placeholder="e.g., Web Development, Mobile App"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Enter project description"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-image">Image URL</Label>
                    <Input
                      id="project-image"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">Add Project</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Projects</CardTitle>
                <CardDescription>Manage your current projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Sample Project {i}</h3>
                        <p className="text-sm text-muted-foreground">Category: Web Development</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Video
                </CardTitle>
                <CardDescription>Add a video to your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVideoSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-title">Video Title</Label>
                    <Input
                      id="video-title"
                      value={videoForm.title}
                      onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                      placeholder="Enter video title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-url">Video URL</Label>
                    <Input
                      id="video-url"
                      value={videoForm.url}
                      onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                      placeholder="https://youtube.com/..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-description">Description</Label>
                    <Textarea
                      id="video-description"
                      value={videoForm.description}
                      onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                      placeholder="Enter video description"
                      rows={3}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">Add Video</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Videos</CardTitle>
                <CardDescription>Manage your video content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Sample Video {i}</h3>
                        <p className="text-sm text-muted-foreground">Duration: 5:30</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Submissions</CardTitle>
                <CardDescription>View messages from your contact form</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">John Doe {i}</h3>
                          <p className="text-sm text-muted-foreground">john{i}@example.com</p>
                        </div>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm">This is a sample contact message content...</p>
                      <p className="text-xs text-muted-foreground">Received: 2024-01-{10 + i}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
