// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);


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

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "#1e1e1e",
//     padding: "40px 0",
//     fontFamily: "Segoe UI, sans-serif",
//   },
//   container: {
//     maxWidth: "900px",
//     margin: "auto",
//   },
//   title: {
//     textAlign: "center",
//     color: "#fff",
//     marginBottom: "30px",
//   },
//   card: {
//     background: "#ffffff",
//     borderRadius: "10px",
//     padding: "20px",
//     marginBottom: "25px",
//     color: "#222",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
//   },
//   sectionTitle: {
//     marginBottom: "15px",
//     color: "#111",
//   },
//   input: {
//     padding: "10px",
//     marginRight: "10px",
//     marginBottom: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     padding: "8px 16px",
//     borderRadius: "6px",
//     border: "none",
//     background: "#000",
//     color: "#fff",
//     cursor: "pointer",
//     marginRight: "8px",
//   },
//   listItem: {
//     marginBottom: "15px",
//     paddingBottom: "10px",
//     color: "#222",
//     borderBottom: "1px solid #eee",
//   },
// };

// function App() {
//   const [expenses, setExpenses] = useState([]);
//   const [summary, setSummary] = useState(null);

//   const [form, setForm] = useState({
//     amount: "",
//     description: "",
//     category: "Food",
//     date: "",
//   });

//   const [editingId, setEditingId] = useState(null);
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [filterMonth, setFilterMonth] = useState("");

//   const fetchExpenses = async () => {
//     let url = API_URL;
//     const params = [];

//     if (filterCategory !== "All") params.push(`category=${filterCategory}`);
//     if (filterMonth) params.push(`month=${filterMonth}`);
//     if (params.length) url += "?" + params.join("&");

//     const res = await axios.get(url);
//     setExpenses(res.data.expenses);
//   };

//   const fetchSummary = async () => {
//     if (!filterMonth) {
//       setSummary(null);
//       return;
//     }
//     const res = await axios.get(`${API_URL}/summary?month=${filterMonth}`);
//     setSummary(res.data);
//   };

//   useEffect(() => {
//     fetchExpenses();
//     fetchSummary();
//   }, [filterCategory, filterMonth]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editingId) {
//       await axios.put(`${API_URL}/${editingId}`, form);
//       setEditingId(null);
//     } else {
//       await axios.post(API_URL, form);
//     }

//     setForm({
//       amount: "",
//       description: "",
//       category: "Food",
//       date: "",
//     });

//     fetchExpenses();
//     fetchSummary();
//   };

//   const handleEdit = (exp) => {
//     setEditingId(exp.id);
//     setForm(exp);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`${API_URL}/${id}`);
//     fetchExpenses();
//     fetchSummary();
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <h1 style={styles.title}>💰 Expense Tracker</h1>

//         {/* Add Expense */}
//         <div style={styles.card}>
//           <h3 style={styles.sectionTitle}>
//             {editingId ? "Edit Expense" : "Add Expense"}
//           </h3>
//           <form onSubmit={handleSubmit}>
//             <input style={styles.input} type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
//             <input style={styles.input} name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
//             <select style={styles.input} name="category" value={form.category} onChange={handleChange}>
//               {CATEGORIES.slice(1).map((c) => <option key={c}>{c}</option>)}
//             </select>
//             <input style={styles.input} type="date" name="date" value={form.date} onChange={handleChange} required />
//             <br />
//             <button style={styles.button}>{editingId ? "Update" : "Add"}</button>
//           </form>
//         </div>

//         {/* Filters */}
//         <div style={styles.card}>
//           <h3 style={styles.sectionTitle}>Filters</h3>
//           <select style={styles.input} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
//             {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
//           </select>
//           <input style={styles.input} type="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} />
//         </div>

