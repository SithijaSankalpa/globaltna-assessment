"use client";
import {
  FileText,
  AlignLeft,
  Tag,
  MapPin,
  User,
  Mail,
  Send,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "../../../lib/api";

const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const { user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Plumbing",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading]);

  const validate = () => {
    const e = {};
    const alphaSpace = /^[A-Za-z\s]+$/;
    const alphaSpaceMultiline = /^[A-Za-z\s\n]+$/;
    const title = form.title.trim();
    const description = form.description.trim();
    const location = form.location.trim();
    const contactName = form.contactName.trim();

    if (!title) e.title = "Title is required";
    if (title && title.length > 100)
      e.title = "Title cannot exceed 100 characters";
    if (title && !alphaSpace.test(title)) {
      e.title = "Title can only contain letters and spaces";
    }

    if (!description) e.description = "Description is required";
    if (description && description.length > 1000) {
      e.description = "Description cannot exceed 1000 characters";
    }
    if (description && !alphaSpaceMultiline.test(description)) {
      e.description = "Description can only contain letters and spaces";
    }

    if (form.category && !CATEGORIES.includes(form.category)) {
      e.category = "Invalid category";
    }

    if (location && !alphaSpace.test(location)) {
      e.location = "Location can only contain letters and spaces";
    }

    if (contactName && !alphaSpace.test(contactName)) {
      e.contactName = "Contact name can only contain letters and spaces";
    }

    if (
      form.contactEmail &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.contactEmail)
    ) {
      e.contactEmail = "Please provide a valid email address";
    }

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
      await createJob(form);
      toast.success("Job request posted successfully!");
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
    transition: "border-color 0.2s",
  });

  const labelStyle = {
    display: "block",
    marginBottom: "0.4rem",
    color: "var(--text-muted)",
    fontSize: "0.875rem",
    fontWeight: "500",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <a
          href="/"
          style={{
            color: "var(--accent)",
            textDecoration: "none",
            fontSize: "0.9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <ArrowLeft size={15} /> Back to listings
        </a>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginTop: "1rem",
            color: "var(--text-primary)",
          }}
        >
          Post a Service Request
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: "0.4rem" }}>
          Describe what you need and tradespeople will find you
        </p>
      </div>

      {/* API Error */}
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

      {/* Form */}
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
        {/* Title */}
        <div style={fieldStyle}>
          <label style={labelStyle}>
            <FileText
              size={13}
              style={{ display: "inline", marginRight: "0.3rem" }}
            />
            Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Need a plumber for leaking kitchen tap"
            style={inputStyle("title")}
          />
          {errors.title && (
            <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
              {errors.title}
            </span>
          )}
        </div>

        {/* Description */}
        <div style={fieldStyle}>
          <label style={labelStyle}>
            <AlignLeft
              size={13}
              style={{ display: "inline", marginRight: "0.3rem" }}
            />
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the job in detail..."
            rows={4}
            style={{
              ...inputStyle("description"),
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
          {errors.description && (
            <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
              {errors.description}
            </span>
          )}
        </div>

        {/* Category + Location */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div style={fieldStyle}>
            <label style={labelStyle}>
              <Tag
                size={13}
                style={{ display: "inline", marginRight: "0.3rem" }}
              />
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={{ ...inputStyle("category"), cursor: "pointer" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
                {errors.category}
              </span>
            )}
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>
              <MapPin
                size={13}
                style={{ display: "inline", marginRight: "0.3rem" }}
              />
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Glasgow"
              style={inputStyle("location")}
            />
            {errors.location && (
              <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
                {errors.location}
              </span>
            )}
          </div>
        </div>

        {/* Contact Name + Email */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div style={fieldStyle}>
            <label style={labelStyle}>
              <User
                size={13}
                style={{ display: "inline", marginRight: "0.3rem" }}
              />
              Contact Name
            </label>
            <input
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              placeholder="Your name"
              style={inputStyle("contactName")}
            />
            {errors.contactName && (
              <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
                {errors.contactName}
              </span>
            )}
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>
              <Mail
                size={13}
                style={{ display: "inline", marginRight: "0.3rem" }}
              />
              Contact Email
            </label>
            <input
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
              style={inputStyle("contactEmail")}
            />
            {errors.contactEmail && (
              <span style={{ color: "#f44336", fontSize: "0.8rem" }}>
                {errors.contactEmail}
              </span>
            )}
          </div>
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <Send size={16} />
          {loading ? "Posting..." : "Post Service Request"}
        </button>
      </form>
    </div>
  );
}
