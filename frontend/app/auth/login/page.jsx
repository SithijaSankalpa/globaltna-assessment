"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // show only the first/latest error as toast
      toast.dismiss();
      toast.error(Object.values(validationErrors)[0]);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const res = await loginUser(form);
      login(res.user, res.token);
      toast.success(`Welcome back, ${res.user.name}!`);
      router.push("/");
    } catch (err) {
      setApiError(err.message);
      toast.dismiss();
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: "var(--primary)",
    color: "var(--text-primary)",
    border: `1px solid ${errors[field] ? "#fca5a5" : "var(--border)"}`,
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
  });

  return (
    <div style={{ maxWidth: "460px", margin: "3rem auto" }}>
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "var(--text-primary)",
          }}
        >
          Welcome Back
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
          Login to manage your service requests
        </p>
      </div>

      {apiError && (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            color: "#991b1b",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          ⚠️ {apiError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="card card-elevated"
        style={{
          borderRadius: "16px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Email */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <label
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              fontWeight: "600",
            }}
          >
            Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            type="email"
            style={inputStyle("email")}
          />
          {errors.email && (
            <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <label
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              fontWeight: "600",
            }}
          >
            Password
          </label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Your password"
            type="password"
            style={inputStyle("password")}
          />
          {errors.password && (
            <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
              {errors.password}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{
            borderRadius: "8px",
            padding: "0.875rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "0.5rem",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/auth/register"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
