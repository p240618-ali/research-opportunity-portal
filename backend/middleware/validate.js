exports.validateOpportunity = (req, res, next) => {
    const requiredFields = ['title', 'description', 'research_area', 'faculty_name', 'department'];

    // On POST, all required fields must be present
    if (req.method === 'POST') {
        const missing = requiredFields.filter(f => !req.body[f] || String(req.body[f]).trim() === '');
        if (missing.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Validation failed: missing required field(s): ${missing.join(', ')}`
            });
        }
    }

    // On PUT, if a field is provided it must not be empty
    for (const field of requiredFields) {
        if (req.body[field] !== undefined && String(req.body[field]).trim() === '') {
            return res.status(400).json({
                success: false,
                message: `Validation failed: ${field} cannot be empty.`
            });
        }
    }

    // Status validation
    if (req.body.status !== undefined && !['Open', 'Closed'].includes(req.body.status)) {
        return res.status(400).json({ success: false, message: "Status must be 'Open' or 'Closed'." });
    }

    // Positions validation
    if (req.body.available_positions !== undefined &&
        (isNaN(req.body.available_positions) || Number(req.body.available_positions) < 1)) {
        return res.status(400).json({ success: false, message: 'available_positions must be a positive number.' });
    }

    next();
};