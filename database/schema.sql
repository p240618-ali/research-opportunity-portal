CREATE DATABASE IF NOT EXISTS research_portal;
USE research_portal;

DROP TABLE IF EXISTS opportunities;

CREATE TABLE opportunities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    research_area VARCHAR(150) NOT NULL,
    faculty_name VARCHAR(150) NOT NULL,
    department VARCHAR(150) NOT NULL,
    required_skills VARCHAR(255) DEFAULT NULL,
    available_positions INT DEFAULT 1,
    application_deadline DATE DEFAULT NULL,
    status ENUM('Open', 'Closed') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data covering all attributes
INSERT INTO opportunities
(title, description, research_area, faculty_name, department, required_skills, available_positions, application_deadline, status)
VALUES
('AI for Healthcare Diagnostics',
 'Develop machine learning models to detect diseases from medical imaging data.',
 'Artificial Intelligence',
 'Dr. Ayesha Khan',
 'Computer Science',
 'Python, TensorFlow, Image Processing',
 2, '2025-12-31', 'Open'),

('IoT-Based Smart Energy Grid',
 'Design and prototype an IoT system that optimizes energy distribution in real time.',
 'Internet of Things',
 'Dr. Bilal Ahmed',
 'Electrical Engineering',
 'C++, MQTT, Embedded Systems',
 1, '2025-11-30', 'Open'),

('Blockchain Security for Academic Records',
 'Investigate consensus mechanisms and smart contracts for tamper-proof academic records.',
 'Cybersecurity',
 'Dr. Sana Riaz',
 'Information Security',
 'Solidity, Cryptography, Networking',
 3, '2025-10-15', 'Closed');