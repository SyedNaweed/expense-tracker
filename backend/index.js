const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory expense storage (as per PDF simplicity)
let expenses = [];

// Categories from PDF
const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Health",
  "Other",
];

/**
 * Add Expense
 * POST /api/expenses
 */
app.post("/api/expenses", (req, res) => {
  const { amount, description, category, date } = req.body;

  if (!amount || !description || !category || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!CATEGORIES.includes(category)) {
    return res.status(400).json({ message: "Invalid category" });
  }

  const expense = {
    id: Date.now().toString(),
    amount: Number(amount),
    description,
    category,
    date,
    createdAt: new Date(),
  };

  expenses.push(expense);
  res.status(201).json(expense);
});

/**
 * List Expenses with Filters
 * GET /api/expenses?category=Food&month=2025-12
 */
app.get("/api/expenses", (req, res) => {
  const { category, month } = req.query;

  let filtered = [...expenses];

  if (category) {
    filtered = filtered.filter((e) => e.category === category);
  }

  if (month) {
    filtered = filtered.filter((e) => e.date.startsWith(month));
  }

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  res.json({
    expenses: filtered,
    total,
    count: filtered.length,
  });
});

/**
 * Update Expense
 * PUT /api/expenses/:id
 */
app.put("/api/expenses/:id", (req, res) => {
  const { id } = req.params;
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Expense not found" });
  }

  expenses[index] = {
    ...expenses[index],
    ...req.body,
  };

  res.json(expenses[index]);
});

/**
 * Delete Expense
 * DELETE /api/expenses/:id
 */
app.delete("/api/expenses/:id", (req, res) => {
  expenses = expenses.filter((e) => e.id !== req.params.id);
  res.json({ message: "Expense deleted" });
});

/**
 * Monthly Summary
 * GET /api/expenses/summary?month=2025-12
 */
app.get("/api/expenses/summary", (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  const monthly = expenses.filter((e) =>
    e.date.startsWith(month)
  );

  const total = monthly.reduce((sum, e) => sum + e.amount, 0);

  const byCategory = {};
  monthly.forEach((e) => {
    byCategory[e.category] =
      (byCategory[e.category] || 0) + e.amount;
  });

  const summary = Object.keys(byCategory).map((cat) => ({
    category: cat,
    amount: byCategory[cat],
    percentage: total
      ? Math.round((byCategory[cat] / total) * 100)
      : 0,
  }));

  res.json({
    month,
    total,
    byCategory: summary,
    expenseCount: monthly.length,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
