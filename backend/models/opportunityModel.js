const db = require('../config/db');

const Opportunity = {
    // Create
    async create(data) {
        const {
            title, description, research_area,
            faculty_name, department, required_skills,
            available_positions, application_deadline, status
        } = data;

        const [result] = await db.query(
            `INSERT INTO opportunities
             (title, description, research_area, faculty_name, department,
              required_skills, available_positions, application_deadline, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title, description, research_area,
                faculty_name, department,
                required_skills || null,
                available_positions || 1,
                application_deadline || null,
                status || 'Open'
            ]
        );
        return result.insertId;
    },

    // Get all
    async findAll() {
        const [rows] = await db.query('SELECT * FROM opportunities ORDER BY created_at DESC');
        return rows;
    },

    // Get one
    async findById(id) {
        const [rows] = await db.query('SELECT * FROM opportunities WHERE id = ?', [id]);
        return rows[0];
    },

    // Update (all allowed fields)
    async update(id, data) {
        const allowed = [
            'title', 'description', 'research_area',
            'faculty_name', 'department', 'required_skills',
            'available_positions', 'application_deadline', 'status'
        ];
        const fields = [];
        const values = [];

        for (const key of allowed) {
            if (data[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(data[key]);
            }
        }
        if (fields.length === 0) return 0;

        values.push(id);
        const [result] = await db.query(
            `UPDATE opportunities SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return result.affectedRows;
    },

    // Delete
    async delete(id) {
        const [result] = await db.query('DELETE FROM opportunities WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Opportunity;