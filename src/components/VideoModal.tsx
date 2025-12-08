import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type Video } from "@/lib/api";

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ video, isOpen, onClose }: VideoModalProps) => {
  if (!video) return null;

  // Get video platform
  const getVideoPlatform = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('tiktok.com') || url.includes('vm.tiktok.com')) {
      return 'tiktok';
    }
    return 'unknown';
  };

  // Get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      let videoId = '';
      if (url.includes('youtu.be')) {
        videoId = url.split('/').pop()?.split('?')[0] || '';
      } else if (url.includes('youtube.com')) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v') || '';
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
    } catch {
      return null;
    }
  };

  // Get TikTok embed URL
  const getTikTokEmbedUrl = (url: string) => {
    try {
      // Extract video ID from TikTok URL
      const match = url.match(/\/video\/(\d+)/);
      if (match && match[1]) {
        return `https://www.tiktok.com/embed/v2/${match[1]}`;
      }
      return null;
    } catch {
      return null;
    }
  };

  const platform = getVideoPlatform(video.url);
  const embedUrl = platform === 'youtube'
    ? getYouTubeEmbedUrl(video.url)
    : getTikTokEmbedUrl(video.url);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl">{video.title}</DialogTitle>
          {video.description && (
            <p className="text-sm text-muted-foreground mt-2">{video.description}</p>
          )}
        </DialogHeader>

        <div className="relative w-full bg-black">
          {embedUrl ? (
            platform === 'youtube' ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative w-full flex items-center justify-center" style={{ minHeight: '600px' }}>
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  style={{ maxWidth: '605px', minHeight: '600px' }}
                  allow="encrypted-media;"
                  allowFullScreen
                  scrolling="no"
                />
              </div>
            )
          ) : (
            <div className="flex items-center justify-center p-12 text-center">
              <div>
                <p className="text-muted-foreground mb-4">
                  Unable to embed this video. Please watch it directly:
                </p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Open Video →
                </a>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
