import API from "../api/axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", form);

      // Save user session & auth token
      localStorage.setItem("profile", JSON.stringify(res.data));

      alert("Login successful 🎉");

      // Direct full-page redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ fontSize: "60px" }}>📚</div>

        <h1 style={styles.title}>Welcome Back</h1>

        <p style={styles.subtitle}>Log in to LearnMate</p>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">Signup</Link>
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