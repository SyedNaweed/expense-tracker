// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/expenses";

// const CATEGORIES = [
//   "All",
//   "Food",
//   "Transport",
//   "Entertainment",
//   "Shopping",
//   "Bills",
//   "Health",
//   "Other",
// ];

// function App() {
//   const [expenses, setExpenses] = useState([]);

//   const [form, setForm] = useState({
//     amount: "",
//     description: "",
//     category: "Food",
//     date: "",
//   });

//   const [editingId, setEditingId] = useState(null);

//   // 🔹 Filters
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [filterMonth, setFilterMonth] = useState("");

//   // Fetch expenses with filters
//   const fetchExpenses = async () => {
//     let url = API_URL;
//     const params = [];

//     if (filterCategory !== "All") {
//       params.push(`category=${filterCategory}`);
//     }

//     if (filterMonth) {
//       params.push(`month=${filterMonth}`);
//     }

//     if (params.length > 0) {
//       url += "?" + params.join("&");
//     }

//     const res = await axios.get(url);
//     setExpenses(res.data.expenses);
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, [filterCategory, filterMonth]);

//   // Handle form input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Add or Update expense
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editingId) {
//       await axios.put(`${API_URL}/${editingId}`, form);
//       setEditingId(null);
//     } else {
//       await axios.post(API_URL, knownFormData());
//     }

//     setForm({
//       amount: "",
//       description: "",
//       category: "Food",
//       date: "",
//     });

//     fetchExpenses();
//   };

//   const knownFormData = () => ({
//     amount: form.amount,
//     description: form.description,
//     category: form.category,
//     date: form.date,
//   });

//   // Edit
//   const handleEdit = (expense) => {
//     setEditingId(expense.id);
//     setForm({
//       amount: expense.amount,
//       description: expense.description,
//       category: expense.category,
//       date: expense.date,
//     });
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     await axios.delete(`${API_URL}/${id}`);
//     fetchExpenses();
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
//       <h2>💰 Expense Tracker</h2>

//       {/* 🔹 Add / Edit Form */}
//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <input
//           type="number"
//           name="amount"
//           placeholder="Amount"
//           value={form.amount}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <select
//           name="category"
//           value={form.category}
//           onChange={handleChange}
//         >
//           {CATEGORIES.slice(1).map((cat) => (
//             <option key={cat}>{cat}</option>
//           ))}
//         </select>
//         <br />

//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           required
//         />
//         <br />

//         <button type="submit">
//           {editingId ? "Update Expense" : "Add Expense"}
//         </button>
//       </form>

//       {/* 🔹 Filters */}
//       <h4>Filters</h4>
//       <select
//         value={filterCategory}
//         onChange={(e) => setFilterCategory(e.target.value)}
//       >
//         {CATEGORIES.map((cat) => (
//           <option key={cat}>{cat}</option>
//         ))}
//       </select>

//       <input
//         type="month"
//         value={filterMonth}
//         onChange={(e) => setFilterMonth(e.target.value)}
//         style={{ marginLeft: "10px" }}
//       />

//       <hr />

//       {/* 🔹 Expense List */}
//       <ul>
//         {expenses.map((e) => (
//           <li key={e.id} style={{ marginBottom: "10px" }}>
//             {e.date} — <b>{e.description}</b> — {e.category} — ₹{e.amount}
//             <br />
//             <button onClick={() => handleEdit(e)}>Edit</button>{" "}
//             <button onClick={() => handleDelete(e.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses";

const CATEGORIES = [
  "All",
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Health",
  "Other",
];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "Food",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Filters
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMonth, setFilterMonth] = useState("");

  // Fetch expenses (with filters)
  const fetchExpenses = async () => {
    let url = API_URL;
    const params = [];

    if (filterCategory !== "All") {
      params.push(`category=${filterCategory}`);
    }
    if (filterMonth) {
      params.push(`month=${filterMonth}`);
    }

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    const res = await axios.get(url);
    setExpenses(res.data.expenses);
  };

  // Fetch summary
  const fetchSummary = async () => {
    if (!filterMonth) {
      setSummary(null);
      return;
    }

    const res = await axios.get(
      `${API_URL}/summary?month=${filterMonth}`
    );
    setSummary(res.data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, [filterCategory, filterMonth]);

  // Form handling
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(API_URL, form);
    }

    setForm({
      amount: "",
      description: "",
      category: "Food",
      date: "",
    });

    fetchExpenses();
    fetchSummary();
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setForm({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      date: expense.date,
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
    fetchSummary();
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2>💰 Expense Tracker</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {CATEGORIES.slice(1).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      <hr />

      {/* Filters */}
      <h4>Filters</h4>
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="month"
        value={filterMonth}
        onChange={(e) => setFilterMonth(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <hr />

      {/* Monthly Summary */}
      {summary && (
        <>
          <h3>📊 Summary for {summary.month}</h3>
          <p>Total Spent: ₹{summary.total}</p>
          <p>Expenses Count: {summary.expenseCount}</p>

          <h4>By Category</h4>
          <ul>
            {summary.byCategory.map((c) => (
              <li key={c.category}>
                {c.category} — ₹{c.amount} ({c.percentage}%)
              </li>
            ))}
          </ul>
          <hr />
        </>
      )}

      {/* Expense List */}
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {e.date} — <b>{e.description}</b> — {e.category} — ₹{e.amount}
            <br />
            <button onClick={() => handleEdit(e)}>Edit</button>{" "}
            <button onClick={() => handleDelete(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
