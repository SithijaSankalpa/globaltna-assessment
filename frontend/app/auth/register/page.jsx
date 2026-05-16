"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { Home, Wrench } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!form.role) e.role = "Please select a role";
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
      toast.dismiss();
      toast.error(Object.values(validationErrors)[0]);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      login(res.user, res.token);
      toast.success(`Welcome, ${res.user.name}!`);
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
    border: `1px solid ${errors[field] ? "#f44336" : "var(--border)"}`,
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    fontSize: "0.95rem",
    outline: "none",
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
          Create an Account
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
          Join GlobalTNA to get started
        </p>
      </div>

      {apiError && (
        <div
          style={{
            background: "#2a1a1a",
            border: "1px solid #f44336",
            color: "#f44336",
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
        style={{
          background: "var(--secondary)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Role Selector */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <label style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            I am a *
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
            }}
          >
            {[
              {
                value: "homeowner",
                label: "Homeowner",
                icon: Home,
                desc: "I need work done",
              },
              {
                value: "tradesperson",
                label: "Tradesperson",
                icon: Wrench,
                desc: "I provide services",
              },
            ].map(({ value, label, icon: Icon, desc }) => (
              <div
                key={value}
                onClick={() => {
                  setForm((p) => ({ ...p, role: value }));
                  setErrors((p) => ({ ...p, role: "" }));
                }}
                style={{
                  border: `2px solid ${form.role === value ? "var(--accent)" : "var(--border)"}`,
                  background:
                    form.role === value
                      ? "rgba(233,69,96,0.1)"
                      : "var(--primary)",
                  borderRadius: "8px",
                  padding: "1rem",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
              >
                <Icon
                  size={24}
                  style={{
                    color:
                      form.role === value
                        ? "var(--accent)"
                        : "var(--text-muted)",
                    margin: "0 auto 0.4rem",
                  }}
                />
                <p
                  style={{
                    color:
                      form.role === value
                        ? "var(--accent)"
                        : "var(--text-primary)",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.78rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
          {errors.role && (
            <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
              {errors.role}
            </span>
          )}
        </div>

        {/* Name */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <label style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Full Name *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Smith"
            style={inputStyle("name")}
          />
          {errors.name && (
            <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
              {errors.name}
            </span>
          )}
        </div>

        {/* Email */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <label style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Email *
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
          <label style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Password *
          </label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Min 6 characters"
            type="password"
            style={inputStyle("password")}
          />
          {errors.password && (
            <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
              {errors.password}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <label style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Confirm Password *
          </label>
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat your password"
            type="password"
            style={inputStyle("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
              {errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#555" : "var(--accent)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "0.875rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "0.5rem",
          }}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
          }}
        >
          Already have an account?{" "}
          <a
            href="/auth/login"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
