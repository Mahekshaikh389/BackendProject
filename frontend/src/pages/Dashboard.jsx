
import React, { useState, useEffect } from "react";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} from "../api/items";

const Dashboard = ({ onLogout }) => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  const fetchItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
    const tokenPayload = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
    setRole(tokenPayload.role);
    setUserId(tokenPayload.id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        await updateItem(editId, form);
      } else {
        await createItem(form);
      }
      setForm({ title: "", description: "" });
      setEditId(null);
      fetchItems();
    } finally {
      setLoading(false);
    }
  };

 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;
  await deleteItem(id);
 alert("Task deleted");
  setItems(items.filter((item) => item._id !== id)); 
};


  return (
    <div className="dashboard-container">
      <div className="dash-header">
        <h1>All Tasks</h1>
        
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>

      <form className="item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Task description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit">
          {loading ? "Saving..." : editId ? "Update Task" : "Create Task"}
        </button>
      </form>

      <div className="items-list">
        {items.map((item) => (
          <div className="item-card" key={item._id}>
            <div className="card-content">
              <h3>{item.title}</h3>

              <p className="description-box">
                {item.description}
              </p>

              {item?.userId && (
                <p className="created-by">
                  Posted By: <strong>{item.userId.name}</strong>
                </p>
              )}
            </div>

            <div className="action-row">
              {(item.userId?._id === userId || role === "admin") && (
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditId(item._id);
                    setForm({ title: item.title, description: item.description });
                  }}
                >
                  Edit
                </button>
              )}

              {role === "admin" && (
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
