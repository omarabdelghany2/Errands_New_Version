import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all contact info
router.get('/', (req, res) => {
  try {
    const contactInfo = db.prepare('SELECT * FROM contact_info ORDER BY display_order ASC, id ASC').all();
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get contact info by type
router.get('/type/:type', (req, res) => {
  try {
    const contactInfo = db.prepare('SELECT * FROM contact_info WHERE type = ? ORDER BY display_order ASC, id ASC').all(req.params.type);
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create contact info
router.post('/', (req, res) => {
  try {
    const { type, value, label, display_order } = req.body;

    if (!type || !value) {
      return res.status(400).json({ error: 'Type and value are required' });
    }

    if (!['phone', 'email'].includes(type)) {
      return res.status(400).json({ error: 'Type must be either "phone" or "email"' });
    }

    const stmt = db.prepare(
      'INSERT INTO contact_info (type, value, label, display_order) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(type, value, label || null, display_order || 0);

    const newContactInfo = db.prepare('SELECT * FROM contact_info WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newContactInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update contact info
router.put('/:id', (req, res) => {
  try {
    const { type, value, label, display_order } = req.body;

    if (!type || !value) {
      return res.status(400).json({ error: 'Type and value are required' });
    }

    if (!['phone', 'email'].includes(type)) {
      return res.status(400).json({ error: 'Type must be either "phone" or "email"' });
    }

    const stmt = db.prepare(
      'UPDATE contact_info SET type = ?, value = ?, label = ?, display_order = ? WHERE id = ?'
    );
    const result = stmt.run(type, value, label || null, display_order || 0, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Contact info not found' });
    }

    const updatedContactInfo = db.prepare('SELECT * FROM contact_info WHERE id = ?').get(req.params.id);
    res.json(updatedContactInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete contact info
router.delete('/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM contact_info WHERE id = ?');
    const result = stmt.run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Contact info not found' });
    }

    res.json({ message: 'Contact info deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
