const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Complaint = require('../models/Complaint');

// Submit Complaint
router.post('/', auth, async (req, res) => {
  const { category, description } = req.body;
  try {
    const ticketId = Math.random().toString(36).substr(2, 9);
    const agency = category === 'Health' ? 'Health Agency' : category === 'Transport' ? 'Transport Agency' : 'Education Agency';
    const complaint = new Complaint({ ticketId, userId: req.user.id, category, description, agency });
    await complaint.save();
    res.json({ ticketId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Track Status
router.get('/status/:ticketId', async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ ticketId: req.params.ticketId }).populate('userId', 'name email');
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Get All Complaints
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const complaints = await Complaint.find().populate('userId', 'name email');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: Update Complaint
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    complaint.status = req.body.status || complaint.status;
    complaint.response = req.body.response || complaint.response;
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;