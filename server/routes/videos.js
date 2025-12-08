import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all videos
router.get('/', (req, res) => {
  try {
    const videos = db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single video
router.get('/:id', (req, res) => {
  try {
    const video = db.prepare('SELECT * FROM videos WHERE id = ?').get(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create video
router.post('/', (req, res) => {
  try {
    const { title, url, description } = req.body;

    if (!title || !url || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const stmt = db.prepare(
      'INSERT INTO videos (title, url, description) VALUES (?, ?, ?)'
    );
    const result = stmt.run(title, url, description);

    const newVideo = db.prepare('SELECT * FROM videos WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update video
router.put('/:id', (req, res) => {
  try {
    const { title, url, description } = req.body;

    if (!title || !url || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const stmt = db.prepare(
      'UPDATE videos SET title = ?, url = ?, description = ? WHERE id = ?'
    );
    const result = stmt.run(title, url, description, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const updatedVideo = db.prepare('SELECT * FROM videos WHERE id = ?').get(req.params.id);
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete video
router.delete('/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM videos WHERE id = ?');
    const result = stmt.run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
