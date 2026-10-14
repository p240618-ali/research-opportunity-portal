const Opportunity = require('../models/opportunityModel');

// POST /api/opportunities
exports.createOpportunity = async (req, res) => {
    try {
        const id = await Opportunity.create(req.body);
        const created = await Opportunity.findById(id);
        res.status(201).json({ success: true, message: 'Opportunity created', data: created });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

// GET /api/opportunities
exports.getAllOpportunities = async (req, res) => {
    try {
        const data = await Opportunity.findAll();
        res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

// GET /api/opportunities/:id
exports.getOpportunityById = async (req, res) => {
    try {
        const data = await Opportunity.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ success: false, message: 'Opportunity not found' });
        }
        res.status(200).json({ success: true, data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

// PUT /api/opportunities/:id
exports.updateOpportunity = async (req, res) => {
    try {
        const existing = await Opportunity.findById(req.params.id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Opportunity not found' });
        }
        await Opportunity.update(req.params.id, req.body);
        const updated = await Opportunity.findById(req.params.id);
        res.status(200).json({ success: true, message: 'Opportunity updated', data: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

// DELETE /api/opportunities/:id
exports.deleteOpportunity = async (req, res) => {
    try {
        const affected = await Opportunity.delete(req.params.id);
        if (affected === 0) {
            return res.status(404).json({ success: false, message: 'Opportunity not found' });
        }
        res.status(200).json({ success: true, message: 'Opportunity deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};