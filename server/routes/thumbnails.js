import express from 'express';

const router = express.Router();

// Get video thumbnail from TikTok
router.get('/tiktok', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    // Fetch TikTok oEmbed data
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    const response = await fetch(oembedUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch TikTok data');
    }

    const data = await response.json();

    res.json({
      thumbnail: data.thumbnail_url,
      title: data.title,
      author: data.author_name,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch TikTok thumbnail',
      message: error.message
    });
  }
});

export default router;
