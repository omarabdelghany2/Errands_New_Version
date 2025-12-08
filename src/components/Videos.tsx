import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Loader2 } from "lucide-react";
import { videosApi, type Video } from "@/lib/api";
import VideoModal from "@/components/VideoModal";

const Videos = () => {
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch videos from API
  const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: ['videos'],
    queryFn: videosApi.getAll,
    retry: 1,
  });

  const safeVideos = Array.isArray(videos) ? videos : [];

  // Function to detect video platform
  const getVideoPlatform = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('tiktok.com') || url.includes('vm.tiktok.com')) {
      return 'tiktok';
    }
    return 'unknown';
  };

  // Function to extract video thumbnail from URL
  const getVideoThumbnail = (url: string) => {
    const platform = getVideoPlatform(url);

    // YouTube thumbnail
    if (platform === 'youtube') {
      const videoId = url.includes('youtu.be')
        ? url.split('/').pop()?.split('?')[0]
        : new URL(url).searchParams.get('v');
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }

    // Default placeholder for TikTok (will be replaced by fetched thumbnail)
    return "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80";
  };

  // Fetch TikTok thumbnails
  useEffect(() => {
    const fetchTikTokThumbnails = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

      for (const video of videos) {
        const platform = getVideoPlatform(video.url);

        if (platform === 'tiktok') {
          try {
            const response = await fetch(
              `${API_URL}/thumbnails/tiktok?url=${encodeURIComponent(video.url)}`
            );

            if (response.ok) {
              const data = await response.json();
              setThumbnails((prev) => ({
                ...prev,
                [video.id]: data.thumbnail,
              }));
            }
          } catch (error) {
            console.error('Failed to fetch TikTok thumbnail:', error);
          }
        }
      }
    };

    if (safeVideos.length > 0) {
      fetchTikTokThumbnails();
    }
  }, [safeVideos]);

  // Get the appropriate thumbnail for a video
  const getThumbnailUrl = (video: Video) => {
    // If we have a fetched TikTok thumbnail, use it
    if (thumbnails[video.id]) {
      return thumbnails[video.id];
    }
    // Otherwise use the default thumbnail (YouTube or placeholder)
    return getVideoThumbnail(video.url);
  };

  // Get platform badge
  const getPlatformBadge = (url: string) => {
    const platform = getVideoPlatform(url);
    if (platform === 'youtube') {
      return (
        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-medium">
          YouTube
        </span>
      );
    } else if (platform === 'tiktok') {
      return (
        <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-md font-medium">
          TikTok
        </span>
      );
    }
    return null;
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay before clearing the video to allow modal animation
    setTimeout(() => setSelectedVideo(null), 200);
  };

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

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : safeVideos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No videos to display yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden border-border hover:shadow-xl transition-smooth hover:-translate-y-2 group">
                  <div className="relative overflow-hidden aspect-video bg-muted">
                    <img
                      src={getThumbnailUrl(video)}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80";
                      }}
                    />
                    {getPlatformBadge(video.url)}
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
              </div>
            ))}
          </div>
        )}

        {/* Video Modal */}
        <VideoModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default Videos;
