import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactInfoManager from "@/components/ContactInfoManager";
import { useToast } from "@/hooks/use-toast";
import { projectsApi, videosApi, contactsApi, type Project, type Video, type Contact } from "@/lib/api";

const Dashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [editingVideo, setEditingVideo] = useState<number | null>(null);

  // Fetch projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll,
  });

  // Fetch videos
  const { data: videos = [], isLoading: videosLoading } = useQuery<Video[]>({
    queryKey: ['videos'],
    queryFn: videosApi.getAll,
  });

  // Fetch contacts
  const { data: contacts = [], isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: contactsApi.getAll,
  });

  // Project mutations
  const createProjectMutation = useMutation({
    mutationFn: projectsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "Success", description: "Project added successfully" });
      setProjectForm({ title: "", description: "", image: "", category: "" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add project", variant: "destructive" });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: typeof projectForm }) =>
      projectsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "Success", description: "Project updated successfully" });
      setProjectForm({ title: "", description: "", image: "", category: "" });
      setEditingProject(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update project", variant: "destructive" });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: projectsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: "Success", description: "Project deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
    },
  });

  // Video mutations
  const createVideoMutation = useMutation({
    mutationFn: videosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast({ title: "Success", description: "Video added successfully" });
      setVideoForm({ title: "", url: "", description: "" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add video", variant: "destructive" });
    },
  });

  const updateVideoMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: typeof videoForm }) =>
      videosApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast({ title: "Success", description: "Video updated successfully" });
      setVideoForm({ title: "", url: "", description: "" });
      setEditingVideo(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update video", variant: "destructive" });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: videosApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast({ title: "Success", description: "Video deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete video", variant: "destructive" });
    },
  });

  // Contact mutations
  const deleteContactMutation = useMutation({
    mutationFn: contactsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({ title: "Success", description: "Contact deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete contact", variant: "destructive" });
    },
  });

  // Handlers
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject, data: projectForm });
    } else {
      createProjectMutation.mutate(projectForm);
    }
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVideo) {
      updateVideoMutation.mutate({ id: editingVideo, data: videoForm });
    } else {
      createVideoMutation.mutate(videoForm);
    }
  };

  const handleEditProject = (project: Project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category,
    });
    setEditingProject(project.id);
  };

  const handleEditVideo = (video: Video) => {
    setVideoForm({
      title: video.title,
      url: video.url,
      description: video.description,
    });
    setEditingVideo(video.id);
  };

  const handleCancelEditProject = () => {
    setProjectForm({ title: "", description: "", image: "", category: "" });
    setEditingProject(null);
  };

  const handleCancelEditVideo = () => {
    setVideoForm({ title: "", url: "", description: "" });
    setEditingVideo(null);
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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="contacts">Messages</TabsTrigger>
            <TabsTrigger value="contact-info">Contact Info</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingProject ? "Edit Project" : "Add New Project"}
                </CardTitle>
                <CardDescription>
                  {editingProject ? "Update project details" : "Create a new project entry"}
                </CardDescription>
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

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={createProjectMutation.isPending || updateProjectMutation.isPending}>
                      {(createProjectMutation.isPending || updateProjectMutation.isPending) && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {editingProject ? "Update Project" : "Add Project"}
                    </Button>
                    {editingProject && (
                      <Button type="button" variant="outline" onClick={handleCancelEditProject}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Projects</CardTitle>
                <CardDescription>Manage your current projects</CardDescription>
              </CardHeader>
              <CardContent>
                {projectsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : projects.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No projects yet. Add your first project above!</p>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">Category: {project.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEditProject(project)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteProjectMutation.mutate(project.id)}
                            disabled={deleteProjectMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingVideo ? "Edit Video" : "Add New Video"}
                </CardTitle>
                <CardDescription>
                  {editingVideo ? "Update video details" : "Add a video to your portfolio"}
                </CardDescription>
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

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={createVideoMutation.isPending || updateVideoMutation.isPending}>
                      {(createVideoMutation.isPending || updateVideoMutation.isPending) && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {editingVideo ? "Update Video" : "Add Video"}
                    </Button>
                    {editingVideo && (
                      <Button type="button" variant="outline" onClick={handleCancelEditVideo}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Videos</CardTitle>
                <CardDescription>Manage your video content</CardDescription>
              </CardHeader>
              <CardContent>
                {videosLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : videos.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No videos yet. Add your first video above!</p>
                ) : (
                  <div className="space-y-4">
                    {videos.map((video) => (
                      <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{video.title}</h3>
                          <p className="text-sm text-muted-foreground truncate max-w-md">{video.url}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEditVideo(video)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteVideoMutation.mutate(video.id)}
                            disabled={deleteVideoMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                {contactsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : contacts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No contact submissions yet.</p>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="p-4 border rounded-lg space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{contact.name}</h3>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteContactMutation.mutate(contact.id)}
                            disabled={deleteContactMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm">{contact.message}</p>
                        <p className="text-xs text-muted-foreground">
                          Received: {new Date(contact.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Info Tab */}
          <TabsContent value="contact-info" className="space-y-6">
            <ContactInfoManager />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
