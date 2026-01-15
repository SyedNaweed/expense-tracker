# 💰 Expense Tracker – Full Stack Application

A simple full-stack Expense Tracker application that allows users to add, edit, delete, and filter expenses, and view monthly spending summaries with category-wise breakdown.

This project was built as an **intern-level full-stack assignment**, focusing on clean REST APIs and a functional React frontend.

---

## 🚀 Features

### Backend
- Add expense
- List expenses with category & month filters
- Update expense
- Delete expense
- Monthly spending summary
- Category-wise breakdown

### Frontend
- Add / Edit / Delete expenses
- Filter expenses by category and month
- Monthly summary view
- Category breakdown list
- Responsive and simple UI

---

## 🧱 Tech Stack

### Frontend
- React.js (Vite)
- Axios
- CSS

### Backend
- Node.js
- Express.js
- CORS

### Database
- In-memory data storage (for simplicity and fast setup)

---

## 📂 Project Structure

expense-tracker/
├── backend/
│ ├── index.js
│ ├── package.json
│
├── frontend/
│ ├── src/
│ ├── package.json
│
└── README.md


---

## ▶️ How to Run the Project Locally

### 1️⃣ Start Backend
```bash
cd backend
npm install
node index.js
Backend runs on:http://localhost:5000
Start Frontend
cd frontend
npm install
npm run dev
Frontend runs on:http://localhost:5173
API Endpoints
Add Expense
POST /api/expenses
List Expenses (with filters)
GET /api/expenses?category=Food&month=2025-12
Update Expense
PUT /api/expenses/:id
Delete Expense
DELETE /api/expenses/:id
Monthly Summary
GET /api/expenses/summary?month=2025-12

Design Decisions

Used in-memory storage to keep the setup lightweight and focused on functionality.

Backend generates id and createdAt to ensure data integrity.

Filters are implemented using query parameters for clean REST design.

Modular and readable code structure for easy extension.

Future Enhancements (Optional)

Persistent database (MongoDB)

Authentication

Charts for category breakdown

Export expenses to CSV
Author

Syed Naweed
B.Tech Information Technology


---

## 🔹 STEP 6: Commit README

Run:
```bash
git add README.md
git commit -m "Add project README"
git push
