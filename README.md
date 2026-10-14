# 🎓 Research Opportunity Portal

A web-based application that allows faculty members to post, view, update, and manage research opportunities in one place. It replaces scattered communication (emails, WhatsApp groups, noticeboards) with a single centralized system.



-------------------------------------------------------
🔗 GITHUB REPOSITORY
-------------------------------------------------------

https://github.com/p240618-ali/research-opportunity-portal



BACKEND (REST API)
A backend API that performs CRUD operations on research opportunities:

1. Create opportunity        POST   /api/opportunities
2. Retrieve all              GET    /api/opportunities
3. Retrieve one by ID        GET    /api/opportunities/:id
4. Update                    PUT    /api/opportunities/:id
5. Delete                    DELETE /api/opportunities/:id

Each opportunity contains:
- Unique ID
- Research title
- Research description
- Research area
- Faculty member's name
- Department
- Required skills
- Number of available positions
- Application deadline
- Status (Open / Closed)

Status codes used: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Internal Server Error

FRONTEND
A simple interface that:
1. Displays all opportunities
2. Shows full details of a selected one
3. Provides a form to create new opportunities
4. Allows updating existing ones
5. Allows changing status from Open to Closed
6. Allows deleting opportunities
7. Shows success and error messages
8. Validates required fields

DATABASE
- MySQL (via XAMPP)
- Table: opportunities

TESTING
- Postman collection with 8 test scenarios: create, read all, read one, update, close, delete, 404 test, 400 test.


-------------------------------------------------------
🛠 TECH STACK
-------------------------------------------------------

- Backend:  Node.js, Express.js
- Database: MySQL (XAMPP)
- Frontend: HTML, CSS, JavaScript
- Testing:  Postman


-------------------------------------------------------
📁 PROJECT STRUCTURE
-------------------------------------------------------

research-opportunity-portal/
├── backend/          → Express REST API
├── frontend/         → HTML/CSS/JS interface
├── database/         → MySQL schema (schema.sql)
├── postman/          → Postman collection
└── README.md


-------------------------------------------------------
⚙️ PREREQUISITES
-------------------------------------------------------

Install these before running the project:

1. Node.js (v18 or later) — https://nodejs.org
2. XAMPP (for MySQL)      — https://www.apachefriends.org
3. Postman (for testing)  — https://www.postman.com/downloads/


-------------------------------------------------------
🚀 HOW TO RUN — STEP BY STEP
-------------------------------------------------------

STEP 1 — Start MySQL
--------------------
1. Open XAMPP Control Panel.
2. Click Start next to MySQL.
3. Wait for it to turn green.

STEP 2 — Create the Database
----------------------------
1. Open your browser and go to: http://localhost/phpmyadmin
2. Click the Import tab at the top.
3. Click Choose File and select: database/schema.sql
4. Click Go (or Import).

This creates:
- A database named research_portal
- A table named opportunities
- 3 sample rows to test with

STEP 3 — Set Up the Backend
---------------------------
Open PowerShell or Command Prompt and run:

    cd backend
    npm install

Then create the environment file:

Windows (PowerShell):
    copy .env.example .env

macOS / Linux:
    cp .env.example .env

Open the new .env file in a text editor and confirm:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=research_portal
    PORT=5000

NOTE: On XAMPP's default MySQL, the root user has no password — leave DB_PASSWORD= empty.

STEP 4 — Start the Backend Server
---------------------------------
In the same terminal (inside the backend folder):

    npm start

You should see:

    ✅ MySQL connected successfully
    🚀 Server running on http://localhost:5000

Leave this terminal open. Closing it stops the server.

Test it in your browser:
- http://localhost:5000                  → welcome message
- http://localhost:5000/api/opportunities → JSON list of opportunities

STEP 5 — Run the Frontend
-------------------------
The frontend is plain HTML/CSS/JavaScript — no build step needed.

Option A (simplest):
- Open frontend/index.html by double-clicking it.

Option B (recommended):
- Open the frontend folder in VS Code.
- Install the Live Server extension.
- Right-click index.html → Open with Live Server.

The frontend automatically connects to the backend at http://localhost:5000.

STEP 6 — Use the Application
----------------------------
In the browser, you can now:
- View all research opportunities
- Click New Opportunity to create one
- Click View to see full details
- Click Edit to update
- Click Close to change status from Open to Closed
- Click Delete to remove

STEP 7 — Test the API with Postman
----------------------------------
1. Make sure the backend is running (npm start).
2. Open Postman.
3. Click Import → select postman/Research_Portal.postman_collection.json.
4. Run the 8 requests in order:

   1. Create Opportunity         → 201 Created
   2. Get All Opportunities      → 200 OK
   3. Get One Opportunity        → 200 OK
   4. Update Opportunity         → 200 OK
   5. Close Opportunity          → 200 OK
   6. Delete Opportunity         → 200 OK
   7. Get Deleted Opportunity    → 404 Not Found
   8. Invalid Request            → 400 Bad Request




-------------------------------------------------------
👤 AUTHOR
-------------------------------------------------------

Name:      Syed Ali Hussain Shah
Index No:  P24_0618
Module:    Software Development 
Date:      October 2025

