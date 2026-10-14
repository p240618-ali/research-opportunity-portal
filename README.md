# 🎓 Research Opportunity Portal

A full-stack web application for managing university research opportunities.

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Testing:** Postman

## 📁 Structure
```
backend/       → Express REST API
frontend/      → HTML/CSS/JS interface
database/      → MySQL schema
postman/       → Postman collection
```

## 🔗 GitHub Repository
https://github.com/<p240618-ali>/research-opportunity-portal

## ⚙ Setup & Run

### 1. Clone
```bash
git clone https://github.com/<p240618-ali>/research-opportunity-portal.git
cd research-opportunity-portal
```

### 2. Database
```bash
mysql -u root -p < database/schema.sql
```

### 3. Backend
```bash
cd backend
npm install
cp .env.example .env
npm start
```
Backend runs at: `http://localhost:5000`

### 4. Frontend
Open `frontend/index.html` in a browser (or use VS Code Live Server).

Make sure `API_URL` in `frontend/js/app.js` matches your backend URL.

## 🔌 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/opportunities | Create opportunity |
| GET    | /api/opportunities | List all |
| GET    | /api/opportunities/:id | Get one |
| PUT    | /api/opportunities/:id | Update |
| DELETE | /api/opportunities/:id | Delete |

## 🧪 Testing with Postman
1. Import `postman/Research_Portal.postman_collection.json`.
2. Ensure backend is running.
3. Run requests in order.

## ✅ Status Codes
- `200 OK` – Successful retrieval/update/delete
- `201 Created` – Resource created
- `400 Bad Request` – Invalid input
- `404 Not Found` – Resource missing
- `500 Internal Server Error` – Server failure


## 👤 Author
Your Name — P24_0618