//         {/* Summary */}
//         {summary && (
//           <div style={styles.card}>
//             <h3 style={styles.sectionTitle}>📊 Summary ({summary.month})</h3>
//             <p><b>Total Spent:</b> ₹{summary.total}</p>
//             <p><b>Expenses:</b> {summary.expenseCount}</p>
//             <ul>
//               {summary.byCategory.map((c) => (
//                 <li key={c.category}>
//                   {c.category} — ₹{c.amount} ({c.percentage}%)
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {summary && summary.byCategory.length > 0 && (
//   <div style={styles.card}>
//     <h3 style={styles.sectionTitle}>📈 Category Breakdown</h3>

//     <Pie
//       data={{
//         labels: summary.byCategory.map((c) => c.category),
//         datasets: [
//           {
//             data: summary.byCategory.map((c) => c.amount),
//             backgroundColor: [
//               "#4CAF50",
//               "#2196F3",
//               "#FF9800",
//               "#9C27B0",
//               "#F44336",
//               "#00BCD4",
//               "#795548",
//             ],
//           },
//         ],
//       }}
//     />
//   </div>
// )}


//         {/* Expense List */}
//         <div style={styles.card}>
//           <h3 style={styles.sectionTitle}>Expenses</h3>
//           {expenses.map((e) => (
//             <div key={e.id} style={styles.listItem}>
//               {e.date} — <b>{e.description}</b> — {e.category} — ₹{e.amount}
//               <br />
//               <button style={styles.button} onClick={() => handleEdit(e)}>Edit</button>
//               <button style={styles.button} onClick={() => handleDelete(e.id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const API_URL = "http://localhost:5000/api/expenses";

const CATEGORIES = [
  "All",
  "Food",
  "Shopping",
  "Transport",
  "Entertainment",
  "Health",
  "Bills",
  "Other",
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#1f1f1f",
    padding: "40px 0",
    fontFamily: "Segoe UI, sans-serif",
  },
  container: {
    maxWidth: "900px",
    margin: "auto",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "30px",
    fontSize: "32px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "32px",
    color: "#222",
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
  },
  sectionTitle: {
    marginBottom: "14px",
    color: "#111",
    fontSize: "18px",
    fontWeight: 600,
  },
  input: {
    padding: "10px",
    marginRight: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    marginRight: "8px",
  },
  expenseRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "12px",
    marginBottom: "12px",
    borderBottom: "1px solid #e5e5e5",
    color: "#222",
  },
};

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
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMonth, setFilterMonth] = useState("");

  const fetchExpenses = async () => {
    let url = API_URL;
    const params = [];

    if (filterCategory !== "All") params.push(`category=${filterCategory}`);
    if (filterMonth) params.push(`month=${filterMonth}`);
    if (params.length) url += "?" + params.join("&");

    const res = await axios.get(url);
    setExpenses(res.data.expenses);
  };

  const fetchSummary = async () => {
    if (!filterMonth) {
      setSummary(null);
      return;
    }
    const res = await axios.get(`${API_URL}/summary?month=${filterMonth}`);
    setSummary(res.data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, [filterCategory, filterMonth]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setForm(exp);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
    fetchSummary();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>💰 Expense Tracker</h1>

        {/* Add Expense */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>
            {editingId ? "Edit Expense" : "Add Expense"}
          </h3>
          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <select
              style={styles.input}
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.slice(1).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              style={styles.input}
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            <br />
            <button style={styles.button}>
              {editingId ? "Update" : "Add"}
            </button>
          </form>
        </div>

        {/* Filters */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Filters</h3>
          <select
            style={styles.input}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            style={styles.input}
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          />
        </div>

        {/* Summary */}
        {summary && (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>
              📊 Summary ({summary.month})
            </h3>
            <p><b>Total Spent:</b> ₹{summary.total}</p>
            <p><b>Expenses:</b> {summary.expenseCount}</p>

            <ul>
              {summary.byCategory.map((c) => (
                <li key={c.category}>
                  {c.category} — ₹{c.amount} ({c.percentage}%)
                </li>
              ))}
            </ul>
          </div>
        )}

        

        {/* Expenses */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Expenses</h3>
          {expenses.map((e) => (
            <div key={e.id} style={styles.expenseRow}>
              <span>
                {e.date} — <b>{e.description}</b> — {e.category} — ₹{e.amount}
              </span>
              <div>
                <button
                  style={styles.button}
                  onClick={() => handleEdit(e)}
                >
                  Edit
                </button>
                <button
                  style={styles.button}
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Chart */}
        {summary && summary.byCategory.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>📈 Category Breakdown</h3>
            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
              <Pie
                data={{
                  labels: summary.byCategory.map((c) => c.category),
                  datasets: [
                    {
                      data: summary.byCategory.map((c) => c.amount),
                      backgroundColor: [
                        "#4CAF50",
                        "#2196F3",
                        "#FF9800",
                        "#9C27B0",
                        "#F44336",
                        "#00BCD4",
                        "#795548",
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
