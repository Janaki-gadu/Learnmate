import API from "../api/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      await API.post("/signup", form);

      // Store user details so the name is permanently bound to this user
      localStorage.setItem(
        "user",
        JSON.stringify({ name: form.name.trim(), email: form.email.trim().toLowerCase() })
      );

      alert("Signup successful 🎉");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ fontSize: "60px" }}>📚</div>

        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join LearnMate today</p>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          style={styles.input}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          style={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          style={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.button} onClick={handleSignup}>
          Signup
        </button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom right, #dbeafe, #c7d2fe)",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "25px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    fontSize: "40px",
    color: "#4338ca",
    fontWeight: "900",
    margin: 0,
  },
  subtitle: {
    color: "#4b5563",
    fontSize: "18px",
    marginBottom: "10px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};